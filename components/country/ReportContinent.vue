<script setup lang="ts">
import { dataContinent } from '@/data/dashboard/dashboardData';
import { number } from 'yup';
const select = ref("All");
const items = ref(["All","Europe", "North America", "Asia", "South America", "Africa" ,"Oceania"]);
</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
            <v-card-title class="text-h5 pt-sm-2 pb-7">Report Coronavirus Cases by Continent</v-card-title>
          
        </div>
        <v-table class="month-table">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-bold">#</th>
                    <th class="text-subtitle-1 font-weight-bold">Continent</th>
                    <th class="text-subtitle-1 font-weight-bold">Population</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">New Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">New Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">New Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">Active Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Serious Critical</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in dataContinent[0]" :key="item.continent" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.continent }}</h6>
                       
                    </td>
                    
                
                    <td>
                        <h6 class="text-body-1 text-muted">{{ item.population.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{ item.cases.toLocaleString('en') }}</h6>
                    </td>
                    <td v-if="item.todayCases > 0 ">
                        <v-chip  :class="'text-body-1  bg-primary'" color="white"  size="small" >+{{ item.todayCases.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayCases.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{ item.deaths.toLocaleString('en') }}</h6>
                    </td>
                    <td v-if="item.todayCases > 1 ">
                        <v-chip  :class="'text-body-1  bg-error'" color="white"  size="small" >+{{ item.todayDeaths.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayDeaths.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{ item.recovered.toLocaleString('en') }}</h6>
                    </td>
                    <td v-if="item.todayCases > 0">
                        <v-chip  :class="'text-body-1 bg-success'" color="white"  size="small" >+{{ item.todayRecovered.toLocaleString('en') }}</v-chip>
                       
                    </td>
                    <td v-else>
                        <h6 class="text-body-1 text-muted">{{ item.todayRecovered.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{ item.active.toLocaleString('en') }}</h6>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{ item.critical.toLocaleString('en') }}</h6>
                    </td>
                </tr>
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
</template>
