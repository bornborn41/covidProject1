<script setup lang="ts">
import { ref ,onMounted,computed} from "vue";
import { fetchTotalCovidData } from '@/server/apiFetch'
import {  transformTotalCovidData } from '@/data/dashboard/dashboardData';
import axios from "axios";

const coronaCasesData = ref<any>([]);

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
        <v-card-title class="text-h5">Recovered</v-card-title>
        <v-btn size="large" icon class="bg-warning">
          <v-avatar size="large" class="text-white">
            <RotateRectangleIcon size="25" />
          </v-avatar>
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <div v-for="data in coronaCasesData" :key="data.recovered"  class="mt-2">
            <div >
            <h2 class="text-h2"><UsersIcon size="25" />{{data.recovered.toLocaleString('en')}}</h2>
            
          </div>
          <div class="mt-2">
              <v-avatar class="bg-lighterror text-accent ml-2" size="25" >
                <RotateRectangleIcon size="20" />
              </v-avatar>
              <span class="text-subtitle-1 ml-2  font-weight-bold">
                {{data.todayRecovered.toLocaleString('en')}}
              </span>
              <span class="text-subtitle-1 text-muted ml-2">of Today Recovered</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    
  </v-card>
</template>
