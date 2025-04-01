<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  dialog: { type: Boolean, required: true }
});

const deleteMessage=ref("");
const emit = defineEmits(["update:dialog"]);

</script>

<template>
  <v-card title="Reservation Details">
    <v-card-text>
      <v-row dense>
        <v-divider></v-divider>
        <v-col cols="12" md="6">
        </v-col>
        <v-col cols="6" style="align-self: center">email
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12" md="6" sm="2">
          <p>Type de service</p>
        </v-col>
        <v-col cols="12" md="6" sm="2">
          <p>name</p></v-col>
        <v-col cols="12" md="6">
          <p>Langue</p>
        </v-col>
        <v-col cols="12" md="6">
          <p >
            language
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Nombre de personnes</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>nrPeople</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Heure </p>
        </v-col>
        <v-col cols="12" md="6">
          <p> Hour </p>
        </v-col>
        <v-col cols="12" md="6">
          <p>Specifications</p>
        </v-col>
        <v-col cols="12" md="6">
          <p>specif</p>
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
  <div v-if="deleteMessage" class="message">
    <v-snackbar v-model="deleteMessage" color="success" timeout="3000">
      Serice supprimée avec succès !
    </v-snackbar>
  </div>
</template>
