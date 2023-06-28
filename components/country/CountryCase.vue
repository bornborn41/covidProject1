<script setup lang="ts">
import { dataCountries } from '@/data/dashboard/dashboardData';

const selectContinent = ref("All");
const itemsContinent = ref(["All","Africa" ,"Asia","Australia-Oceania","Europe", "North America",  "South America" ]);
const Africa:string[] = []
const Asia:string[] = []
const Australia:string[] = []
const Europe:string[] = []
const North:string[] = []
const South:string[] = []
let newData = dataCountries[0]
const datacON = JSON.parse(JSON.stringify(newData));
for ( let i in datacON){
    if (datacON[i].continent === "Africa" ){
        Africa.push(datacON[i])
    }else if (datacON[i].continent === "Asia" ){
        Asia.push(datacON[i])
    }else if (datacON[i].continent === "Australia-Oceania" ){
        Australia.push(datacON[i])
    }else if (datacON[i].continent === "Europe" ){
        Europe.push(datacON[i])
    }else if (datacON[i].continent === "North America" ){
        North.push(datacON[i])
    }else{
        South.push(datacON[i])
    }

}
</script>
<template>
    <v-col cols="12" md="12">
            <UiParentCard title="Icons"> 
                <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
            <v-card-title class="text-h5 pt-sm-2 pb-7">Report Coronavirus Cases by Countries</v-card-title>
            <div class="my-sm-0 my-2">
          <v-select
            v-model="selectContinent"
            :items="itemsContinent"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>
        
        </div>
        
        <v-table class="month-table">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-bold">#</th>
                    <th class="text-subtitle-1 font-weight-bold">Country</th>
                    <th class="text-subtitle-1 font-weight-bold">Population</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">New Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">New Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">New Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">Active Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Serious Critical</th>
                    <!-- <th class="text-subtitle-1 font-weight-bold">Time Update</th> -->
                </tr>
            </thead>
           
            <tbody v-if="selectContinent === 'All'">
                <tr v-for="(item,key) in dataCountries[0]" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
       
        
            <tbody v-else-if="selectContinent === 'Asia'">
                <tr v-for="(item,key) in Asia" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="selectContinent === 'Africa'">
                <tr v-for="(item,key) in Africa" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="selectContinent === 'South America'">
                <tr v-for="(item,key) in South" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="selectContinent === 'Australia-Oceania'">
                <tr v-for="(item,key) in Australia" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="selectContinent === 'North America'">
                <tr v-for="(item,key) in North" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="selectContinent === 'Europe'">
                <tr v-for="(item,key) in Europe" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{key+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{ item.country }}</h6>
                       
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
                    <td>
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{ item.updated.toString() }}</h6> -->
                    </td>
                </tr>
            </tbody>
        </v-table>
    
        
        </v-card-item>
    </v-card>
            </UiParentCard>
        </v-col>
</template>