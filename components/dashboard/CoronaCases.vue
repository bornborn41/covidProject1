<script setup lang="ts">
import { ref,onMounted ,computed} from "vue";
import { useTheme } from "vuetify";
import { fetchTotalCovidData ,fetchHistoricalAll,} from '@/server/apiFetch'
import { totalCovidType } from '@/types/dashboard/index'
import { transformTotalCovidData, transformHistoricalAll } from '@/data/dashboard/dashboardData';
import axios from "axios";
import LayoutFullChartMiniCases from '@/components/layout/full/chart/MiniCases.vue';

/* Interface TotalCovidData { */
  interface TotalCovid {
  cases: number;
  deaths: number;
  recovered: number;
}

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const coronaCasesData = ref<any>([]);
console.log(coronaCasesData);

onMounted(async () => {
  try {
  const totalCovidData = await fetchTotalCovidData();
  const transformed = transformTotalCovidData(totalCovidData);
  coronaCasesData.value = transformed
  
  } catch (error) {
    console.error('Error fetching Total COVID-19 data:', error);
  }

});


</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h4">Coronavirus Cases</v-card-title>
        <NuxtLink to="/countries">
        <v-btn size="large" icon class="bg-primary">
          <v-avatar size="large" class="text-white">
            <ChartLineIcon size="25" />
          </v-avatar>
        </v-btn>
      </NuxtLink>
      </div>
      <v-row>
        <v-col cols="12">
          <div v-for="data in coronaCasesData" :key="data.cases" class="mt-2">
            <div  >
              
                 <h2 class="text-h2"><UsersIcon size="30"  />{{data.cases.toLocaleString('en')}}</h2>
            </div>
            <div class="mt-2">
              <v-avatar class="bg-lighterror text-accent ml-2" size="25" >
                <ArrowDownLeftIcon size="20" />
              </v-avatar>
              <span class="text-subtitle-1 ml-2  font-weight-bold">
                {{data.todayCases.toLocaleString('en')}}
              </span>
              <span class="text-subtitle-1 text-muted ml-2">of Today Cases</span>
            </div>


          </div>
        </v-col>
      </v-row>
    </v-card-item>  
    <div class="mt-0" >
    <LayoutFullChartMiniCases/>
    </div>
  </v-card>
</template>
