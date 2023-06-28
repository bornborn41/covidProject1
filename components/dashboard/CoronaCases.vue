<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import { datacovidAll } from '@/data/dashboard/dashboardData';
import { arrDTk } from '@/data/dashboard/dashboardData';
import { arrDTv } from '@/data/dashboard/dashboardData';
// import { removeDuplicates } from "@tiptap/vue-3";
// import { VTabItem } from "vuetify/lib";

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;


/* Chart */
const areachartOptions = computed(() => {
  return {
    // labels: ["1", "2", "3", "4", "5", "6", "7","1", "2", "3", "4", "5", "6", "7"],
    labels: arrDTk,
    chart: {
      type: "area",
      height: 60,
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
        show: true,
      },
    },
  };
});

const areaChart = {
  series: [
    {
      name: "",
      data: arrDTv
    },
  ],
};
</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h4">Coronavirus Cases</v-card-title>
        <NuxtLink to="/countries">
        <v-btn size="large" icon class="bg-primary">
          <v-avatar size="large" class="text-white">
            <ExternalLinkIcon size="25" />
          </v-avatar>
        </v-btn>
      </NuxtLink>
      </div>
      <v-row>
        <v-col cols="12">
          <div  class="mt-2">
            <div v-for="casesAll in datacovidAll" :key="casesAll?.cases" >
                 <h2 class="text-h2"><UsersIcon size="30"  />{{casesAll?.cases.toLocaleString('en')}}</h2>
            </div>
            <div class="mt-4">
              <span class="text-subtitle-1 ml-2  font-weight-bold">Covid Cases</span>
              <span class="text-subtitle-1 text-muted ml-2">This Years</span>
              
              <v-avatar class="bg-lighterror text-accent ml-2" size="25" >
                <ArrowUpRightIcon size="20" />
              </v-avatar>
           
            </div>
          
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    <div class="mt-0" >
      <apexchart
        type="area"
        height="85"
        :options="areachartOptions"
        :series="areaChart.series"
      >
      </apexchart>
    </div>
  </v-card>
</template>
