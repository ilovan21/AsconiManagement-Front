<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import {computed, ref} from "vue";
import axios from "axios";
import experiences from "@/assets/experiences.jpg";
import ImageComponent from "@/components/ImageComponent.vue";
import image from "@/assets/baking.jpg";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";


const rules = computed(() => ({
  nameSurname: { required },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
}));


const route = useRoute();
const hallId = route.params.id;
const hallName = route.query.title;
const isBookingInProgress = ref(false);

const restaurantAvailabilityData = ref({
  nrPeople: "",
  date: "",
  arrivingTime: "",
  leavingTime:""
});

const restaurantReservationData = ref({
  nameSurname: "",
  email: "",
  phone: "",
  specifications: ""
});

const v$ = useVuelidate(rules, restaurantReservationData);

const availability = ref(null);
const availabilityMessage = ref("");
const availabilityErrorMessage = ref("");
const reservationMessage = ref("");
const date = ref("");
const arrivingTime = ref("");
const leavingTime=ref("");
const nrPeople = ref("");
const tableId=ref(null);

const checkAvailability = async () => {
  try {
    const requestAvailability = {
      nrPeople: restaurantAvailabilityData.value.nrPeople,
      hallId: hallId,
      date: restaurantAvailabilityData.value.date,
      arrivingTime: restaurantAvailabilityData.value.arrivingTime,
      leavingTime:restaurantAvailabilityData.value.leavingTime
    };
    console.log(requestAvailability);
    const response = await axios.post("http://localhost:8080/api/restaurant/public/check-availability", requestAvailability, {
      headers: { "Content-Type": "application/json" }
    });
    availabilityMessage.value=response.data.message;
    availability.value = response.data.available;
    availabilityMessage.value = response.data.message;
    date.value = response.data.date;
    arrivingTime.value = response.data.arrivingTime;
    leavingTime.value = response.data.leavingTime;
    nrPeople.value = response.data.nrPeople;
    tableId.value= response.data.tableId;

  } catch (error) {
    if (error.response && error.response.status === 409) {
      availabilityErrorMessage.value= error.response.data.message;
    } else {
      availabilityErrorMessage.value = 'Erreur.';
    }
  }
};

const reserveTable = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
  if (isBookingInProgress.value) return;
  isBookingInProgress.value = true;
  try {
    const requestReservation = {
      nrPeople: Number(nrPeople.value),
      hallId: hallId,
      date: date.value,
      arrivingTime: String(arrivingTime.value).slice(0, 5),
      leavingTime: String(leavingTime.value).slice(0, 5),
      nameSurname: restaurantReservationData.value.nameSurname,
      email: restaurantReservationData.value.email,
      phone: restaurantReservationData.value.phone,
      specifications: restaurantReservationData.value.specifications,
      tableIds:Array.isArray(tableId.value) ? tableId.value : [tableId.value]
    };

    const response = await axios.post("http://localhost:8080/api/restaurant/public/reserve", requestReservation, {
      headers: { "Content-Type": "application/json" }
    });
    if (response.status === 200 || response.status === 201) {
      console.log("Reservation successful:", response.data);
      reservationMessage.value = "Table réservée avec succès!";
    }
  } catch (error) {
    console.error("Error while reserving:", error);
    if (error.response.status === 409) {
      console.log("eroere 409");
      reservationMessage.value = error.response.data;
    } else {
      reservationMessage.value = "Erreur. Essayer à nouveau.";
    }
  } finally {
  isBookingInProgress.value = false;
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
          <h1 class="text-title">Book a table in {{ hallName }}</h1>
          <v-card-text>
            <v-form>
              <p class="form-text">Select the number of people</p>
              <v-text-field v-model="restaurantAvailabilityData.nrPeople" variant="outlined" required></v-text-field>
              <p class="form-text">Select the date</p>
              <v-text-field v-model="restaurantAvailabilityData.date" variant="outlined" required></v-text-field>
              <p class="form-text">Select the arriving hour</p>
              <v-text-field  v-model="restaurantAvailabilityData.arrivingTime" variant="outlined" required></v-text-field>
              <p class="form-text">Select the leaving hour</p>
              <v-text-field v-model="restaurantAvailabilityData.leavingTime" variant="outlined" required></v-text-field>
              <v-btn class="custom-button" @click="checkAvailability">Check Availability</v-btn>
              <p v-if="availabilityErrorMessage" class="message">{{ availabilityErrorMessage }}</p>

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
          <p class="booking-details">Table booked in {{hallName}} on {{ date }} at {{ arrivingTime }} for {{ nrPeople }} people.</p>
          <v-card class="pa-5" elevation="0">
            <v-card-title class="text-h5">Booking Details</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                    label="Name"
                    v-model="restaurantReservationData.nameSurname"
                    variant="outlined"
                    required
                    :error-messages="v$.nameSurname.$errors.map(e => e.$message)"></v-text-field>
                <v-text-field
                    label="Email"
                    v-model="restaurantReservationData.email"
                    variant="outlined"
                    required
                    :error-messages="v$.email.$errors.map(e => e.$message)"></v-text-field>
                <v-text-field
                    label="Phone Number"
                    v-model="restaurantReservationData.phone"
                    variant="outlined"
                    required
                    :error-messages="v$.phone.$errors.map(e => e.$message)"></v-text-field>
                <v-text-field
                    label="Specifications"
                    v-model="restaurantReservationData.specifications"
                    variant="outlined"></v-text-field>
                <v-btn
                    class="custom-button"
                    @click="reserveTable"
                    :disabled="isBookingInProgress">Confirm Booking</v-btn>
                <p v-if="reservationMessage" class="message">{{ reservationMessage }}</p>
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
  margin-left: 155px;
}
a {
  color: #b9523b;
}
.booking-details{
  font-weight: 400;
  margin-left: 38px;
}
.message{
  margin-top:15px;
  font-weight: 500;
}
</style>