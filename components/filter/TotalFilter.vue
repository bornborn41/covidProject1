<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';
import {  fetchHistoricalData } from '@/services/covidService';
import { useTheme } from "vuetify";

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const props = defineProps({ item: Object, level: Number });

interface HistoricalData {
  country: string;
  province:string;
  timeline: {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  };
}
interface GridRow {
  province:string;
  country: string;
  cases?: { timeline: number; data: number }[];
  deaths?: { timeline: number; data: number }[];
  recovered?: { timeline: number; data: number }[];
}
type allDateData = {
  timeline: number,
  data: number,
}


const gridColumns = [
  { field: 'id', header: 'ID' },
  { field: 'timeLine', header: 'TimeLine' },
  { field: 'cases', header: 'Toltal Cases' },
  { field: 'deaths', header: 'Toltal Deaths' },
  { field: 'recovered', header: 'Toltal Recovered' },
];

const gridRows = ref<GridRow[]>([]);
const filteredData = ref<GridRow[]>([]);
const selectedCountries = ref<string>('Thailand');
const selectedProvinces = ref<string>();
const itemCountries = ref<string[]>([]);
const itemProvinces = ref<string[]>([]);
const selectedYear = ref<string>('2023');
const selectedMonth = ref<string>('January');
// console.log(gridRows);

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  try {
    const data = await fetchHistoricalData();
    const transformedData = transformHistoricalData(data);
    gridRows.value = transformedData;
    filteredData.value = transformedData;
    
  } catch (error) {
    console.error('Error fetching historical data:', error);
  }
}

function transformHistoricalData(data: HistoricalData[]) {
  const transformedData: GridRow[] = []; 
  data.forEach((item) => {
 
    const { country,province ,timeline } = item;
    const cases = getDateValue(timeline.cases);
    const deaths = getDateValue(timeline.deaths);
    const recovered = getDateValue(timeline.recovered);

    transformedData.push({ country,province , cases , deaths, recovered });
    // console.log(cases);
    
    
  });
  return transformedData;
} 

function getDateValue(data: Record<string, number>) {

  const kValue = Object.keys(data)
  const vValue = Object.values(data)
 
  const allData = Object.entries(data).map(([date, value]) => (
    {
    timeline: new Date(date).getTime(),
    data: value,
    }
    
  ));

 
  // console.log(getValue);
  
  return allData;
}
const uniqueCountries = computed(() => {
  const countries = new Set<string>();

  for (const item of gridRows.value) {
    const itemCountry = item.country
    countries.add(itemCountry);
  
  }
  return Array.from(countries);
  
  
});

const uniqueProvinces = computed(() => {
  // const provinces = new Set<string>();
  const provinces = [] 
  for (const item of gridRows.value) {
    const itemCountry = item.country
    const itemProvince = item.province
    if (itemCountry === selectedCountries.value && itemProvince != null){
      // provinces.add(provinces);
      provinces.push(itemProvince);
    }
  }
  if (provinces.length > 0){
    selectedProvinces.value = provinces[0]
  }else{
    selectedProvinces.value = null;
  }

  return provinces
});

// const uniqueMonths = computed(() => {
//   const months = new Set<string>();
//   for (const item of filteredData.value ) {
//     const itemYear = new Date(item.date).getFullYear().toString();
//     const itemMonth = new Date(item.date).toLocaleString('en-US', { month: 'long' });
//     if (itemYear === selectedYear.value) {
//       months.add(itemMonth);
//     }
//   }
//   return Array.from(months);
// });


const filterByCountriesProvinces = () => {
  filteredData.value = gridRows.value.filter(item => {
    const itemCountry = item.country
    const itemProvince = item.province
    return itemCountry === selectedCountries.value && itemProvince === selectedProvinces.value;
  });

}




const formatDate = (date: string) => {
  return new Date(date).toDateString();
};
</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
            <v-card-title class="text-h5 pt-sm-2 pb-7">Report Coronavirus Cases by Contries</v-card-title>
            <!-- <v-btn @click="filterOneMonth">Filter 1 Month</v-btn> -->
            <div class="d-sm-flex align-center justify-space-between pt-sm-2">

      <v-select 
            v-model="selectedCountries"
            :items= uniqueCountries
            :on-click:append="filterByCountriesProvinces()"
            variant="solo"
            density="compact"
            :active-color= "primary"

          ></v-select>
  <div v-if="uniqueProvinces.length > 0">
     <v-select 
            v-model="selectedProvinces"
            :label="Provinces"
            :on-click:append="filterByCountriesProvinces()"
            :items= uniqueProvinces
            variant="solo"
            density="compact"
            :active-color= "primary"
          ></v-select>

  </div>
    </div>
       
  
        </div>
        <div>

          <v-table class="month-table">
            <thead >
                <tr>
                  
                  <th v-for="(item,index) in gridColumns" :key="item.header" class="text-subtitle-1 font-weight-bold text-center">{{item.header}}</th>
             
                  <!-- <th class="text-subtitle-1 font-weight-bold text-center">Datetime</th>
                  <th class="text-subtitle-1 font-weight-bold text-center">Total Cases</th>
                  <th class="text-subtitle-1 font-weight-bold text-center">Total Deaths</th>
                  <th class="text-subtitle-1 font-weight-bold text-center">Total Recovered</th> -->
                    
                </tr>
            </thead>
            <tbody  v-for="(data) in filteredData" :key="data.country" >
                <tr  v-for="(item, index) in data.cases" :key="item.timeline" class="month-item">
  
                    <td>
                         <h6  class="text-h6 text-subtitle-1 font-weight-bold text-center">
                         {{index+1}}
                        
                       
                          </h6>
                    </td>
                    <td>
                    
                        <h6 class="text-body-1 text-muted font-weight-medium text-center"> {{formatDate(item.timeline) }}</h6>
                    
                  </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">  {{item.data }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">  {{data.deaths[index].data }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">  {{data.recovered[index].data }}</h6>
                    </td>
                 
                  </tr>
            </tbody>
        </v-table>
        </div>
        </v-card-item>
    </v-card>
</template>
