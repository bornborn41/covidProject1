<script setup lang="ts">
import { ref ,onMounted, watch,computed  } from "vue";
import axios from "axios";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import { transformHistoricalAll } from '@/data/dashboard/dashboardData';

const chartSeries = ref<any>([])
const filteredSeries = ref<any>([])
const selectedFilter = ref<string>('All');
const itemfilter= ref<string[]>(['1 Months ago','6 Months ago','1 Years ago','All']);
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
        // tooltipHoverFormatter: function(val:number, opts:any) {
        //   return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex].toLocaleString('en')
        // },

        position: 'top',
        horizontalAlign: 'left',
        offsetY: -10
        
      },
      title: {
              text: 'Overview Total Coronavirus Cases',
              align: 'left'
            },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        // min: new Date('01/22/2020').getTime(),
        // max: new Date('02/22/2020').getTime(),
        
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
// console.log(chartOptions.value.chartOptions.xaxis);
onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllCofigURL = historicalAllResponse.config.url;
  const response = await axios.get(historicalAllCofigURL+'/all?lastdays=all');
  const historicalAllData = response.data
  const transformed = transformHistoricalAll(historicalAllData);
  console.log(transformed);
  
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

// function filterChart() {
//   console.log(selectedFilter.value);
  // '1 Months ago','6 Months ago','All'
  // const datetime = new Set<string>();
  // const casesSeries = chartSeries.value;
  // const date = Object.values(casesSeries).map((item,index)=>{
  //   console.log("casesSeries date:",index,item.data[0][0],item.data[item.data.length-1][0]);
  //   datetime.add(item.data[0][0])
  //   datetime.add(item.data[item.data.length-1][0])
  // })

  
  // const beginsDate = new Date(Array.from(datetime)[0]);
  // const latestDate = new Date(Array.from(datetime)[1]);
  // const oneMonthAgo = new Date(latestDate.getFullYear(), latestDate.getMonth() - 1, latestDate.getDate());
  // const sixMonthAgo = new Date(latestDate.getFullYear(), latestDate.getMonth() - 6, latestDate.getDate());
  // const oneyearsAgo = new Date(latestDate.getFullYear() - 1, latestDate.getMonth(), latestDate.getDate());

//   if (selectedFilter.value == '1 Months ago'){
//     // console.log(beginsDate,latestDate);
    
//     chartOptions.value = {
//       xaxis: {
//         min: new Date('01/22/2023').getTime(),
//         max: new Date('02/22/2023').getTime(),
//         yAxisIndex: 0,
//         type: 'datetime',
//         categories: [],
//         tickAmount: 15,
//         offsetX: 0,
//         label: {
//                   show: true,
//                   text: 'Rally',
//                   style: {
//                     color: "#fff",
//                     background: '#775DD0'
//                   }
//                 }
//       },
//     }
//     console.log(chartOptions.value.xaxis);
    
//   }
  
// }
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
</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-content-start pt-sm-2">
        <!-- <v-card-title class="text-h5">Overview Total Coronavirus Cases </v-card-title> -->
        <v-btn 
          
          variant="outlined"  
          :active="isActive1m"
          color="primary"
          @click="filterChart('1month')">
          1Month ago
        </v-btn>
        <v-btn 
          variant="outlined"
          :active="isActive6"
          color="primary"
          @click="filterChart('6month')">
          6Month ago
        </v-btn>
        <v-btn 
          variant="outlined"
          color="primary"
          :active="isActive1y"
          @click="filterChart('1year')">
          1Years ago
        </v-btn>
        <v-btn  
          variant="outlined"
          color="primary"
          :active="isActiveAll"
          @click="filterChart('all')">
          All
        </v-btn>
      
      </div>

      <div class="mt-6">
       
        <div id="chart-timeline">
        <apexchart
          type="area"
          height="520px"
          :options="chartOptions" 
          :series="chartSeries"
        ></apexchart>
      </div>
      </div>
    </v-card-item>
  </v-card>
</template>

