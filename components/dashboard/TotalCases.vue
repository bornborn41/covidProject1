<script setup lang="ts">
import { ref , watch,computed  } from "vue";
import { useTheme } from "vuetify";
import ApexCharts from 'apexcharts'
import axios from "axios";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import { transformHistoricalAll } from '@/data/dashboard/dashboardData';


const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const warning = theme.current.value.colors.warning;

const selectMonth = ref("January");
const itemsMonth = ref(["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]);
const selectYears = ref("ALL");
const itemsYears = ref(["ALL","2020", "2021", "2023"]);

const chartSeries = ref<any>([])
const filteredSeries = ref<any>([])

/* Chart Options*/
const chartOptions = ref<any>({
  chart: {
        id: 'area-datetime',
        type: 'area',
        height: 500,
        // type: 'line',
        zoom: {
          enabled: false,
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
// console.log(chartOptions.value.chartOptions.xaxis);
onMounted(async () => {
  try {
  const historicalAllResponse = await fetchHistoricalAll();
  const historicalAllCofigURL = historicalAllResponse.config.url;
  const response = await axios.get(historicalAllCofigURL+'/all?lastdays=all');
  const historicalAllData = response.data
  const transformed = transformHistoricalAll(historicalAllData);

  const cases = Object.values(transformed[0]).map((item,index) => {
    return [item.timeline,item.data]
  });
  const deaths = Object.values(transformed[1]).map((item,index) => {
    return [item.timeline,item.data]
  });
  const recovered = Object.values(transformed[2]).map((item,index) => {
    return [item.timeline,item.data]
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


</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Overview Total Coronavirus Cases </v-card-title>

      </div>

      <div class="mt-6">
       
        <div id="chart-timeline">
        <apexchart
          type="area"
          height="510px"
          :options="chartOptions" 
          :series="chartSeries"
        ></apexchart>
      </div>
      </div>
    </v-card-item>
  </v-card>
</template>

