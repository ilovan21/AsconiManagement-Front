<script setup>
import {defineProps, defineEmits, ref, onMounted, watch, toRaw} from 'vue';
import axios from 'axios';

const props = defineProps({
  dialog: { type: Boolean, required: true },
  serviceDetails: { type: Object, required: true }
});
const emit = defineEmits(["update:dialog", "edited-service"]);
const isEditing = ref(false);
const editedService = ref({ ...props.serviceDetails });
const serviceHours = ref([]);
const disabledDates = ref([]);
const date = ref(new Date());

function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

const getUnavailableDates = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/service?serviceId=${serviceId}`);
    disabledDates.value = response.data.map(date => new Date(date).toISOString().split('T')[0]);
    console.log("unavailable dates: ", disabledDates);
  } catch (error) {
    console.error('Error fetching disabled dates:', error);
  }
};

const getServiceHours = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/service/public/${serviceId}/get-hours`);
    serviceHours.value = response.data.map(hour => hour.slice(0, -3));
  } catch (error) {
    console.error('Error fetching hours:', error);
  }
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    editedService.value = { ...props.serviceDetails };
  }
};

const hourMessage = ref();
const removeHour = async (hour,index) => {
  const token = localStorage.getItem('user_token');
  try {
    const response = await axios.delete(`http://localhost:8080/api/admin/services/delete/${props.serviceDetails.id}/hour?hour=${hour}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    hourMessage.value= response.data;
     serviceHours.value.splice(index, 1);
  } catch (error) {
    console.error('Error deleting hour:', error);
  }
};

const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(disabledDates.value)];

  return !uniqueDisabledDates.includes(formattedDate);
};
const savedMessage=ref();
const saveChanges = async () => {
  const newServiceData = {
    name: editedService.value.name,
    capacity: editedService.value.capacity,
    duration: editedService.value.duration
  };
  const token = localStorage.getItem('user_token');
  console.log("payload:", newServiceData);
  try {
    const response = await axios.post(`http://localhost:8080/api/admin/service/${props.serviceDetails.id}/edit`, newServiceData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    emit('edited-service');
    savedMessage.value= response.data;
  } catch (error) {
    console.error('Error adding unavailable date:', error);
  }
};

onMounted(() => {
  getUnavailableDates(props.serviceDetails.id);
  getServiceHours(props.serviceDetails.id);
});
const unavailableDate = ref();
const responseMessage = ref("");


const addUnavailableDate = async () => {
  const payload = {
    serviceId:props.serviceDetails.id,
    unavailableDate: formatForRequest(unavailableDate.value),
    reason:""
  };
   const token = localStorage.getItem('user_token');
   try {
     const response = await axios.post(`http://localhost:8080/api/unavailable-dates/service/add`, payload,
         {
           headers: {
             'Authorization': `Bearer ${token}`
           }
         });
     responseMessage.value= response.data;
   } catch (error) {
     console.error('Error adding unavailable date:', error);
   }
};

const newHour = ref('');
const addHour = async () => {
  const token = localStorage.getItem('user_token');
  console.log("hour:", newHour.value);
  try {
    const response = await axios.post(
        `http://localhost:8080/api/admin/services/add/${props.serviceDetails.id}/hour`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { hour: newHour.value }
        }
    );
    if (newHour.value && !serviceHours.value.includes(newHour.value)) {
      serviceHours.value.push(newHour.value);
      newHour.value = '';
    }
    hourMessage.value= response.data;
  } catch (error) {
    console.error('Error adding hour:', error);
  }
};
watch(newHour, () => {
  hourMessage.value = "";
}, );
watch(unavailableDate, () => {
  responseMessage.value = "";
}, { deep: true });
</script>

<template>
  <v-card title="Informations du Service">
    <v-card-text>
      <v-row dense>
        <v-divider></v-divider>
        <v-col cols="12" md="6" style="padding-bottom:30px">
          <p v-if="!isEditing" style="padding-bottom: 20px; padding-top: 20px; font-size: 20px">
            {{ serviceDetails.name }}
          </p>
          <v-text-field style="padding-top:30px" variant="plain" density="compact" v-else v-model="editedService.name" label="Nom du service"></v-text-field>

          <v-row>
            <v-col cols="6">
              <p class="category">Capacité</p>
            </v-col>
            <v-col cols="6">
              <p v-if="!isEditing">max. {{ serviceDetails.capacity }} personnes</p>
              <v-text-field variant="plain" density="compact" v-else v-model="editedService.capacity" type="number"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <p class="category">Durée </p>
            </v-col>
            <v-col>
              <p v-if="!isEditing">{{ serviceDetails.duration }} min.</p>
              <v-text-field variant="plain" density="compact" v-else v-model="editedService.duration" type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <p class="category" style="padding-top: 5px">À propos</p>
            </v-col>
            <v-col cols="12">
              <p v-if="!isEditing">{{ serviceDetails.about }}</p>
              <div v-else>
                <v-textarea auto-grow
                            rows="3" v-model="editedService.about"></v-textarea>
                <v-btn @click="saveChanges">Enregistrer</v-btn>
              </div>

            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">
              <p class="category" style="padding-top: 15px">Heures</p>
            </v-col>
            <v-col cols="8">
              <v-chip-group multiple v-if="!isEditing">
                <v-chip v-for="(hour, index) in serviceHours" :key="index" class="ma-1">
                  {{ hour }}
                </v-chip>
              </v-chip-group>
              <div v-else>
                <v-chip
                    v-for="(hour, index) in serviceHours"
                    :key="index"
                    class="ma-1"
                    closable
                    @click:close="removeHour(hour,index)"
                >
                  {{ hour }}
                </v-chip>
                <v-text-field density="compact" variant="plain" v-model="newHour" label="Ajouter heure" @keyup.enter="addHour"></v-text-field>
                <v-row>
                  <v-col cols="6"><v-btn @click="addHour">Ajouter</v-btn>
                  </v-col>
                  <p v-if="hourMessage">{{hourMessage}}</p>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-container>
            <v-row justify="space-around">
              <p style="font-weight: 500">Dates indisponibles</p>
              <v-date-picker v-if="!isEditing"
                  class="no-header"
                  v-model="date"
                             :allowed-dates="isAllowedDate"
              ></v-date-picker>
              <div v-else >
                <v-date-picker
                               v-model="unavailableDate"
                               :allowed-dates="isAllowedDate"
                               ></v-date-picker>
                <v-text-field class="pb-1" v-model="unavailableDate" variant="outlined" density="compact" label="Selected Date">{{ formatForRequest(unavailableDate) }}</v-text-field>
                <v-btn @click="addUnavailableDate">Ajouter</v-btn>
              </div>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn v-if="!isEditing" text="Modifier" variant="plain" @click="toggleEdit"></v-btn>
          <v-btn v-else text="Enregistrer" variant="plain" @click="saveChanges"></v-btn>
          <v-btn v-if="isEditing" text="Annuler" variant="plain" @click="toggleEdit"></v-btn>
        </v-col>
        <v-col offset="4" class="text-end">
          <v-btn text="Fermer" variant="plain" @click="emit('update:dialog', false)"></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.no-header .v-picker__title {
  display: none;
}
p {
  font-size: 15px;
}
.category {
  font-weight: 500;
}
</style>
