<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  dialog: { type: Boolean, required: true },
  reservationDetails:{type:Object, required:true}
});

const deleteMessage=ref("");
const emit = defineEmits(["update:dialog", "reservations-deleted"]);
const deleteReservation = async (reservation_id) => {
  console.log(reservation_id);
  try {
    const token=localStorage.getItem('user_token');
    const response = await axios.delete(`http://localhost:8080/api/service/manage/service-res/delete/${reservation_id}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    deleteMessage.value=response.data;
    setTimeout(() => {
      emit('reservation-deleted', props.reservationDetails.id);
      emit('update:dialog', false);
    }, 1000);
  } catch (error) {
    console.error('Error while deleting the reservation:', error);
  }
};
</script>

<template>
  <v-card title="Reservation Details">
    <v-card-text>
      <v-row dense>
        <v-divider></v-divider>
        <v-col cols="12" md="6">
          <p>{{reservationDetails.nameSurname}}</p>
          <p style="font-weight: 500; color: #b9523b">{{ reservationDetails.phone }}</p>
        </v-col>
        <v-col cols="6" style="align-self: center">
          {{reservationDetails.email}}
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12" md="6" sm="2">
          <p>Service</p>
        </v-col>
        <v-col cols="12" md="6" sm="2">
          <p>{{reservationDetails.serviceName}}</p></v-col>
        <v-col cols="12" md="6">
          <p>Language</p>
        </v-col>
        <v-col cols="12" md="6">
          <p >
            {{ reservationDetails.language }}
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Number of People</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>{{ reservationDetails.nrPeople }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Hour </p>
        </v-col>
        <v-col cols="12" md="6">
          <p> {{reservationDetails.hour.slice(0,-3)}} </p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Specifications</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>{{reservationDetails.specifications}}</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn text="Delete" variant="plain" @click="deleteReservation(reservationDetails.id)"></v-btn>
          <v-btn text="Edit" variant="plain"></v-btn>
        </v-col>
        <v-col offset="7" class="text-end">
          <v-btn text="Close" variant="plain" @click="emit('update:dialog', false)"></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <div v-if="deleteMessage" class="message">
    <v-snackbar v-model="deleteMessage" color="success" timeout="3000">
      Reservation deleted successfully!
    </v-snackbar>
  </div>
</template>
