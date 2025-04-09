<script setup>
import axios from "axios";
import {defineEmits, ref} from "vue";

const props = defineProps({
  tables: Array,
  disabledDates: Array
});

const token = localStorage.getItem('user_token');
const isAllowedDate = (dateToCheck) => {
  const date = new Date(dateToCheck);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const formattedDate = localDate.toISOString().split('T')[0];
  const uniqueDisabledDates = [...new Set(props.disabledDates)];
  return !uniqueDisabledDates.includes(formattedDate);
};

const hallDetails = ref({
  name:"",
  capacity:"120",
  style:"Traditional, with rustic styles",
  area:" 120m2"
});
const isEditing = ref(false);
const newTable = ref({ ...props.tables });
const editedHall = ref({ ...hallDetails });

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    editedHall.value = { ...props.tables };
  }
};

const emit = defineEmits(["added-tables"]);
const addTableMessage = ref();
const addTable = async () => {
  const newTableData = {
    minCapacity: newTable.value.minCapacity,
    maxCapacity: newTable.value.maxCapacity
  };
  console.log("payload:", newTableData);
  try {
    const response = await axios.post(`http://localhost:8080/api/admin/restaurant/tables/add/10`, newTableData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    emit('added-tables');
    addTableMessage.value= response.data;
  } catch (error) {
    console.error('Error adding table:', error);
  }};

const date= ref();
const addUnavailableDate = async () => {
  // const payload = {
  //   serviceId:props.serviceDetails.id,
  //   unavailableDate: formatForRequest(unavailableDate.value),
  //   reason:""
  // };
  // try {
  //   const response = await axios.post(`http://localhost:8080/api/unavailable-dates/service/add`, payload,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //   responseMessage.value= response.data;
  // } catch (error) {
  //   console.error('Error adding unavailable date:', error);
  // }
  console.log("adding date");
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
const unavailableDate=ref();
</script>

<template>
  <v-row dense no-gutters>
    <v-col cols="12" md="6">
      <v-container class="container">
        <v-container style="border-color: #b9523b">
        <v-row style="margin-left:2px;">
          <p style="font-weight: 400">Detailles</p>
        </v-row>
        <v-row class="mt-4">
          <v-col class="12">
            <p>Total Capacity</p>
          </v-col>
          <v-col class="12">
            <p v-if="!isEditing">{{ hallDetails.capacity }} </p>
            <v-text-field variant="outlined" density="compact" v-else v-model="editedHall.capacity"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="12">
            <p>Style</p>
          </v-col>
          <v-col class="12">
            <p v-if="!isEditing">{{ hallDetails.style }} </p>
            <v-text-field variant="outlined" density="compact" v-else v-model="editedHall.style"></v-text-field>
          </v-col>
        </v-row>
          <v-row >
            <v-col class="12">
              <p>Area</p>
            </v-col>
            <v-col class="12">
              <p v-if="!isEditing">{{ hallDetails.area }} </p>
              <v-text-field variant="outlined" density="compact" v-else v-model="editedHall.area"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center" class="mt-10">
          Tables
        </v-row>
        <v-row>
        <v-col
            class="pa-0 ma-3"
            v-for="table in tables"
            :key="table.id"
            cols="6" sm="4" md="2"
        >
          <v-tooltip>
            <template v-slot:activator="{ props }">
              <v-card class="card ma-0" v-bind="props">
                <span style="font-size:15px">{{ table.tableId }}</span>
              </v-card>
            </template>
            <template v-slot:default>
              <div>
                Min: {{ table.maxCapacity }} <br />
                Max: {{ table.minCapacity }}
              </div>
            </template>
          </v-tooltip>
        </v-col>
          <v-card  v-if="isEditing" class="card add">Add</v-card>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12" md="6">
      <v-row justify="space-around">
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
          <v-text-field  v-model="unavailableDate" variant="outlined" density="compact" label="Selected Date">{{ formatForRequest(unavailableDate) }}</v-text-field>
          <v-btn @click="addUnavailableDate">Add</v-btn>
        </div>
      </v-row>
    </v-col>
    </v-row>
  <v-row>
    <v-col>
      <v-btn v-if="!isEditing" text="Modifier" variant="plain" @click="toggleEdit"></v-btn>
      <v-btn v-else text="Enregistrer" variant="plain" @click="addTable"></v-btn>
    </v-col>
    <v-col offset="4" class="text-end">
      <v-btn v-if="isEditing" text="Annuler" variant="plain" @click="toggleEdit"></v-btn>
    </v-col>
  </v-row>
  </template>

<style scoped>
.container{
  padding:5px;
  width: 500px;
}
.card{
  padding-top: 13px;
  display: flex;
  align:center;
  justify-content: center;
  margin:10px;
  background-color: #9e1f1f;
  width:100px;
  height:50px
}
.card.add {
  background-color: rgba(200, 194, 192, 0.62);
}
.no-header .v-picker__title {
  display: none;
}
p {
  font-size: 16px;
  font-weight: 400;
}
.category {
  font-weight: 500;
}
.custom-picker{
    margin-left: 50px;
    width: 400px;
}
</style>
