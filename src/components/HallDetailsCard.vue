<script setup>
import axios from "axios";
import {ref} from "vue";

defineProps({
  tables: Array
});

const disabledDates = ref([]);
const date = ref(new Date());
const unavailableDate = ref();
const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(disabledDates.value)];

  return !uniqueDisabledDates.includes(formattedDate);
};

const getUnavailableDates = async (hallId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/hall?hallId=${hallId}`);
    if (Array.isArray(response.data)) {
      disabledDates.value = response.data.map(date => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
      });
    } else {
      console.error('Invalid data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching disabled dates:', error);
  }
};

</script>

<template>
  <v-row dense no-gutters>
    <v-col cols="12" md="6">
      <v-container class="container">
        <v-row class="mt-8 mb-2">
          <v-col class="12">
            <p>Total Capacity</p>
          </v-col>
          <v-col class="12">
            <p>120 p.</p>
          </v-col>
        </v-row>
        <v-row class="mb-2">
          <v-col class="12">
            <p>Style</p>
          </v-col>
          <v-col class="12">
            <p>Rustic</p>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-10">
          Tables
        </v-row>
        <v-row>
        <v-col
            class="pa-0 ma-3"
            v-for="table in tables"
            :key="table.id"
            cols="6" sm="4" md="2"
        >
          <v-card class="card ma-0">
            <v-card-title>{{ table.name }}</v-card-title>
            <v-card-subtitle> {{ table.capacity }}</v-card-subtitle>
            <v-card-text> {{ table.status }}</v-card-text>
          </v-card>
        </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12" md="6">
      <v-date-picker class="custom-picker">
      </v-date-picker>
    </v-col>
    </v-row>
  </template>

<style scoped>
.container{
  padding:5px;
  width: 500px;
}
.card{
  margin:10px;
  background-color: #9e1f1f;
  width:90px;
  height:50px
}
.card.add {
  background-color: rgba(200, 194, 192, 0.62);
}
.no-header .v-picker__title {
  display: none;
}
p {
  font-size: 16px;
  font-weight: 400;
}
.category {
  font-weight: 500;
}
.custom-picker{
    margin-left: 50px;
    width: 400px;
}
</style>
