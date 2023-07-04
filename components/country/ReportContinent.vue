<script setup lang="ts">
import {fetchContinents} from '@/server/apiFetch'
import { transformContinentsData } from '@/data/dashboard/dashboardData';
import { ContinentsType } from '@/types/dashboard/index'

const select = ref("All");
const items = ref(["All","Europe", "North America", "Asia", "South America", "Africa" ,"Oceania"]);
const tableRows = ref<ContinentsType[]>([]);
const tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'continent', header: 'Continent' },
    { field: 'population', header: 'Population' },
    { field: 'cases', header: 'Toltal Cases' },
    { field: 'new_cases', header: 'New Cases' },
    { field: 'deaths', header: 'Toltal Deaths' },
    { field: 'new_deaths', header: 'New Deaths' },
    { field: 'recovered', header: 'Toltal Recovered' },
    { field: 'new_recovered', header: 'New Recovered' },
    { field: 'active_cases', header: 'Active Cases' },
    { field: 'serious_critical', header: 'Serious Critical' },
]
onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  try {
    const data = await fetchContinents();
    const transformedData = transformContinentsData(data);
    tableRows.value = transformedData;
    
  } catch (error) {
    console.error('Error fetching historical data:', error);
  }
}
console.log(tableRows);

</script>
<template>
   <div class="mb-2">
      <v-card elevation="10" class="withbg">
        <v-card-item class="pa-6">
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
            <v-card-title class="text-h5 pt-sm-2 pb-7">Report Coronavirus Cases by Continent</v-card-title>
          
        </div>
        <v-table class="month-table">
            <thead>
                <tr>
                    <th  v-for="(item,index) in tableColumns" :key="item.header" class="text-subtitle-1 font-weight-bold">{{item.header}}</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableRows[0]" :key="item.continent" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{index+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{item.continent}}</h6>
                       
                    </td>
                    <td>
                        <h6 class="text-body-1 font-weight-bold text-muted">{{item.population.toLocaleString('en')}}</h6>
                    </td>
                
                    <td>
                        <h6 class="text-body-1 text-muted">{{item.cases.toLocaleString('en')}}</h6>
                    </td>

                    <td v-if="item.todayCases > 0 ">
                        <v-chip  :class="'text-body-1  bg-primary'" color="white"  size="small" >+{{ item.todayCases.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayCases.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{item.deaths.toLocaleString('en')}}</h6>
                    </td>
                    <td v-if="item.todayDeaths > 0 ">
                        <v-chip  :class="'text-body-1  bg-error'" color="white"  size="small" >+{{ item.todayDeaths.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayDeaths.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{item.recovered.toLocaleString('en')}}</h6>
                    </td>
                    <td v-if="item.todayRecovered > 1 ">
                        <v-chip  :class="'text-body-1  bg-success'" color="white"  size="small" >+{{ item.todayRecovered.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayRecovered.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{item.active.toLocaleString('en')}}</h6>
                    </td>
                  
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{item.critical.toLocaleString('en')}}</h6>
                    </td>

                </tr>
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
    </div>
</template>
