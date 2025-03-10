<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import experiences from "@/assets/experiences.jpg";
import ImageComponent from "@/components/ImageComponent.vue";
import image from "@/assets/baking.jpg";
import { required, email, minLength } from "@vuelidate/validators";
import { watch } from "vue";
import { VDateInput } from 'vuetify/labs/VDateInput';
import useVuelidate from "@vuelidate/core";
const route = useRoute();
const reservationId = route.params.id;
const serviceTitle = route.query.title;
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
      // Ensure all dates are in YYYY-MM-DD format
      disabledDates.value = response.data.map(date => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0]; // Standardize the format
      });
      console.log("dates", disabledDates);
    } else {
      console.error('Invalid data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching disabled dates:', error);
  }
};

const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(disabledDates.value)];

  return !uniqueDisabledDates.includes(formattedDate);
};



const rules = computed(() => ({
  nameSurname: { required },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
}));

const checkAvailabilityRules = computed(() => ({
  date: { required },
  hour: { required },
  nrPeople:{required}
}));
const successMessage=ref(null);
const errorMessage = ref(null);

function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

const serviceAvailabilityData = ref({
  date: null,
  hour: "",
  nrPeople: "1"
});

const serviceReservationData = ref({
  nameSurname: "",
  email: "",
  phone: "",
  language: "",
  specifications: ""
});

const v$ = useVuelidate(rules, serviceReservationData);
const c$=useVuelidate(checkAvailabilityRules,serviceAvailabilityData);

const availability = ref(null);
const message = ref("");
const date = ref("");
const hour = ref("");
const nrPeople = ref("");
const availabilityErrorMessage=ref("");

watch(serviceAvailabilityData, (newData) => {
  date.value = newData.date;
  hour.value = newData.hour;
  nrPeople.value = newData.nrPeople;
});

watch(serviceAvailabilityData, () => {
  availability.value = null;
  message.value = "";
}, { deep: true });

watch(() => serviceAvailabilityData.value.nrPeople, (newValue) => {
  let maxPeople = null;
  if(reservationId === "1"){
    maxPeople = 30;
  } else if(reservationId === "2"){
    maxPeople = 20;
  } else if(["3", "4"].includes(reservationId)){
    maxPeople = 15;
  }
  if (newValue > maxPeople) {
    errorMessage.value = `Le nombre maximum autorisé est ${maxPeople}`;
  } else if (newValue < 1) {
    errorMessage.value = "Veuillez saisir au moins une personne.";
  } else {
    errorMessage.value = "";
  }
});

const checkAvailability = async () => {
  const isValid = await c$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
  availabilityErrorMessage.value = "";
  try {
    const requestAvailability = {
      serviceId: reservationId,
      nrPeople: serviceAvailabilityData.value.nrPeople,
      date: formatForRequest(serviceAvailabilityData.value.date),
      hour: serviceAvailabilityData.value.hour
    };
    console.log(requestAvailability);
    const response = await axios.post("http://localhost:8080/api/service/public/check-availability", requestAvailability, {
      headers: { "Content-Type": "application/json" }
    });
    if(response.data.available){
    availability.value = response.data.available;
    date.value = response.data.date;
    hour.value = response.data.hour;
    nrPeople.value = response.data.nrPeople;
    }
} catch (error) {
  availability.value = false;
    availabilityErrorMessage.value = "No available spots.";
}
};
const reserveService = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
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
    successMessage.value = "Réservation effectuée avec succès !";
    message.value = true;

    setTimeout(() => {
      serviceReservationData.value = {
        nameSurname: "",
        email: "",
        phone: "",
        language: "",
        specifications: ""
      };
      serviceAvailabilityData.value = {
        date: null,
        hour: "",
        nrPeople: "1"
      };
    }, 3000);

  } catch (error) {
    console.error("error:", error);
    errorMessage.value = "Une erreur s'est produite lors de la réservation.";
  }
};

</script>

<template>
  <ClientNavbar />
  <ImageComponent :src="experiences" />
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
                  v-model="serviceAvailabilityData.date"
                  :min="minDate"
                  :allowed-dates="isAllowedDate"
                  :error-messages="c$.date.$errors.map(e => e.$message)"></v-date-input>
              <p class="form-text">Select the hour</p>
              <v-text-field
                  v-model="serviceAvailabilityData.hour"
                  variant="outlined"
                  required
                  :error-messages="c$.hour.$errors.map(e => e.$message)"></v-text-field>
              <p class="form-text">Select the number of people</p>
              <v-text-field
                  v-model="serviceAvailabilityData.nrPeople"
                  variant="outlined"
                  required
                  :min="0"
                  type="number"
                  :error-messages="errorMessage"></v-text-field>
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
        <p class="booking-details">Place booked on: {{ date }} at {{ hour }} for {{ nrPeople }} people.</p>
        <v-card class="pa-5" elevation="0">
          <v-card-title class="text-h5">Booking Details</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Name"
                  v-model="serviceReservationData.nameSurname"
                  variant="outlined"
                  required
                  :error-messages="v$.nameSurname.$errors.map(e => e.$message)"></v-text-field>
              <v-text-field
                  label="Email"
                  v-model="serviceReservationData.email"
                  variant="outlined"
                  required
                  :error-messages="v$.email.$errors.map(e => e.$message)"></v-text-field>
              <v-text-field
                  label="Phone Number"
                  v-model="serviceReservationData.phone"
                  variant="outlined"
                  required
                  :error-messages="v$.phone.$errors.map(e => e.$message)"></v-text-field>
              <v-text-field label="Preferred Language" v-model="serviceReservationData.language" variant="outlined" required></v-text-field>
              <v-text-field label="Specifications" v-model="serviceReservationData.specifications" variant="outlined"></v-text-field>
              <v-btn class="custom-button" @click="reserveService">Confirm Booking</v-btn>
              <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
              <div v-if="successMessage" class="message">
              <v-snackbar v-model="message" color="success" timeout="3000">
                Reservation confirmed successfully!
              </v-snackbar>
              </div>
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
.message{
  margin-top: 20px;
}
</style>