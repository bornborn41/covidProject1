<script setup lang="ts">
import { ref,onMounted ,computed} from "vue";
import { useTheme } from "vuetify";
import { fetchHistoricalAll,} from '@/server/apiFetch'
import {  transformHistoricalAll } from '@/data/dashboard/dashboardData';
import axios from "axios";

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const chartSeries = ref<any>([]);

/* Chart */
const chartOptions = ref<any>({
  chart: {
      type: "area",
      height: 85,
      fontFamily: `inherit`,
      foreColor: "#a1aab2",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    yaxis: {
      offsetX: 0,
      formatter: function(val:number) {
                  return (val).toLocaleString('en');
      },
    },
    xaxis: {
      type: 'datetime',
    },
    colors: [secondary],
    stroke: {
      
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },

    tooltip: {
      theme: "light",
      x: {

        show: false,
        format: 'dd MMM yyyy',
      },
      y:{
        
        formatter: function(val:number) {
                  return (val + " cases").toLocaleString('en');
      },
      }
  
  }
});

onMounted(async () => {
  try {
  
  const chartCasesRes = await fetchHistoricalAll();
  const chartCasesCofigURL = chartCasesRes.config.url;
  const response = await axios.get(chartCasesCofigURL+'/all');
  const chartCasesData = await response.data
  const seriestransformed = transformHistoricalAll(chartCasesData);
  const series = Object.values(seriestransformed[0]).map((item) => {
    return [item.date,item.data]
  })
  chartSeries.value = [
  {
    name:"Cases of 2023",
    data: series
  }
  ]

  } catch (error) {
    console.error('Error fetching Total COVID-19 data:', error);
  }

});

</script>
<template>
      <div class="mt-0" >
        <apexchart
          type="area"
          height="100"
          :options="chartOptions"
          :series="chartSeries"
        >
        </apexchart>
      </div>

</template>
  