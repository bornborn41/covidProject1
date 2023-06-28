<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import { SkullIcon } from "vue-tabler-icons";
import { datacovidAll } from '@/data/dashboard/dashboardData';

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
const danger = theme.current.value.colors.danger;

</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Deaths</v-card-title>
        <v-btn size="large" icon class="bg-error">
          <v-avatar size="large" class="text-white">
            <SkullIcon size="25" />
          </v-avatar>
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <div class="mt-2">
            <div v-for="casesAll in datacovidAll" :key="casesAll?.deaths" >
            <h2 class="text-h2"><UsersIcon size="25" />{{casesAll?.deaths.toLocaleString('en')}}</h2>
          </div>
           
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    
  </v-card>
</template>
