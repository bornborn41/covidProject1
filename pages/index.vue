<script setup lang="ts">
/*Call Components*/
import TotalCases from '@/components/dashboard/TotalCases.vue';
import CoronaCases from '@/components/dashboard/CoronaCases.vue';
import DeathsCases from '@/components/dashboard/DeathsCases.vue';
import RecoveredCases from '@/components/dashboard/RecoveredCases.vue';
import ReportCoronavirusCases from '@/components/dashboard/ReportCoronavirusCases.vue';

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- CoronaCases DeathsCases  RecoveredCases-->
                <v-col cols="12" lg="4">
                    <div class="mb-2">
                        <CoronaCases />
                    </div>
                    <div  class="mb-2">
                        <RecoveredCases />
                    </div>
                    <div class="mb-2">
                        <DeathsCases />
                    </div>

                </v-col>
                <!-- Total Cases -->
                <v-col cols="12" lg="8">
                    <TotalCases />
                </v-col>
                
                <!-- Report Coronavirus Cases -->
                <v-col cols="12" lg="12">
                    <ReportCoronavirusCases />
                </v-col>
    
                
               
            </v-row>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Coronavirus Reports Ref:<a flat variant="text" href="https://disease.sh/docs/*****#/COVID-19%3A%20Worldometers/get_v3_covid_19_all" target="_blank" class="pl-1 text-primary">https://disease.sh/docs/</a></p>
        </v-col>
    </v-row>
</template>