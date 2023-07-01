<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';
import { CovidData,fetchCovidData } from '@/services/covidService';


const data = ref<CovidData[]>([]);
const filteredData = ref<CovidData[]>([]);
const selectedYear = ref<string>('2023');
const selectedMonth = ref<string>('January');

const fetchData = async () => {
  try {
    const response = await fetchCovidData()
    const historicalData = response['cases'];

    const dataItems: CovidData[] = [];

    for (const date in historicalData) {
      const cases = historicalData[date];
      const deaths = response['deaths'][date];
      const recovered = response['recovered'][date];
      // const date = new Date(date).toUTCString();
      dataItems.push({ date, cases, deaths, recovered });
      // console.log(date);
      
    }

    data.value = dataItems;
    filteredData.value = dataItems;
    // console.log(dataItems);
    
  } catch (error) {
    console.error('Error fetching COVID-19 data:', error);
  }
};
console.log(data.value);

fetchData();

const uniqueYears = computed(() => {
      const years = new Set<string>();
      for (const item of data.value) {
        const itemYear = new Date(item.date).getFullYear().toString();
        years.add(itemYear);
      }
      return Array.from(years);
    });

const uniqueMonths = computed(() => {
  const months = new Set<string>();
  for (const item of data.value) {
    const itemYear = new Date(item.date).getFullYear().toString();
    const itemMonth = new Date(item.date).toLocaleString('en-US', { month: 'long' });
    if (itemYear === selectedYear.value) {
      months.add(itemMonth);
    }
  }
  return Array.from(months);
});
const filterByYearMonth = () => {
  filteredData.value = data.value.filter(item => {
    const itemYear = new Date(item.date).getFullYear().toString();
    const itemMonth = new Date(item.date).toLocaleString('en-US', { month: 'long' });
    return itemYear === selectedYear.value && itemMonth === selectedMonth.value;
  });
};

const formatDate = (date: string) => {
  return new Date(date).toDateString();
};
// console.log("filteredData ",filteredData);



</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
            <v-card-title class="text-h5 pt-sm-2 pb-7">All Coronavirus Cases</v-card-title>
            <!-- <v-btn @click="filterOneMonth">Filter 1 Month</v-btn> -->
           
       
    <div class="d-sm-flex align-center justify-space-between">
      <v-select 
            v-model="selectedMonth"
            :items= uniqueMonths
            :on-click:append?="filterByYearMonth()"
            variant="outlined"
            density="compact"
          ></v-select>
     <v-select 
            v-model="selectedYear"
            :items= uniqueYears
            :on-click:append?="filterByYearMonth()"
            variant="outlined"
            density="compact"
          ></v-select>

   
    </div>
        </div>
        <v-table class="month-table">
            <thead>
                <tr>
                  <th class="text-subtitle-1 font-weight-bold text-right">#</th>
                  <th class="text-subtitle-1 font-weight-bold text-center">Datetime</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Cases</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Recovered</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="data,item in filteredData" :key="data.date" class="month-item">
                  
                  <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold text-right">

                           {{item+1}}
                          </h6>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold text-center">

                          {{ formatDate(data.date) }}
                          </h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">{{ data.cases.toLocaleString("en-US")  }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">{{ data.deaths.toLocaleString("en-US")  }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium text-center">{{ data.recovered.toLocaleString("en-US")  }}</h6>
                    </td>
              
                    
                  </tr>
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
</template>
