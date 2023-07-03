<script setup lang="ts">
import { ref ,onMounted,computed} from "vue";
import { fetchTotalCovidData } from '@/server/apiFetch'
import { totalCovidType } from '@/types/dashboard/index'

const data = ref<totalCovidType | null>(null);
const isLoading = ref(true);

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    const totalCovidData = await fetchTotalCovidData();
    data.value = totalCovidData 
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
})


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
          <div class="mt-2">
            <div >
              <h2 v-if="isLoading"  class="text-h2"><UsersIcon size="25" />Loading...</h2>
              <h2 v-else class="text-h2"><UsersIcon size="25" />{{data.recovered.toLocaleString('en')}}</h2>
            
          </div>
          <div class="mt-2">
              <v-avatar class="bg-lighterror text-accent ml-2" size="25" >
                <RotateRectangleIcon size="20" />
              </v-avatar>
              <span v-if="isLoading"  class="text-subtitle-1 ml-2  font-weight-bold">
                Loading...
              </span>
              <span v-else  class="text-subtitle-1 ml-2  font-weight-bold">
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
