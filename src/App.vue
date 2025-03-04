<script setup>
import {RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <v-app id="inspire">
    <Navbar />
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
