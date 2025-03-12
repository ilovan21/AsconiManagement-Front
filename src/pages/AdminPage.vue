<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import StaffNavbar from '@/components/StaffNavbar.vue'
import { VDateInput } from 'vuetify/labs/VDateInput';
const route = useRoute();
const name = route.query.nameSurname;
const email = route.query.email;
const date = ref(null);
const currentDate = new Date();
const maxDate = currentDate.toISOString().split('T')[0];
</script>

<template>
  <v-app id="inspire">
    <StaffNavbar :name="name"
                 :email="email"/>
    <v-main>
        <p>Select a date</p>
        <v-date-input
            variant="outlined"
            v-model="date"
            :max="maxDate"
        ></v-date-input>
    </v-main>
  </v-app>
</template>
<style scoped>

</style>
