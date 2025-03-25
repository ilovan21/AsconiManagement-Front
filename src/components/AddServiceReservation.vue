<script setup>
import {useToast} from 'vue-toastification';
import axios from "axios";
import {watch} from "vue";
import {VDateInput} from 'vuetify/labs/VDateInput';

import {computed, ref} from 'vue'
import {email, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const reservationData = ref({
  nameSurname: '',
  email: '',
  phone: '',
  language:'',
  specifications: ''
});
const availabilityData = ref({
  service: null,
  date: null,
  hour: '',
  nrPeople: '1'
});

const checkAvailabilityRules = computed(() => ({
  service: {required},
  date: {required},
  hour: {required},
  nrPeople: {required}
}));
const rules = computed(() => ({
  language: {required},
  nameSurname: {required},
  email: {required, email},
  phone: {required, minLength: minLength(10)},
}));

const handleNext = () =>{
  if (e1.value === steps.value ) {
    reserveService();
  }
  else {
    e1.value++;
  }
}
const c$ = useVuelidate(checkAvailabilityRules, availabilityData);
const v$ = useVuelidate(rules, reservationData);
const languages = [ 'Romanian', 'French', 'English'];
const services = [
  {
    id: 1,
    name: 'Tour'
  },
  {
    id: 2,
    name: 'Tasting'
  },
  {
    id: 3,
    name: 'Wine Painting'
  },
  {
    id: 4,
    name: 'Baking Workshop'
  }
]
let serviceHours = ref([]);
const availability = ref(null);
const availabilityErrorMessage = ref("");

const errorMessage = ref(null);
watch(() => availabilityData.value.nrPeople, (newValue) => {
  const maxPeople = 50;
  if (newValue > maxPeople) {
    errorMessage.value = `Le nombre maximum autorisé est ${maxPeople}`;
  } else if (newValue < 1) {
    errorMessage.value = "Veuillez saisir au moins une personne.";
  } else {
    errorMessage.value = "";
  }
});

function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}
const currentDate = new Date();
const minDate = currentDate.toISOString().split('T')[0];
const disabledDates = ref([]);

const getUnavailableDates = async (reservationId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/service?serviceId=${reservationId}`);
    if (Array.isArray(response.data)) {
      disabledDates.value = response.data.map(date => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
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
const getServiceHours = async (reservationId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/service/public/${reservationId}/get-hours`);
    const hoursList = [...response.data];
    serviceHours.value = hoursList.map(hour => hour.slice(0, -3));
    console.log("Fetched hours:", serviceHours);
  } catch (error) {
    console.error('Error fetching hours:', error);
  }
};

watch(() => availabilityData.value.service, async (newServiceId) => {
  await getUnavailableDates(newServiceId);
  await getServiceHours(newServiceId);
});


const e1 = ref(1)
const steps = ref(2)

const successMessage = ref(null);
const message = ref("");

function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}

const checkAvailability = async () => {
  const isValid = await c$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
  availabilityErrorMessage.value = "";
  try {
    const requestAvailability = {
      serviceId: availabilityData.value.service,
      nrPeople: availabilityData.value.nrPeople,
      date: formatForRequest(availabilityData.value.date),
      hour: availabilityData.value.hour
    };
    console.log(requestAvailability);
    const response = await axios.post("http://localhost:8080/api/service/public/check-availability", requestAvailability, {
      headers: {"Content-Type": "application/json"}
    });
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
      touristicServiceId: availabilityData.value.service,
      nameSurname: reservationData.value.nameSurname,
      email: reservationData.value.email,
      phone: reservationData.value.phone,
      date: availabilityData.value.date,
      hour: String(availabilityData.value.hour).slice(0, 5),
      language: reservationData.value.language,
      nrPeople: Number(availabilityData.value.nrPeople),
      specifications: reservationData.value.specifications
    };
    console.log("Request payload:", requestReservation);

    const response = await axios.post("http://localhost:8080/api/service/public/reserve", requestReservation, {
      headers: {"Content-Type": "application/json"}
    });
    successMessage.value = "Réservation effectuée avec succès !";
    message.value = true;
  } catch (error) {
    console.error("error:", error);
    errorMessage.value = "Une erreur s'est produite lors de la réservation.";
  }
};
</script>
<template>
  <v-stepper v-model="e1" class="stepper-container">
    <template v-slot:default="{ prev }">
      <v-stepper-header>
        <template v-for="n in steps" :key="`${n}-step`">
          <v-stepper-item
              :complete="e1 > n"
              :step="`Step {{ n }}`"
              :value="n"
              editable
          ></v-stepper-item>
          <v-divider
              v-if="n !== steps"
              :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item
            v-for="n in steps"
            :key="`${n}-content`"
            :value="n"
        >
          <v-card class="ma-0 pa-0"
                  color="grey-lighten-1"></v-card>
          <div v-if="n === 1">
            <v-container class="mx-0 pa-0">
              <v-row no-gutters justify="center" align="start">
                <v-col cols="12" md="12">
                  <v-card class="pa-0" elevation="0">
                    <h1 class="text-title">Add Reservation</h1>
                    <v-card-text>
                      <v-form>
                        <v-row no gutters class="pa-2">
                          <v-col cols="6" class="ma-0 pa-0 pr-2">
                            <p class="form-text">Select the service</p>
                            <v-select
                                style="width: 100%"
                                density="compact"
                                variant="outlined"
                                v-model="availabilityData.service"
                                :error-messages="c$.service.$errors.map(e => e.$message)"
                                :items="services"
                                item-title="name"
                                item-value="id"
                            ></v-select>
                          </v-col>
                          <v-col cols="6" class="ma-0 pa-0">
                            <p class="form-text">Select the date</p>
                            <v-date-input
                                style="width: 100%"
                                density="compact"
                                prepend-icon=""
                                variant="outlined"
                                v-model="availabilityData.date"
                                :min="minDate"
                                :allowed-dates="isAllowedDate"
                                :error-messages="c$.date.$errors.map(e => e.$message)"
                            ></v-date-input>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6" class="ma-0 pr-2">
                            <p class="form-text">Select the hour</p>
                            <v-select
                                style="width: 100%"
                                density="compact"
                                v-model="availabilityData.hour"
                                variant="outlined"
                                :error-messages="c$.hour.$errors.map(e => e.$message)"
                                :items="serviceHours">
                              ></v-select>
                          </v-col>
                          <v-col cols="6" class="ma-0 pa-0">
                            <p class="form-text">Select the number of people</p>
                            <v-text-field
                                style="width: 100%"
                                density="compact"
                                v-model="availabilityData.nrPeople"
                                :error-messages="errorMessage"
                                variant="outlined"
                                required
                                :min="1"
                                type="number"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6" class="ma-0">
                            <p class="form-text">Select the language</p>
                            <v-select
                                style="width: 100%"
                                density="compact"
                                v-model="reservationData.language"
                                variant="outlined"
                                :error-messages="c$.hour.$errors.map(e => e.$message)"
                                :items="languages">
                              >
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6" class="pl-2 ma-0 d-flex align-center ">
                            <v-btn elevation="0" style="height: 40px; background-color: rgba(200,194,192,0.56)"
                                   @click="checkAvailability">Get
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="n === 2">
            <v-container class="mx-0">
              <v-row no-gutters justify="center" align="start">
                <v-col cols="12" md="12">
                  <v-card class="pa-0" elevation="0">
                    <h1 class="text-title">Personal Information</h1>
                    <v-card-text>
                      <v-form>
                        <v-row no-gutters>
                          <v-col class="ma-0 pa-0">
                            <p class="form-text">Name Surname</p>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                :error-messages="v$.nameSurname.$errors.map(e => e.$message)"
                                v-model="reservationData.name"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6" class="ma-0 pr-2">
                            <p class="form-text">Email</p>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                :error-messages="v$.email.$errors.map(e => e.$message)"
                                v-model="reservationData.email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6" class="ma-0 pa-0">
                            <p class="form-text">Phone</p>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                :error-messages="v$.phone.$errors.map(e => e.$message)"
                                v-model="reservationData.phone"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <p class="form-text">Specifications</p>
                            <v-text-field
                                style="width: 100%"
                                density="compact"
                                variant="outlined"
                                v-model="reservationData.specifications"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <div v-if="successMessage" class="message">
                <v-snackbar v-model="successMessage" color="success" timeout="3000">
                  Reservation added successfully!
                </v-snackbar>
              </div>
            </v-container>
          </div>
        </v-stepper-window-item>
      </v-stepper-window>
      <v-stepper-actions
          :disabled="e1 === 1 ? 'prev' : false"
          :next-text="e1 === steps ? 'Make Reservation' : 'Next'"
          @click:next="handleNext"
          @click:prev="prev"
      />
    </template>
  </v-stepper>
</template>
<style>
v-stepper-header {
  display: none;
}
</style>
