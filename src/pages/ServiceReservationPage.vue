<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
const route = useRoute();
const reservationId=route.params.id;
</script>

<template>
  <ClientNavbar/>
Reservation for Id: {{reservationId}}

  <ClientFooter/>
</template>

<style scoped>

</style>