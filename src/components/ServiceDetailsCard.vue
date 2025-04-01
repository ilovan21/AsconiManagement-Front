<script setup>
import {defineProps, defineEmits, ref, onMounted} from 'vue';

const props = defineProps({
  dialog: { type: Boolean, required: true },
  serviceDetails:{type: Object, required:true}
});
const emit = defineEmits(["update:dialog"]);
import { useDate } from 'vuetify'
import axios from "axios";

const serviceHours = ref([]);

const removeHour = (index) => {
  hours.value.splice(index, 1);
};
const date = ref(new Date('2025-04-01'))
const adapter = useDate()

const disabledDates = ref([]);
const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(disabledDates.value)];

  return !uniqueDisabledDates.includes(formattedDate);
};
const getUnavailableDates = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/service?serviceId=${serviceId}`);
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
const getServiceHours = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/service/public/${serviceId}/get-hours`);
    const hoursList = [...response.data];
    serviceHours.value = hoursList.map(hour => hour.slice(0, -3));
    console.log("Fetched hours:", serviceHours);
  } catch (error) {
    console.error('Error fetching hours:', error);
  }
};

onMounted(async () => {
  await Promise.all([
    getUnavailableDates(props.serviceDetails.id),
    getServiceHours(props.serviceDetails.id)
  ]);
});
</script>

<template>
  <v-card title="Service Details">
    <v-card-text>
      <v-row dense>
        <v-divider></v-divider>
        <v-col cols="12" md="6" style="padding-bottom:30px">
          <p style="padding-bottom: 20px; padding-top: 20px; font-size: 20px"> {{ serviceDetails.name }}</p>
          <v-row>
            <v-col cols="6" >
              <p class="category">Capacity</p>
            </v-col>
            <v-col cols="6">
              <p>{{ serviceDetails.capacity }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p class="category">Duration</p>
            </v-col>
            <v-col>
              <p>{{serviceDetails.duration}}</p>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3">
              <p class="category" style="padding-top: 15px">Hours</p>
            </v-col>
            <v-col cols="8">
              <v-chip-group multiple>
                <v-chip
                    v-for="(hour, index) in serviceHours"
                    :key="index"
                    class="ma-1"
                >
                  {{ hour }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <p class="category" style="padding-top: 5px">About</p>
            </v-col>
            <v-col cols="12">
              La visite comprend l’exploration de la zone de production, où les processus de fermentation, de maturation et de conservation du vin sont expliqués en détail. Elle se termine par la découverte des étapes finales, de la mise en bouteille à l’étiquetage, révélant tout le savoir-faire de notre domaine.
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
            <v-container>
              <v-row justify="space-around">
                <v-date-picker
                    class="no-header"
                    v-model="date"
                    :allowed-dates="isAllowedDate"
                ></v-date-picker>
              </v-row>
            </v-container>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn text="Modifier" variant="plain"></v-btn>
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
p{
  font-size: 15px;
}
.category{
  font-weight: 500;
}
</style>
