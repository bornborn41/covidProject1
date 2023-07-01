<script setup lang="ts">
import { fetchCountries } from '@/server/apiFetch'
import { transformCountriesData } from '@/data/dashboard/dashboardData';
import { countriesTypeType } from '@/types/dashboard/index'

interface Countries {
    updated: number,
    country: string,
    countryInfo: {
        _id: number,
        iso2: string,
        iso3: string,
        lat: number,
        long: number,
        flag: string
    },
    cases: number,
    todayCases: number,
    deaths: number,
    todayDeaths: number,
    recovered: number,
    todayRecovered: number,
    active: number,
    critical: number,
    casesPerOneMillion: number,
    deathsPerOneMillion: number,
    tests: number,
    testsPerOneMillion: number,
    population: number,
    continent: number,
    oneCasePerPeople: number,
    oneDeathPerPeople: number,
    oneTestPerPeople: number,
    activePerOneMillion: number,
    recoveredPerOneMillion: number,
    criticalPerOneMillion: number
}

const tableRows = ref<countriesTypeType[]>([]);
const filteredTableRows = ref<countriesTypeType[]>([]);
const selectContinent = ref<any[]>(['ALL']);
const tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'countries', header: 'Countries' },
    { field: 'population', header: 'Population' },
    { field: 'cases', header: 'Toltal Cases' },
    { field: 'new_cases', header: 'New Cases' },
    { field: 'deaths', header: 'Toltal Deaths' },
    { field: 'new_deaths', header: 'New Deaths' },
    { field: 'recovered', header: 'Toltal Recovered' },
    { field: 'new_recovered', header: 'New Recovered' },
    { field: 'active_cases', header: 'Active Cases' },
    { field: 'serious_critical', header: 'Serious Critical' },
    { field: 'continent', header: 'Continent' },
    { field: 'flag', header: 'Flag' },
]
onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  try {
    const data = await fetchCountries();
    const transformedData = transformCountriesData(data);
    tableRows.value = transformedData;
    filteredTableRows.value= transformedData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
  }
}
console.log(tableRows);

const uniqueContinent = computed(() => {
   
    const continent = new Set<string>();
    for (const item of tableRows.value) {
        console.log(item);
    }

return Array.from(continent);
  
  
});
// const filterByContinent = () => {
//     tableRows.value = filteredTableRows.value.filter(item => {
//     const itemContinent = item.continent
//     return itemYear === selectedYear.value && itemMonth === selectedMonth.value;
//   });
// };

function test(){
    const continent = new Set<string>();
    
    console.log(continent);

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
                <!-- <v-btn @click="test()" >TEST</v-btn> -->
          <v-select
            v-model="selectContinent"
            :items="uniqueContinent"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>
        
        </div>
        <v-table class="month-table">
            <thead>
                <tr>
                    <th  v-for="(item,index) in tableColumns" :key="item.header" class="text-subtitle-1 font-weight-bold">{{item.header}}</th>
                    <!-- <th class="text-subtitle-1 font-weight-bold">Continent</th>
                    <th class="text-subtitle-1 font-weight-bold">Population</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">New Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">New Deaths</th>
                    <th class="text-subtitle-1 font-weight-bold">Total Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">New Recovered</th>
                    <th class="text-subtitle-1 font-weight-bold">Active Cases</th>
                    <th class="text-subtitle-1 font-weight-bold">Serious Critical</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableRows[0]" :key="item.country" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{index+1}}</p>
                    </td>
                    <td>
                         <h6 class="text-h6 text-subtitle-1 font-weight-bold">{{item.country}}</h6>
                       
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
                    <td>
                        <h6 class="text-body-1 text-muted font-weight-medium">{{item.continent}}</h6>
                    </td>
                    <td>
                        <v-img
                            :width="170"
                            aspect-ratio="16/9"
                            cover
                            src="{{item.countryInfo['flag']}}">
                        </v-img>
                       
                        <!-- <h6 class="text-body-1 text-muted font-weight-medium">{{item.countryInfo['flag']}}</h6> -->
                    </td>
                </tr>
            </tbody>
        </v-table>

    
        
        </v-card-item>
    </v-card>
            </UiParentCard>
        </v-col>
</template>