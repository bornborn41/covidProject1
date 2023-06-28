<script setup lang="ts">
import { RouterView } from 'vue-router';
const title = ref("Dashboard - CoronaVirus2019 Reports");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - CoronaVirus2019 Reports`
      : "Dashboard - CoronaVirus2019 Reports";
  },
});
</script>

<template>
    <v-locale-provider >
        <v-app>
            <LayoutFullMain/>
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
