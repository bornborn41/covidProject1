<script setup lang="ts">
import axios from "axios";
import {  ref, onMounted,computed } from "vue";
import {  fetchHistoricalData } from '@/services/covidService';
import { useTheme } from "vuetify";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import { transformHistorical } from '@/data/filter/filterData';
import type { historicalType } from '@/types/filter/index';
import { transformHistoricalAll } from "~~/data/dashboard/dashboardData";


interface HistoricalData {
  country: string;
  province:string;
  timeline: {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  };
}
interface ChartFilter {
  province:string;
  country: string;
  cases?: { timeline: number; data: number }[];
  deaths?: { timeline: number; data: number }[];
  recovered?: { timeline: number; data: number }[];
}
interface ChartSeries {
  name: string;
  data: { timeline: number; data: number }[];
}
const chartsSeries = ref<any>([]);
const chartFilter = ref<ChartFilter[]>([]);
const filteredData = ref<ChartFilter[]>([]);
const selectedCountries = ref<string>('Thailand');
const selectedProvinces = ref<string>();
const filteredSeries = ref<any>([])
const itemCountries = ref<string[]>([]);
const itemProvinces = ref<string[]>([]);
const selectedYear = ref<string>('2023');
const selectedMonth = ref<string>('January');


const series = []

const chartOptions = {
  chart: {
        id: 'area-datetime',
        type: 'area',
        height: 400,
        // type: 'line',
        zoom: {
          enabled: true,
          autoScaleYaxis: true,
        },
        
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
 
      legend: {
        tooltipHoverFormatter: function(val:number, opts:any) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        },
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -5
        
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        yAxisIndex: 0,
        type: 'datetime',
        categories: [],
        tickAmount: 15,
        offsetX: 0,
        label: {
                  show: true,
                  text: 'Rally',
                  style: {
                    color: "#fff",
                    background: '#775DD0'
                  }
                }
      },
      yaxis: {
        title: {
            text: 'Total Coronavirus Cases'
          },
        tickAmount: 8,
        logBase: 10,
        min: 0,
      },

      tooltip: {
        x: {
                format: 'dd MMM yyyy'
              },
        y: [
          
          {
            title: {
              formatter: function (val:number) {
                return val 
              }
            }
          },
          {
            title: {
              formatter: function (val:number) {
                return val
              }
            }
          },
          {
            title: {
              formatter: function (val:number) {
                return val;
              }
            }
          }
        ]
      },
};

onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllData = historicalAllResponse.data
  const transformedData = transformHistoricalAll(historicalAllData);
  // console.log(transformedData);
  
  chartFilter.value = transformedData;
  filteredData.value = transformedData;
  // await fetchData();
  }catch (error) {
    console.error('Error fetching historical data:', error);
  }
});

// console.log(chartFilter);
function test(){
  console.log(chartFilter.value[0].cases[0]);
}


const uniqueCountries = computed(() => {
  const countries = new Set<string>();

  for (const item of chartFilter.value) {
    const itemCountry = item.country
    countries.add(itemCountry);
  
  }
  return Array.from(countries);
  
  
});

const uniqueProvinces = computed(() => {
  const provinces = new Set<string>();
  const provincesL = [] 
  for (const item of chartFilter.value) {
    const itemCountry = item.country
    const itemProvince = item.province
    if (itemCountry === selectedCountries.value && itemProvince !== null){
      provinces.add(itemProvince);
      provincesL.push(itemProvince);
    }
  }
  console.log(provinces);
  
  if (provinces.size > 0){
    selectedProvinces.value = provincesL[0]
  }else{
    selectedProvinces.value = null;
  }
  return Array.from(provinces);
  // return provinces
});

const filterByCountriesProvinces = () => {
  filteredData.value = chartFilter.value.filter(item => {
    
    
    const itemCountry = item.country
    const itemProvince = item.province
    const itemCases = item.cases
    const itemDeaths= item.deaths
    const itemRecovered = item.recovered
    // console.log(item.country);
    if (itemCountry === selectedCountries.value && itemProvince === selectedProvinces.value){

      // console.log("same",item.country)
      const filterCases = Object.values(itemCases).map((value,index) => {
        const datas = [value.date,value.data]
        return datas
      })
      const filterDeaths = Object.values(itemDeaths).map((value,index) => {
        const datas = [value.date,value.data]
        return datas
      })
      const filterRecovered = Object.values(itemRecovered).map((value,index) => {
        const datas = [value.date,value.data]
        return datas
      })
      // series.push(filterCases)
      // console.log(filterCases,filterDeaths,filterDeaths);
      
      chartsSeries.value = [
        {
          name :  'Cases',
          data : filterCases,
        },
        {
          name :  'Deaths',
          data : filterDeaths,
        },
        {
          name :  'Recovered',
          data : filterRecovered,
        },

      ]
        
    }
          
    return itemCountry === selectedCountries.value && itemProvince === selectedProvinces.value;
  });

}

function zoomInOneMonth() {
  console.log("zoomInOneMonth()");
  
}
const formatDate = (date: string) => {
  return new Date(date).toDateString();
};
  
</script>
<template>
  <v-card elevation="10" class="">
      <v-card-item class="pa-6">
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5 pt-sm-2 pb-7">Coronavirus Filter of 2023 by Contries</v-card-title>
          <!-- <v-btn @click="filterOneMonth">Filter 1 Month</v-btn> -->
          <div class="d-sm-flex align-center justify-space-between pt-sm-2">
<!-- 
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

    </div> -->

</div>
  </div>
     

      <div class="mt-2">

        <apexchart 
            :options="chartOptions" 
            :series="chartsSeries" 
            type="area" 
            height="400"></apexchart>
          </div>
      </v-card-item>
  </v-card>
</template>
