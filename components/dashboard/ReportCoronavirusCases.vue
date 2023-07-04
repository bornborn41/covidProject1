<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from "axios";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import { transformHistoricalAll } from '@/data/dashboard/dashboardData';
import type { historicalAllType } from '@/types/dashboard/index';

const data = ref<historicalAllType[] | null>([]);
const filteredData = ref<historicalAllType[]>([]);
const selectedYear = ref<string>('2023');
const selectedMonth = ref<string>('January');
const isLoading = ref(true);
const tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'datetime', header: 'Datetime' },
    { field: 'cases', header: 'Toltal Cases' },
    { field: 'deaths', header: 'Toltal Deaths' },
    { field: 'recovered', header: 'Toltal Recovered' },
   
]
onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllCofigURL = historicalAllResponse.config.url;
  const response = await axios.get(historicalAllCofigURL+'/all/?lastdays=all');
  const historicalAllData = response.data
  const historicalData = historicalAllData['cases'];
  const dataItems: historicalAllType[] = [];

  for (const date in historicalData) {
    const cases = historicalData[date];
    const deaths = historicalAllData['deaths'][date];
    const recovered = historicalAllData['recovered'][date];
    const dates = new Date(date).getTime();
    dataItems.push({ dates, cases, deaths, recovered });
    // console.log(date);
    
  }

  data.value = dataItems;
  filteredData.value = dataItems;
  

  } catch (error) {
    console.error('Error fetching Total COVID-19 data:', error);
  }finally {
    isLoading.value = false;
  }

});


// console.log("data.value",data.value);
// console.log(filteredData );
 
function test(){
  console.log("uniqueYears",data.value);
  const all = data.value
  for (const item of all) {
    const itemYear = new Date(item.dates).getFullYear().toString();
    console.log(itemYear);
    
    // years.add(itemYear);
  }
}


const uniqueYears = computed(() => {
  const years = new Set<string>();
  // console.log("uniqueYears",data.value);
  const all = data.value
  for (const item of all) {
    const itemYear = new Date(item.dates).getFullYear().toString();
    years.add(itemYear);
  }
  return Array.from(years);
});

const uniqueMonths = computed(() => {
  const months = new Set<string>();
  const all = data.value
  for (const item of all) {
    const itemYear = new Date(item.dates).getFullYear().toString();
    const itemMonth = new Date(item.dates).toLocaleString('en-US', { month: 'long' });
    if (itemYear === selectedYear.value) {
      months.add(itemMonth);
    }
  }
  return Array.from(months);
});
const filterByYearMonth = () => {
  filteredData.value = data.value.filter(item => {
    const itemYear = new Date(item.dates).getFullYear().toString();
    const itemMonth = new Date(item.dates).toLocaleString('en-US', { month: 'long' });
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
            <!-- <v-btn @click="test()">Test</v-btn> -->
           
      
    <div class="d-sm-flex align-center justify-space-between">
       <v-select 
            v-model="selectedMonth"
            :items= uniqueMonths
            :on-click:append?="filterByYearMonth()"
            bg-color = "#DCE775"
            base-color = "#BA68C8"
            color="black"
            variant="outlined"
            density="compact"
          ></v-select>
    <v-select 
            v-model="selectedYear"
            :items= uniqueYears
            :on-click:append?="filterByYearMonth()"
            bg-color = "#FFE0B2"
            base-color = "#BA68C8"
            color="black"
            variant="outlined"
            density="compact"
          ></v-select>

   
    </div>
        </div>
        <v-table class="month-table">
            <thead>
                <tr>
                  <th v-for="(item,index) in tableColumns" :key="item.header" class="text-subtitle-1 font-weight-bold text-center">{{item.header}}</th>
                  <!-- <th class="text-subtitle-1 font-weight-bold text-center">Datetime</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Cases</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold text-center">Total Recovered</th> -->
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="data,item in filteredData" :key="data.date" class="month-item">
                  
                  <td>
                    <h6 v-if="isLoading"  class="text-h6 text-subtitle-1 font-weight-bold text-center">

                      Loading...
                    </h6>
                         <h6 v-else class="text-h6 text-subtitle-1 font-weight-bold text-center">

                           {{item+1}}
                          </h6>
                    </td>
                    <td>
                      <h6 v-if="isLoading"   class="text-h6 text-subtitle-1 font-weight-bold text-center">

                        Loading...
                        </h6>
                         <h6  v-else class="text-h6 text-subtitle-1 font-weight-bold text-center">

                          {{ formatDate(data.dates) }}
                          </h6>
                    </td>
                    <td>
                      <h6 v-if="isLoading" class="text-body-1 text-muted font-weight-medium text-center">Loading...</h6>
                        <h6 v-else  class="text-body-1 text-muted font-weight-medium text-center">{{ data.cases.toLocaleString("en-US")  }}</h6>
                    </td>
                    <td>
                      <h6 v-if="isLoading"  class="text-body-1 text-muted font-weight-medium text-center">Loading...</h6>
                        <h6 v-else class="text-body-1 text-muted font-weight-medium text-center">{{ data.deaths.toLocaleString("en-US")  }}</h6>
                    </td>
                    <td>
                      <h6 v-if="isLoading" class="text-body-1 text-muted font-weight-medium text-center">Loading...</h6>
                        <h6 v-else class="text-body-1 text-muted font-weight-medium text-center">{{ data.recovered.toLocaleString("en-US")  }}</h6>
                    </td>
              
                    
                  </tr>
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
</template>
