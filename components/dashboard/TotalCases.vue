<script setup lang="ts">

import { ref , watch } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import { arrTTC } from '@/data/dashboard/dashboardData';
import { number } from "yup/lib/locale";
// import * as dayjs from 'dayjs'

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const warning = theme.current.value.colors.warning;
const selectMonth = ref("January");
const itemsMonth = ref(["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]);
const selectYears = ref("ALL");
const itemsYears = ref(["ALL","2020", "2021", "2023"]);


const chartOptions = computed(() => {
  return {
 
    series: [{
              name: "Tolal Covid Cases",
              data: arrTTC[0],
              // format: localeString('en'),
              
            },
            
            {
              name: "Recovered Cases",
              data: arrTTC[1],
            },
            {
              name: 'Deaths Cases',
              data: arrTTC[2],
            }
          ],
    chartOptions: {
      
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
        
        categories: arrTTC[3],
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
      
      grid: {
        borderColor: '#f1f1f1',
      }
    },
    fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
              }
            },    
}
});
// console.log(chartOptions.value.chartOptions.xaxis);

// chartOptions.chartOptions.value = 

</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <div><v-card-title class="text-h5">Total Cases</v-card-title></div>
        <div class="d-sm-flex align-center justify-content-end pt-sm-2">
        <!-- <div class="my-sm-0 my-2">
          <v-select
            v-model="selectMonth"
            :items="itemsMonth"
            variant="outlined"
            density="compact"
            hide-details
            :class="{active: selection==='January'}"

          ></v-select>
        </div> -->
    
        <!-- <pre>Selected : {{ selectMonth }}</pre> -->
        <!-- <div class="my-sm-0 my-2">
        
          <v-select
            on-click="updateData()"
            v-model="selectYears"
            :items="itemsYears"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
          
        </div> -->
        </div>
      </div>

      <div class="mt-6">
       
        <div id="chart-timeline">
        <apexchart
  
          type="area"
          height="445px"
          :options="chartOptions.chartOptions"
          :series="chartOptions.series"
          :ref="chartOptions.chartOptions.chart"
    
        >
        </apexchart></div>
      </div>
    </v-card-item>
  </v-card>
</template>

