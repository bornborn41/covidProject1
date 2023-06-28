<script setup lang="ts">
import { defineComponent,computed, ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import ApexCharts from 'apexcharts'
import { CovidData, fetchCovidData } from '@/services/covidService'
const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const chartSeries = ref<any>([])
const filteredSeries = ref<any>([])
const charts = ref<any>("chart")

/* Chart */

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
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
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
})
console.log(chartOptions.value.xaxis);


onMounted(async () => {
  const covidData = await fetchCovidData()
  // console.log(covidData.cases);
  
  
  transformChartData(covidData)
})

function transformChartData(covidData: CovidData) {
  const seriesData = []
  for (const date in covidData.cases) {
    const cases = covidData.cases[date]
    const deaths = covidData.deaths[date]
    const recovered = covidData.recovered[date]
    const timestamp = new Date(date).getTime()
    // console.log(timestamp, cases, deaths, recovered);
    seriesData.push([timestamp, cases, deaths, recovered])
  }
  // console.log("seriesData0 :", seriesData);
  

  chartSeries.value = [
    {
      name: 'Cases',
      data: seriesData.map((data) => [data[0], data[1]])
    },
    {
      name: 'Deaths',
      data: seriesData.map((data) => [data[0], data[2]])
    },
    {
      name: 'Recovered',
      data: seriesData.map((data) => [data[0], data[3]])
    }
  ]
  // Initialize filteredSeries with full data
  filteredSeries.value = chartSeries.value
  // console.log("filteredSeries.value[0] ",filteredSeries.value);
  
}

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

  // Filter the data based on the start date
  const filterData = chartSeries.value.map((series) => ({
      name: series.name,
      data: series.data.filter((dataPoint) => new Date(dataPoint[0]) >= startDate)
  }));
 
  // console.log(filteredSeries.value);
  // const chartss = chartSeries.value.map((series) => {
  //   console.log(series.name); 
  //   name: series.name,
  //   data: series.data.filter((dataPoint) => new Date(dataPoint.x) >= startDate),
  // })
  // zoomX(oneMonthAgo, latestDate);
  return filterData 
}
 


function zoomX(minDate: Date, maxDate: Date) {
  var chart = new ApexCharts(charts, chartOptions.value);
  console.log(chart);
  chart.zoomX(minDate.getTime(),maxDate.getTime())
  console.log(minDate.getTime(),maxDate.getTime());
  
}



</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h4">Overview Total Coronavirus Cases Filters</v-card-title>

        
      </div>

    </v-card-item>
  
    <div class="mt-0">
        <v-btn @click="filterChart('1month')">1 Month ago latest</v-btn>
        <v-btn @click="filterChart('6month')">6 Month ago latest</v-btn>
        <v-btn @click="filterChart('1year')">1 Years ago latest</v-btn>
        <v-btn  @click="filterChart('all')">All</v-btn>
    
    <apexchart 
    :ref="chart"
    :options="chartOptions" 
    :series="chartSeries"
    type="area" 
    height="500"></apexchart> 

 </div>
 
  <!-- :v-if="chartSeries.value[0].data.length0 === 1143" -->
  </v-card>
</template>

