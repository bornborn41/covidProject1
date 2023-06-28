<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import { datacovidAll } from '@/data/dashboard/dashboardData';

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;

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
            <div v-for="casesAll in datacovidAll" :key="casesAll?.recovered" >
            <h2 class="text-h2"><UsersIcon size="25" />{{casesAll?.recovered.toLocaleString('en')}}</h2>
          </div>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    
  </v-card>
</template>
