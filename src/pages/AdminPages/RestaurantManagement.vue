<script setup>
import {ref, shallowRef, toRaw, watch} from 'vue'
import StaffNavbar from "@/components/StaffNavbar.vue";
import {VDateInput} from 'vuetify/labs/VDateInput';
import axios from "axios";

const dialog = shallowRef(false);

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
const disabledDates = ref([]);
const serviceHours = ref([]);

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
</script>

<template>
  <StaffNavbar/>
  <v-card-text>
    <v-row dense>
      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-row>
          <v-col cols="6">John DOE</v-col>
        </v-row>
        <v-row>
          <v-col cols="6">+(373) 62050415</v-col>
        </v-row>
      </v-col>
      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-select
            v-model="serviceAvailabilityData.hour"
            :items="serviceHours"
            variant="outlined"
        ></v-select>
      </v-col>
      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-text-field
            hint="example of persistent helper text"
            label="Last name*"
            persistent-hint
            required
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-text-field
            label="Email*"
            required
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-text-field
            label="Password*"
            type="password"
            required
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          md="4"
          sm="6"
      >
        <v-text-field
            label="Confirm Password*"
            type="password"
            required
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          sm="6"
      >
        <v-select
            :items="['0-17', '18-29', '30-54', '54+']"
            label="Age*"
            required
        ></v-select>
      </v-col>

      <v-col
          cols="12"
          sm="6"
      >
        <v-autocomplete
            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
            label="Interests"
            auto-select-first
            multiple
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-card-text>

  <v-divider></v-divider>

  <v-card-actions>
    <v-spacer></v-spacer>

    <v-btn
        text="Close"
        variant="plain"
        @click="dialog = false"
    ></v-btn>

    <v-btn
        color="primary"
        text="Save"
        variant="tonal"
        @click="dialog = false"
    ></v-btn>
  </v-card-actions>
</template>

<style scoped>

</style>