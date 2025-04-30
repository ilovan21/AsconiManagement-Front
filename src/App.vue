<script setup>
import {RouterView} from 'vue-router'
import ClientNavbar from "@/components/pageElements/ClientNavbar.vue";
import ClientFooter from "@/components/pageElements/ClientFooter.vue"
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
#inspire {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.v-main {
  flex-grow: 1;
  background-color: white;
}
</style>
