<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  dialog: { type: Boolean, required: true },
  reservationDetails:{type:Object, required:true}
});

const deleteMessage=ref("");
const emit = defineEmits(["update:dialog", "reservation-deleted"]);
const deleteReservation = async (reservation_id) => {
  console.log(reservation_id);
  try {
    const token=localStorage.getItem('user_token');
    const response = await axios.delete(`http://localhost:8080/api/restaurant/manage/delete/${reservation_id}`,
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
  <v-card title="Détails de la réservation">
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
        <v-col  cols="12" md="6" sm="2">
          <p>Restaurant</p>
        </v-col>
        <v-col cols="12" md="6" sm="2">
          <p>Asconi</p>
        </v-col>
          <v-col cols="12" md="6" sm="2">
            <p>Salle</p>
          </v-col>
          <v-col cols="12" md="6" sm="2">
            <p>{{reservationDetails.hallName}}</p></v-col>
          <v-col cols="12" md="6">
            <p>Table</p>
          </v-col>
          <v-col cols="12" md="6">
            <p v-if="reservationDetails.tableIds.length === 1">
              {{ reservationDetails.tableIds[0] }}
            </p>
            <p v-else>
              {{ reservationDetails.tableIds.join(', ') }}
            </p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Nombre de personnes</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>{{ reservationDetails.nrPeople }}</p>
        </v-col>
        <v-col cols="6" md="4">
          <p>Heures </p>
        </v-col>
        <v-col cols="6" md="4">
          <p>De : {{reservationDetails.arrivingTime.slice(0,-3)}} </p>
        </v-col>
        <v-col cols="6" md="4">
          <p> à : {{reservationDetails.leavingTime.slice(0,-3)}}</p>
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
          <v-btn text="Supprimer" variant="plain" @click="deleteReservation(reservationDetails.id)"></v-btn>
          <v-btn text="Modifier" variant="plain"></v-btn>
        </v-col>
        <v-col offset="4" class="text-end">
          <v-btn text="Fermer" variant="plain" @click="emit('update:dialog', false)"></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <div v-if="deleteMessage" class="message">
    <v-snackbar v-model="deleteMessage" color="success" timeout="3000">
      Réservation supprimée avec succès !
    </v-snackbar>
  </div>
</template>
<style scoped>
.custom-col{
  display:flex;
  align-items:end;
}
</style>
