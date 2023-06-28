<script setup lang="ts">
/*Call Components*/
import CasesFilter  from '@/components/filter/CasesFilter.vue';
import TotalFilter  from '@/components/filter/TotalFilter.vue';
import DeathFilter  from '@/components/filter/DeathFilter.vue';
import RecoveredFilter  from '@/components/filter/RecoveredFilter.vue';
useHead({
  title: 'Filter'
})
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- CoronaCases DeathsCases  RecoveredCases-->
                <v-col cols="12" lg="12">
                    <div class="mb-2">
                        <CasesFilter />
                    </div>
                    <!-- <div class="mb-2">
                        <DeathFilter />
                    </div> -->
                    <div class="mb-2">
                        <RecoveredFilter />
                    </div>
                </v-col>
                <!-- Total Cases -->
                <v-col cols="12" lg="12">
                    <TotalFilter />
                </v-col>
                
                <!-- Report Coronavirus Cases -->
                <!-- <v-col cols="12" lg="12">
                    <CountryCases />
                </v-col> -->
    
                
               
            </v-row>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Coronavirus Reports Ref:<a flat variant="text" href="https://disease.sh/docs/*****#/COVID-19%3A%20Worldometers/get_v3_covid_19_all" target="_blank" class="pl-1 text-primary">https://disease.sh/docs/</a></p>
        </v-col>
    </v-row>
</template>