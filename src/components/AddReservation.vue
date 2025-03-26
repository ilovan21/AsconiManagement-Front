<script setup>
import {useToast} from 'vue-toastification';
import axios from "axios";
import {defineEmits, defineProps, watch} from "vue";
import {VDateInput} from 'vuetify/labs/VDateInput';

const toast = useToast();
import {computed, ref} from 'vue'
import {email, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const props = defineProps({
  dialog: { type: Boolean, required: true }
});
const emit = defineEmits(["update:dialog", "reservations-added"]);


let hours = ["10:00", "10:30", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const tables = [21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34];
const reservationData = ref({
  name: '',
  email: '',
  phone: '',
  specifications: '',
  tableIds: []
});
const availabilityData = ref({
  hall: null,
  date: null,
  arrivingTime: '',
  leavingTime: '',
  nrPeople: '1'
});
const leavingHours=ref([]);
const filterHours = (selectedHour) =>{
  return hours.filter((hour) => {
    return hour > selectedHour;
  });
};
watch(availabilityData, (newValue) => {
  console.log(newValue.arrivingTime);
  if(newValue.arrivingTime) {
    leavingHours.value = filterHours(newValue.arrivingTime);
    console.log("leavingHours from watch", leavingHours.value);
  }
},{ deep: true });

const checkAvailabilityRules = computed(() => ({
  hall: {required},
  date: {required},
  arrivingTime: {required},
  leavingTime: {required},
  nrPeople: {required}
}));
const rules = computed(() => ({
  tableIds: {required: (value) => Array.isArray(value) && value.length > 0 || 'At least one table must be selected'},
  name: {required},
  email: {required, email},
  phone: {required, minLength: minLength(10)},
}));

const handleNext = () =>{
  if (e1.value === steps.value ) {
    reserveTable();
  }
  else {
    e1.value++;
  }
}
const c$ = useVuelidate(checkAvailabilityRules, availabilityData);
const v$ = useVuelidate(rules, reservationData);
const isAvailable = ref(null);
const halls = [
  {
    id: 1,
    name: 'Casa Cu Sobe',
    restaurant: 'Asconi',
  },
  {
    id: 2,
    name: 'Vinoteca',
    restaurant: 'Asconi',
  },
  {
    id: 3,
    name: 'Cerdac',
    restaurant: 'Asconi',
  },
  {
    id: 4,
    name: 'Casa De Vara',
    restaurant: 'Asconi',
  },
  {
    id: 5,
    name: 'Terasa de la Gaini',
    restaurant: 'Asconi',
  },
  {
    id: 6,
    name: 'Terasa de la Cuptor',
    restaurant: 'Asconi',
  },
  {
    id: 9,
    name: 'Entrance',
    restaurant: 'Sol Negru',
  },
  {
    id: 10,
    name: 'Left Room',
    restaurant: 'Sol Negru',
  },
  {
    id: 11,
    name: 'Right Room',
    restaurant: 'Sol Negru',
  },
  {
    id: 13,
    name: '2nd Floor',
    restaurant: 'Sol Negru',
  },
  {
    id: 14,
    name: 'Terasa Salcami',
    restaurant: 'Sol Negru',
  }
]

const availability = ref(null);
const availabilityMessage = ref("");
const availabilityErrorMessage = ref("");
const date = ref("");
const arrivingTime = ref("");
const leavingTime = ref("");
const nrPeople = ref("");

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

function stringToIntegerArray(stringArray) {
  if (Array.isArray(stringArray)) {
    return stringArray.map(id => parseInt(id, 10));
  }
  console.error('Error');
  return [];
}

const checkAvailability = async () => {
  const isValid = await c$.value.$validate();
  if (!isValid) {
    console.log("Formular invalid");
    return;
  }
  availabilityErrorMessage.value = "";
  try {
    const requestAvailability = {
      nrPeople: availabilityData.value.nrPeople,
      hallId: availabilityData.value.hall,
      date: formatForRequest(availabilityData.value.date),
      arrivingTime: availabilityData.value.arrivingTime,
      leavingTime: availabilityData.value.leavingTime
    };
    console.log(requestAvailability);
    const response = await axios.post("http://localhost:8080/api/restaurant/public/check-availability", requestAvailability, {
      headers: {"Content-Type": "application/json"}
    });

    if (response.data.available) {
      availability.value = true;
      availabilityMessage.value = response.data.message;
      date.value = response.data.date;
      arrivingTime.value = response.data.arrivingTime;
      leavingTime.value = response.data.leavingTime;
      nrPeople.value = response.data.nrPeople;
      reservationData.value.tableIds = response.data.tableId;
    } else {
      availability.value = false;
      availabilityErrorMessage.value = "Aucune table n'est disponible pour les détails spécifiés.";
    }
  } catch (error) {
    availability.value = false;
    availabilityErrorMessage.value = "Erreur";
  }
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

const currentDate = new Date();
const minDate = currentDate.toISOString().split('T')[0];
const disabledDates = ref([]);

const getUnavailableDates = async (hallId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/hall?hallId=${hallId}`);
    if (Array.isArray(response.data)) {
      disabledDates.value = response.data.map(date => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
      });
      console.log("disabledDates:", disabledDates.value);
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

watch(() => reservationData.value.hall, async (newHallId) => {
  await getUnavailableDates(newHallId);
});

const e1 = ref(1)
const steps = ref(2)


watch(reservationData.tableIds, (newData) => {
  reservationData.tableIds.value = newData;
});


const successMessage = ref(null);
const message = ref("");

function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}

const reserveTable = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
  try {
    const requestReservation = {
      nrPeople: availabilityData.value.nrPeople,
      hallId: availabilityData.value.hall,
      date: formatForRequest(availabilityData.value.date),
      arrivingTime: availabilityData.value.arrivingTime,
      leavingTime: availabilityData.value.leavingTime,
      nameSurname: reservationData.value.name,
      email: reservationData.value.email,
      phone: reservationData.value.phone,
      specifications: reservationData.value.specifications,
      tableIds: ensureArray(reservationData.value.tableIds)
    };
    console.log("converted array: ", requestReservation.tableIds);
    console.log("request: ", requestReservation);

    const response = await axios.post("http://localhost:8080/api/restaurant/public/reserve", requestReservation, {
      headers: {"Content-Type": "application/json"}
    });
    successMessage.value = true;
    message.value = "Réservation effectuée avec succès !";
    setTimeout(() => {
      emit('reservation-added');
      emit('update:dialog', false);
    }, 1000);

  } catch (error) {
    console.error("error:", error);
    message.value = error.response?.data?.message || "Une erreur s'est produite lors de la réservation.";
  }
};
</script>
<template>
  <v-stepper v-model="e1" class="stepper-container">
    <template v-slot:default="{ prev, next }">
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
                          <v-col class="ma-0 pa-0">
                            <p class="form-text">Select the hall</p>
                            <v-select
                                density="compact"
                                variant="outlined"
                                v-model="availabilityData.hall"
                                :error-messages="c$.hall.$errors.map(e => e.$message)"
                                :items="halls"
                                item-title="name"
                                item-value="id"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6" class="ma-0 pr-2">
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
                          <v-col cols="6" class="pr-2 ma-0">
                            <p class="form-text">Select the arriving hour</p>
                            <v-select
                                style="width: 100%"
                                density="compact"
                                v-model="availabilityData.arrivingTime"
                                variant="outlined"
                                :error-messages="c$.arrivingTime.$errors.map(e => e.$message)"
                                :items="hours">
                              >
                            </v-select>
                          </v-col>
                          <v-col cols="6" class="pa-0 ma-0">
                            <p class="form-text">Select the leaving hour</p>
                            <v-select
                                variant="outlined"
                                style="width: 100%"
                                density="compact"
                                v-model="availabilityData.leavingTime"
                                :error-messages="c$.leavingTime.$errors.map(e => e.$message)"
                                :items="leavingHours">
                              >
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="4" class="pr-2 ma-0">
                            <p class="form-text">Table IDs</p>
                            <v-select
                                variant="outlined"
                                density="compact"
                                style="width: 100%"
                                v-model="reservationData.tableIds"
                                :items="tables"
                                multiple
                            >
                              <template v-slot:selection="{ item, index }">
                                <v-chip v-if="index < 2" :text="item.title"></v-chip>

                                <span
                                    v-if="index === 2"
                                    class="text-grey text-caption align-self-center"
                                > (+{{ reservationData.tableIds.length - 2 }} others) </span>
                              </template>
                            </v-select>
                          </v-col>

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
                                :error-messages="v$.name.$errors.map(e => e.$message)"
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
