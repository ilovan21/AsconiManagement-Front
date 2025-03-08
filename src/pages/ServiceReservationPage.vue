<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import { ref } from "vue";
import axios from "axios";
import experiences from "@/assets/experiences.jpg";
import ImageComponent from "@/components/ImageComponent.vue";
import image from "@/assets/baking.jpg";

const route = useRoute();
const reservationId = route.params.id;
const serviceTitle = route.query.title;

const serviceAvailabilityData = ref({
  date: "",
  hour: "",
  nrPeople: ""
});

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
  <ImageComponent :src="experiences" />
  <v-container class="mx-auto">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5" elevation="0">
          <h1 class="text-title">Book a place for {{ serviceTitle }}</h1>
          <v-card-text>
            <v-form>
              <p class="form-text">Select the date</p>
              <v-text-field v-model="serviceAvailabilityData.date" variant="outlined" required></v-text-field>
              <p class="form-text">Select the hour</p>
              <v-text-field v-model="serviceAvailabilityData.hour" variant="outlined" required></v-text-field>
              <p class="form-text">Select the number of people</p>
              <v-text-field v-model="serviceAvailabilityData.nrPeople" variant="outlined" required></v-text-field>
              <v-btn class="custom-button" @click="checkAvailability">Check Availability</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-img
            class="mt-3 align-center mt-1"
            :src="image"
            contain
            width="500"
            height="490"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="second-form">
  <v-row>
    <v-col cols="12" md="6">
      <div v-if="availability === true">
        <p class="booking-details">Place booked on: {{ date }} at {{ hour }} for {{ nrPeople }} people.</p>
        <v-card class="pa-5" elevation="0">
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
.text-title{
  margin-left: 20px;
  font-weight: 200;
}
.form-text{
  margin-left: 2px;
  margin-bottom: 10px;
}
.text-h5{
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: 200;
}
.reserve-container {
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
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
.second-form{
  margin-left: 150px;
}
a {
  color: #b9523b;
}
.booking-details{
  font-weight: 400;
  margin-left: 35px;
}
</style>