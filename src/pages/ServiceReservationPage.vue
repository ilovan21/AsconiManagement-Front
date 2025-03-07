<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import { ref } from "vue";
import axios from "axios";

const route = useRoute();
const reservationId = route.params.id;

// Date pentru verificarea disponibilității
const serviceAvailabilityData = ref({
  date: "",
  hour: "",
  nrPeople: ""
});

// Date pentru rezervare
const serviceReservationData = ref({
  nameSurname: "",
  email: "",
  phone: "",
  language: "",
  specifications: ""
});

const availability = ref(null);
const message = ref("");
const date = ref("");
const hour = ref("");
const nrPeople = ref("");

const checkAvailability = async () => {
  try {
    const requestAvailability = {
      serviceId: reservationId,
      nrPeople: serviceAvailabilityData.value.nrPeople,
      date: serviceAvailabilityData.value.date,
      hour: serviceAvailabilityData.value.hour
    };

    const response = await axios.post("http://localhost:8080/api/service/public/check-availability", requestAvailability, {
      headers: { "Content-Type": "application/json" }
    });

    console.log(response.data);

    availability.value = response.data.available;
    message.value = response.data.message;
    date.value = response.data.date;
    hour.value = response.data.hour;
    nrPeople.value = response.data.nrPeople;

  } catch (error) {
    console.error("error:", error);
    message.value = "An error occurred while checking availability.";
  }
};

const reserveService = async () => {
  try {
    const requestReservation = {
      touristicServiceId: reservationId,
      nameSurname: serviceReservationData.value.nameSurname,
      email: serviceReservationData.value.email,
      phone: serviceReservationData.value.phone,
      date: date.value,
      hour: String(hour.value).slice(0, 5),
      language: serviceReservationData.value.language,
      nrPeople: Number(nrPeople.value),
      specifications: serviceReservationData.value.specifications
    };
    console.log("Request payload:", requestReservation);

    const response = await axios.post("http://localhost:8080/api/service/public/reserve", requestReservation, {
      headers: { "Content-Type": "application/json" }
    });

    console.log(response.data);
    message.value = "Reservation successfully made!";
  } catch (error) {
    console.error("error:", error);
    message.value = "An error occurred while making the reservation.";
  }
};
</script>

<template>
  <ClientNavbar />
  <v-container fluid class="auth-container">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="3">
          <v-card-title class="text-h5">Check Availability</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Date" v-model="serviceAvailabilityData.date" variant="outlined" required></v-text-field>
              <v-text-field label="Hour" v-model="serviceAvailabilityData.hour" variant="outlined" required></v-text-field>
              <v-text-field label="NrPeople" v-model="serviceAvailabilityData.nrPeople" variant="outlined" required></v-text-field>
              <v-btn class="custom-button" @click="checkAvailability">Check Availability</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <p v-if="message">{{ message }}</p>

        <div v-if="availability === true">
          <p>Place booked on: {{ date }} at {{ hour }} for {{ nrPeople }} people.</p>
          <v-card class="mt-4">
            <v-card-title class="text-h5">Booking Details</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Name" v-model="serviceReservationData.nameSurname" variant="outlined" required></v-text-field>
                <v-text-field label="Email" v-model="serviceReservationData.email" variant="outlined" required></v-text-field>
                <v-text-field label="Phone Number" v-model="serviceReservationData.phone" variant="outlined" required></v-text-field>
                <v-text-field label="Preferred Language" v-model="serviceReservationData.language" variant="outlined" required></v-text-field>
                <v-text-field label="Specifications" v-model="serviceReservationData.specifications" variant="outlined"></v-text-field>
                <v-btn class="custom-button" @click="reserveService">Confirm Booking</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <ClientFooter />
</template>

<style scoped>
</style>
