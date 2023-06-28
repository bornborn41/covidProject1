<script setup lang="ts">
import {  ref, onMounted } from "vue";
import { HistoricalData, fetchHistoricalData } from '@/services/covidService';
import ApexCharts from "apexcharts";

interface ChartSeries {
  name: string;
  data: { x: number; y: number }[];
}

interface ChartData {
  province:string;
  country: string;
  cases?: { timeline: number; data: number }[];
  deaths?: { timeline: number; data: number }[];
  recovered?: { timeline: number; data: number }[];
}

const chartSeries = ref<ChartSeries[]>([]);
const selectedDuration = ref<string>('');
const selectedCountry = ref<string>('Thailand');

const chart = ref('chart');

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
    const data = await fetchHistoricalData();
    // chartSeries.value = transformHistoricalData(data);

    transformHistoricalData(data);
    
  } catch (error) {
    console.error('Error fetching historical data:', error);
  }
});


function transformHistoricalData(data: HistoricalData) {
  const casesData1 = Object.entries(data)
  Object.entries(data).forEach(([key,  value]) => {
  const casesData = Object.entries(value.timeline.cases).map(([date, cases]) => ({
    x: new Date(date).getTime(),
    y: cases,
  }));
  const deathsData = Object.entries(value.timeline.deaths).map(([date, deaths]) => ({
    x: new Date(date).getTime(),
    y: deaths,
  }));

  const recoveredData = Object.entries(value.timeline.recovered).map(([date, recovered]) => ({
    x: new Date(date).getTime(),
    y: recovered,
  }));
  // console.log(casesData)
  chartSeries.value =  [
    {
      name: 'Cases',
      data: casesData,
    },
    {
      name: 'Deaths',
      data: deathsData,
    },
    {
      name: 'Recovered',
      data: recoveredData,
    },
  ];
  
});

}


function filterData(duration: string) {
  const today = new Date();
  let startDate: Date;

  if (duration === '1month') {
    console.log(duration);
    startDate = new Date(2023, 2-1, 8);
  } else if (duration === '1year') {
    console.log(duration);
    startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  } else {
    console.log(duration);
    return; // Invalid duration
  }

  // Filter the data based on the start date chartSeries.value 
  // chartOptions.xaxis.value = chartOptions.xaxis.value.map(())
  chartSeries.value = chartSeries.value.map((series) => ({
    name: series.name,
    data: series.data.filter((dataPoint) => new Date(dataPoint.x) >= startDate),
  }));
  // console.log(chartSeries);
  
}
function isDurationActive(duration: string): boolean {
  return selectedDuration.value === duration;
}
// console.log(chartSeries);

</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Deaths</v-card-title>
        <!-- <div class="d-sm-flex align-center justify-space-between pt-sm-2">
          <v-select 
            v-model="selectedCountry"
            :items= uniqueCountrys
            :on-click:append="filterByYearCountry()"
            variant="outlined"
            density="compact"
          ></v-select>
      <v-select 
            v-model="selectedMonth"
            :items= uniqueMonths
            :on-click:append="filterByYearMonth()"
            variant="outlined"
            density="compact"
          ></v-select>
     <v-select 
            v-model="selectedYear"
            :items= uniqueYears
            :on-click:append="filterByYearMonth()"
            variant="outlined"
            density="compact"
          ></v-select>
    </div> -->
      </div>
      <v-row>
        <v-col cols="12">
          <div class="mt-2">
            <v-btn 
            @click="zoomToLastMonth()"
            v-bind:active="selectedDuration === '1month'"
            >Last Month
            </v-btn>
            <v-btn 
            @click="zoomToLastYear()"
            v-bind:active="selectedDuration === '1year'"
            >Last Year
          </v-btn>
            <v-btn 
            @click="filterData('All')"
            >All
          </v-btn>
            <apexchart 
            :ref="chart" 
            :options="chartOptions" 
            :series="chartSeries" 
            type="line" 
            height="500">
          </apexchart>
   
           </div>
        
        </v-col>
      </v-row>
    </v-card-item>
    
  </v-card>
</template>

