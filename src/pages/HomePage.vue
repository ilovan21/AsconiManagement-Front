<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { VDateInput } from 'vuetify/labs/VDateInput';

const route = useRoute();
const reservationId = "1";
const serviceTitle = route.query.title;
const date = ref(null);
const hour = ref(null);
const nrPeople = ref(null);
const errorMessage = ref("");
const currentDate = new Date();
const minDate = currentDate.toISOString().split('T')[0];
const disabledDates = ref([]);

onMounted(() => {
  getUnavailableDates(reservationId);
});
const getUnavailableDates = async (reservationId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/service?serviceId=${reservationId}`);
    if (Array.isArray(response.data)) {
      disabledDates.value = [...response.data];
    } else {
      console.error('Invalid data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching disabled dates:', error);
  }
};
const isAllowedDate = (dateToCheck) => {
  const formattedDate = dateToCheck.toISOString().split('T')[0];
  const extractedDates = [...disabledDates.value];
  console.log('Checking Date:', formattedDate);
  console.log('Disabled Dates in Function:', extractedDates);

  return !extractedDates.includes(formattedDate);
};



</script>

<template>
  <v-container class="mx-auto">
    <v-row justify="center" align="start">
      <v-col cols="12" md="6">
        <v-card class="pa-5" elevation="0">
          <h1 class="text-title">Book a place for {{ serviceTitle }}</h1>
          <v-card-text>
            <v-form>
              <p class="form-text">Select the date</p>
              <v-date-input
                  variant="outlined"
                  v-model="date"
                  :min="minDate"
                  :allowed-dates="isAllowedDate"
              ></v-date-input>
              <p class="form-text">Select the hour</p>
              <v-text-field v-model="hour" variant="outlined" required></v-text-field>
              <p class="form-text">Select the number of people</p>
              <v-text-field
                  v-model="nrPeople"
                  variant="outlined"
                  required
                  :min="0"
                  type="number"
                  :error-messages="errorMessage"
              ></v-text-field>
              <v-btn class="custom-button">Check Availability</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-title {
  margin-left: 20px;
  font-weight: 200;
}
.form-text {
  margin-left: 2px;
  margin-bottom: 10px;
}
.custom-button {
  min-width: fit-content;
  padding: 40px 30px;
  color: #b9523b;
  font-size: 17px;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-width: 1px;
  border-color: #b9523b;
  border-radius: 0px;
}
</style>
