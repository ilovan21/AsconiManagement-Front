<script setup>
import { useRoute } from 'vue-router';
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import {computed, onMounted, ref, toRaw} from "vue";
import axios from "axios";
import casa from "@/assets/casa.jpg";
import ImageComponent from "@/components/ImageComponent.vue";
import image from "@/assets/as.jpg";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { watch } from "vue";
import { VDateInput } from 'vuetify/labs/VDateInput';
import router from "@/router/index.js";

let hours=["11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"];

const rules = computed(() => ({
  nameSurname: { required },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
}));
const checkAvailabilityRules = computed(() => ({
  date: { required },
  arrivingTime: { required },
  leavingTime: { required },
  nrPeople:{required}
}));

const leavingHours=ref([]);
const filterHours = (selectedHour) =>{
  return hours.filter((hour) => {
    return hour > selectedHour;
  });
};
function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}
const route = useRoute();
const hallId = route.params.id;
const hallName = route.query.title;
const isBookingInProgress = ref(false);

const currentDate = new Date();
const minDate = currentDate.toISOString().split('T')[0];
const disabledDates = ref([]);

onMounted(() => {
  getUnavailableDates(hallId);
});
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

const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(disabledDates.value)];

  return !uniqueDisabledDates.includes(formattedDate);
};

const restaurantAvailabilityData = ref({
  nrPeople: 1,
  date: null,
  arrivingTime: "",
  leavingTime:""
});

const restaurantReservationData = ref({
  nameSurname: "",
  email: "",
  phone: "",
  specifications: ""
});


watch(restaurantAvailabilityData, (newValue) => {
  console.log(newValue.arrivingTime);
  if(newValue.arrivingTime) {
    leavingHours.value = filterHours(newValue.arrivingTime);
    console.log("leavingHours from watch", leavingHours.value);
  }
},{ deep: true });


const v$ = useVuelidate(rules, restaurantReservationData);
const c$=useVuelidate(checkAvailabilityRules,restaurantAvailabilityData);

const availability = ref(null);
const availabilityMessage = ref("");
const availabilityErrorMessage = ref("");
const reservationMessage = ref("");
const date = ref("");
const arrivingTime = ref("");
const leavingTime=ref("");
const nrPeople = ref("");
const tableId=ref(null);

watch(restaurantAvailabilityData, async (newValue) => {
  newValue = toRaw(newValue)
  if (formatForRequest(newValue.date) === minDate) {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    hours = hours.filter((hour) => hour >= time);
    console.log("available hours: ", hours);
  }
}, {deep: true});
const errorMessage=ref(null);

watch(restaurantAvailabilityData, () => {
  availability.value = null;
  reservationMessage.value = "";
}, { deep: true });

watch(() => restaurantAvailabilityData.value.nrPeople, (newValue) => {
  const maxPeople = 20;
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
      nrPeople: restaurantAvailabilityData.value.nrPeople,
      hallId: hallId,
      date: formatForRequest(restaurantAvailabilityData.value.date),
      arrivingTime: restaurantAvailabilityData.value.arrivingTime,
      leavingTime: restaurantAvailabilityData.value.leavingTime
    };
    console.log(requestAvailability);
    const response = await axios.post("http://localhost:8080/api/restaurant/public/check-availability", requestAvailability, {
      headers: { "Content-Type": "application/json" }
    });

    if (response.data.available) {
      availability.value = true;
      availabilityMessage.value = response.data.message;
      date.value = response.data.date;
      arrivingTime.value = response.data.arrivingTime;
      leavingTime.value = response.data.leavingTime;
      nrPeople.value = response.data.nrPeople;
      tableId.value = response.data.tableId;
    } else {
      availability.value = false;
      availabilityErrorMessage.value = "Aucune table n'est disponible pour les détails spécifiés.";
    }
  } catch (error) {
    availability.value = false;
    availabilityErrorMessage.value = "Erreur";
  }
};
const successMessage=ref(null);
const message=ref(null);


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
    successMessage.value = "Réservation effectuée avec succès !";
    message.value = true;

    setTimeout(() => { router.push("/hall")}, 1000);

  } catch (error) {
    console.error("error:", error);
    errorMessage.value = "Une erreur s'est produite lors de la réservation.";
  }
};
</script>

<template>
  <ClientNavbar />
  <ImageComponent :src="casa" />
  <v-container class="mx-auto">
    <v-row justify="center" align="start">
      <v-col cols="12" md="6">
        <v-card class="pa-5" elevation="0">
          <h1 class="text-title">Réservez une table dans {{ hallName }}</h1>
          <v-card-text>
            <v-form>
              <p class="form-text">Sélectionnez la date</p>
                <v-date-input
                    prepend-icon=""
                    variant="outlined"
                    v-model="restaurantAvailabilityData.date"
                    :min="minDate"
                :allowed-dates="isAllowedDate"
                    :error-messages="c$.date.$errors.map(e => e.$message)"></v-date-input>
              <p class="form-text">Sélectionnez l'heure d'arrivée</p>
              <v-select
                  v-model="restaurantAvailabilityData.arrivingTime"
                  :items="hours"
                  :error-messages="c$.arrivingTime.$errors.map(e => e.$message)">
                  variant="outlined"
              ></v-select>
              <p class="form-text">Sélectionnez l'heure de départ</p>
              <v-select
              v-model="restaurantAvailabilityData.leavingTime"
              :items="leavingHours"
              :error-messages="c$.leavingTime.$errors.map(e => e.$message)">
              variant="outlined"
              ></v-select>
              <p class="form-text">Sélectionnez le nombre de personnes</p>
              <v-text-field
                  v-model="restaurantAvailabilityData.nrPeople"
                  variant="outlined"
                  required
                  :min="1"
                  type="number"
                  :error-messages="errorMessage"></v-text-field>
              <v-btn class="custom-button" @click="checkAvailability">Vérifier disponibilité</v-btn>
              <p v-if="availabilityErrorMessage" class="message">{{ availabilityErrorMessage }}</p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-img
            class="ml-5 align-center "
            style="margin-top:10px"
            :src="image"
            contain
            width="520"
            height="600"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="second-form">
    <v-row>
      <v-col cols="12" md="6">
        <div v-if="availability === true">
          <p class="booking-details">Table disponible en {{hallName}} le {{ date }} à {{ arrivingTime.slice(0,-3) }} pour {{ nrPeople }} personnes.</p>
          <v-card class="pa-5" elevation="0">
            <v-card-title class="text-h5">Informations personnelles</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                    label="Nom"
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
                    label="Nombre de téléphone"
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
                    :disabled="isBookingInProgress">Confirmer la réservation</v-btn>
                <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
                <div v-if="successMessage" class="message">
                  <v-snackbar v-model="message" color="success" timeout="3000">
                    Réservation effectuée avec succès !
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
  min-width: 200px;
  padding: 30px 20px;
  color: #b9523b;
  font-size: 14px;
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