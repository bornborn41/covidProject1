<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { fetchHistoricalData } from '@/services/covidService';
import { useTheme } from "vuetify";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import { transformHistorical } from '@/data/filter/filterData';
import type { historicalType } from '@/types/filter/index';
import { transformHistoricalAll } from "~~/data/dashboard/dashboardData";

const theme = useTheme();
const primary = theme.current.value.colors.primary;

const gridRows = ref<GridRow[]>([]);
const filteredData = ref<GridRow[]>([]);
const selectedCountries = ref<string>('Thailand');
const selectedProvinces = ref<string>();


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

const gridColumns = [
  { field: 'id', header: 'ID' },
  { field: 'timeLine', header: 'TimeLine' },
  { field: 'cases', header: 'Toltal Cases' },
  { field: 'deaths', header: 'Toltal Deaths' },
  { field: 'recovered', header: 'Toltal Recovered' },
];


// console.log(gridRows);

onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllData = historicalAllResponse.data
  const transformedData = transformHistoricalAll(historicalAllData);
  // console.log(transformedData);
  
  gridRows.value = transformedData;
  filteredData.value = transformedData;
  // await fetchData();
  }catch (error) {
    console.error('Error fetching historical data:', error);
  }
});


const uniqueCountries = computed(() => {
  const countries = new Set<string>();

  for (const item of gridRows.value) {
    const itemCountry = item.country
    countries.add(itemCountry);
  
  }
  return Array.from(countries);
  
  
});

const uniqueProvinces = computed(() => {
  const provinces = new Set<string>();
  const provincesL = [] 
  for (const item of gridRows.value) {
    const itemCountry = item.country
    const itemProvince = item.province
    if (itemCountry === selectedCountries.value && itemProvince !== null){
      provinces.add(itemProvince);
      provincesL.push(itemProvince);
    }
  }
  if (provinces.size > 0){
    selectedProvinces.value = provincesL[0]
  }else{
    selectedProvinces.value = null;
  }

  return Array.from(provinces);
});


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
            <v-card-title class="text-h5 pt-sm-2 pb-7">Schedule Coronavirus Cases of 2023 by Contries</v-card-title>
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
                    
                        <h6 class="text-h6 text-subtitle-1 font-weight-bold text-center "> {{formatDate(item.date) }}</h6>
                    
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
