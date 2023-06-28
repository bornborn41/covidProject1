<script setup lang="ts">
import ReportContinent  from '@/components/country/ReportContinent.vue';
import CountryCase from '@/components/country/CountryCase.vue';

useHead({
  title: 'Countries '
})

</script>
<template>
    <!-- Report Coronavirus Cases -->
    <v-col cols="12" md="12" lg="12">
        <ReportContinent />
    </v-col>
    <v-row>
        <CountryCase />
    </v-row> 
    <v-col class="text-center mt-2" onclick="topFunction()">
        
            <p class="text-muted">on Top <v-avatar class="bg-lighterror text-accent ml-2" size="25" >
                <ArrowUpIcon size="20" />
              </v-avatar></p>
    </v-col>
</template>
