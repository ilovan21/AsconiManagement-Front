<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  dialog: { type: Boolean, required: true },
  serviceDetails: { type: Object, required: true }
});
const emit = defineEmits(["update:dialog"]);

const isEditing = ref(false);
const editedService = ref({ ...props.serviceDetails });
const serviceHours = ref([]);
const disabledDates = ref([]);
const date = ref(new Date());

const getUnavailableDates = async (serviceId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/service?serviceId=${serviceId}`);
    disabledDates.value = response.data.map(date => new Date(date).toISOString().split('T')[0]);
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

const removeHour = (index) => {
  serviceHours.value.splice(index, 1);
};

const newHour = ref('');
const addHour = () => {
  if (newHour.value && !serviceHours.value.includes(newHour.value)) {
    serviceHours.value.push(newHour.value);
    newHour.value = '';
  }
};

const saveChanges = async () => {
    console.error("Save");
};

onMounted(() => {
  getUnavailableDates(props.serviceDetails.id);
  getServiceHours(props.serviceDetails.id);
});

</script>

<template>
  <v-card title="Service Details">
    <v-card-text>
      <v-row dense>
        <v-divider></v-divider>
        <v-col cols="12" md="6" style="padding-bottom:30px">
          <p v-if="!isEditing" style="padding-bottom: 20px; padding-top: 20px; font-size: 20px">
            {{ serviceDetails.name }}
          </p>
          <v-text-field style="padding-top:30px" variant="plain" density="compact" v-else v-model="editedService.name" label="Service Name"></v-text-field>

          <v-row>
            <v-col cols="6">
              <p class="category">Capacity</p>
            </v-col>
            <v-col cols="6">
              <p v-if="!isEditing">max. {{ serviceDetails.capacity }} personnes</p>
              <v-text-field variant="plain" density="compact" v-else v-model="editedService.capacity" type="number"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <p class="category">Duration</p>
            </v-col>
            <v-col>
              <p v-if="!isEditing">{{ serviceDetails.duration }} min.</p>
              <v-text-field variant="plain" density="compact" v-else v-model="editedService.duration" type="number"></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="3">
              <p class="category" style="padding-top: 15px">Hours</p>
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
                    @click:close="removeHour(index)"
                >
                  {{ hour }}
                </v-chip>
                <v-text-field density="compact" variant="plain" v-model="newHour" label="Add Hour" @keyup.enter="addHour"></v-text-field>
                <v-btn @click="addHour">Add</v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <p class="category" style="padding-top: 5px">About</p>
            </v-col>
            <v-col cols="12">
              <p v-if="!isEditing">{{ serviceDetails.about }}</p>
              <v-text-field style="width: auto;" variant="outlined" density="compact" v-else v-model="editedService.about"></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-container>
            <v-row justify="space-around">
              <v-date-picker
                  class="no-header"
                  v-model="date"
                  :allowed-dates="date => !disabledDates.includes(new Date(date).toISOString().split('T')[0])"
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
