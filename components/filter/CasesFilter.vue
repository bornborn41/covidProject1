<script setup lang="ts">
import {  ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import { transformHistoricalAll } from '@/data/dashboard/dashboardData';
import { fetchHistoricalAll,} from '@/server/apiFetch'
import axios from "axios";

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const chartSeries = ref<any>([])
const filteredSeries = ref<any>([])
const charts = ref<any>("chart")
const isActive1m = ref<any>(false);
const isActive6 = ref<any>(false);
const isActive1y = ref<any>(false);
const isActiveAll = ref<any>(false);

/* Chart Options*/
const chartOptions = ref<any>({
  chart: {
        id: 'area-datetime',
        type: 'area',
        height: 500,
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
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex].toLocaleString('en')
        },

        position: 'top',
        horizontalAlign: 'left',
        offsetY: 10
        
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
          offsetX: 5,
            text: 'Total Cases'
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
                return (val).toLocaleString('en');
              }
            }
          },
          {
            title: {
              formatter: function (val:number) {
                return (val).toLocaleString('en');
              }
            }
          },
          {
            title: {
              formatter: function (val:number) {
                return (val).toLocaleString('en');
              }
            }
          }
        ]
      },
});
// console.log(chartOptions.value.xaxis);


onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllCofigURL = historicalAllResponse.config.url;
  const response = await axios.get(historicalAllCofigURL+'/all?lastdays=all');
  const historicalAllData = response.data
  const transformed = transformHistoricalAll(historicalAllData);

  const cases = Object.values(transformed[0]).map((item,index) => {
    return [item.date,item.data]
  });
  const deaths = Object.values(transformed[1]).map((item,index) => {
    return [item.date,item.data]
  });
  const recovered = Object.values(transformed[2]).map((item,index) => {
    return [item.date,item.data]
  });
  // console.log(cases,deaths ,recovered);
  
  chartSeries.value = [
    {
      name:"Cases",
      data: cases
    },

    {
      name:"Recovered",
      data: recovered
    },
    {
      name:"Deaths",
      data: deaths
    },
  ]
  } catch (error) {
    console.error('Error fetching Total COVID-19 data:', error);
  }

});

function filterChart(duration: string) {
  const durations = duration
  console.log("chartSeries.value",chartSeries.value);
  const casesSeries = chartSeries.value[0].data;
  const beginsDate = new Date(casesSeries[0][0]);
  const latestDate = new Date(casesSeries[chartSeries.value[0].data.length - 1][0]);
  const oneMonthAgo = new Date(latestDate.getFullYear(), latestDate.getMonth() - 1, latestDate.getDate());
  const sixMonthAgo = new Date(latestDate.getFullYear(), latestDate.getMonth() - 6, latestDate.getDate());
  const oneyearsAgo = new Date(latestDate.getFullYear() - 1, latestDate.getMonth(), latestDate.getDate());
  let startDate: Date;

  if (duration === '1month') {

    isActive1m.value = true; // Set active state to true
    isActive6.value = false;
    isActive1y.value = false;
    isActiveAll.value = false;
    startDate = oneMonthAgo
    chartOptions.value = {
      xaxis: {
        yAxisIndex: 0,
        type: 'datetime',
        categories: [],
        tickAmount: 15,
        min:oneMonthAgo.getTime() ,
        max:latestDate.getTime() ,
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
    }

    
  } else if (duration === '6month') {
    isActive1m.value = false; // Set active state to true
    isActive6.value = true;
    isActive1y.value = false;
    isActiveAll.value = false;
    startDate = beginsDate
    chartOptions.value = {
      xaxis: {
        yAxisIndex: 0,
        type: 'datetime',
        categories: [],
        tickAmount: 15,
        min:sixMonthAgo.getTime() ,
        max:latestDate.getTime() ,
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
    }
   
  } else if (duration === '1year') {
    isActive1m.value = false; // Set active state to true
    isActive6.value = false;
    isActive1y.value = true;
    isActiveAll.value = false;
    startDate = beginsDate
    chartOptions.value = {
      xaxis: {
        yAxisIndex: 0,
        type: 'datetime',
        categories: [],
        tickAmount: 15,
        min:oneyearsAgo.getTime() ,
        max:latestDate.getTime() ,
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
    }
   
  } else if (duration === 'all') {
    isActive1m.value = false; // Set active state to true
    isActive6.value = false;
    isActive1y.value = false;
    isActiveAll.value = true;
    startDate = beginsDate
    chartOptions.value = {
      xaxis: {
        yAxisIndex: 0,
        type: 'datetime',
        categories: [],
        tickAmount: 15,
        min:beginsDate.getTime() ,
        max:latestDate.getTime() ,
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
    }
   
  } 
  else {
    return; // Invalid duration
  }
}

  // Filter the data based on the start date
//   const filterData = chartSeries.value.map((series) => ({
//       name: series.name,
//       data: series.data.filter((dataPoint) => new Date(dataPoint[0]) >= startDate)
//   }));
  
//   console.log(filteredSeries.value);
//   const chartss = chartSeries.value.map((series) => {
//     console.log(series.name); 
//     name: series.name,
//     data: series.data.filter((dataPoint) => new Date(dataPoint.x) >= startDate),
//   })
//   zoomX(oneMonthAgo, latestDate);
//   return filterData 
// }
 


// function zoomX(minDate: Date, maxDate: Date) {
//   var chart = new ApexCharts(charts, chartOptions.value);
//   console.log(chart);
//   chart.zoomX(minDate.getTime(),maxDate.getTime())
//   console.log(minDate.getTime(),maxDate.getTime());
  




</script>

<template>
 
    
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h4">Overview Total Coronavirus Cases Filters</v-card-title>

        
      </div>

   
    <v-row>
        <v-col cols="12">
          <div class="mt-2">
   
        <v-btn 
          
          variant="outlined"
          :active="isActive1m"
          :color="primary"
          @click="filterChart('1month')">
          1 Month ago latest
        </v-btn>
        <v-btn 
          variant="outlined"
          :active="isActive6"
          :color="primary"
          @click="filterChart('6month')">
          6 Month ago latest
        </v-btn>
        <v-btn 
          variant="outlined"
          :color="primary"
          :active="isActive1y"
          @click="filterChart('1year')">
          1 Years ago latest
        </v-btn>
        <v-btn  
          variant="outlined"
          :color="primary"
          :active="isActiveAll"
          @click="filterChart('all')">
          All
        </v-btn>


 </div>
</v-col>
      </v-row>
          
    <apexchart 
    :ref="chart"
    :options="chartOptions" 
    :series="chartSeries"
    type="area" 
    height="500"
    width="100%"
    ></apexchart> 
   
</template>

