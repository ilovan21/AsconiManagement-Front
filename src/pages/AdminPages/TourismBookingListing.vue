<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
import StaffNavbar from '@/components/StaffNavbar.vue'
import { VDateInput } from 'vuetify/labs/VDateInput';
import axios from "axios";
const currentDate = new Date();
import { watch, shallowRef } from 'vue';
import ReservationServiceDetailsCard from "@/components/ReservationServiceDetailsCard.vue";
import AddServiceReservation from "@/components/AddServiceReservation.vue";
const reservations=ref([]);
function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

const dialog = shallowRef(false);
const addDialog = shallowRef(false);

const services = [
  {
    id: 0,
    name: 'All',
    restaurant: ' ',
  },
  {
    id: 1,
    name: 'Tour',
  },
  {
    id: 2,
    name: 'Tasting',
  },
  {
    id: 3,
    name: 'Wine Art',
  },
  {
    id: 4,
    name: 'Placinte Masterclass',
  }
]

const filterData = ref({
  date: new Date(),
  serviceId: 0,
  nameSurname: ""
});

const responseStatus = ref(false);
const getReservations = async () => {
  const dateToSend = formatForRequest(filterData.value.date);
  console.log(dateToSend);
  try {
    const token=localStorage.getItem('user_token');
    console.log("Token: ",token);
    const response = await axios.get(`http://localhost:8080/api/service/view/filtered?date=${dateToSend}&serviceId=${filterData.value.serviceId}&nameSurname=${filterData.value.nameSurname}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    reservations.value = response.data;
  } catch (error) {
    console.error('Error fetching the reservations:', error);
    reservations.value = [];
  }
  responseStatus.value = reservations.value.length > 0;
};
onMounted(() => {
  getReservations();
});
watch(filterData, () => {
  getReservations();
},{deep:true});

const position = { X: 150, Y: 0}

const getReservationDetails = async (id)=>{
  try {
    const response = await axios.get(`http://localhost:8080/api/service/public/view/get/${id}`);
    reservationDetails.value.id=response.data.id;
    reservationDetails.value.nrPeople=response.data.nrPeople;
    reservationDetails.value.serviceName=response.data.touristicServiceName;
    reservationDetails.value.date=response.data.date;
    reservationDetails.value.hour=response.data.hour;
    reservationDetails.value.nameSurname=response.data.nameSurname;
    reservationDetails.value.email=response.data.email;
    reservationDetails.value.phone=response.data.phone;
    reservationDetails.value.specification=response.data.specification;
    reservationDetails.value.language=response.data.language;
    console.log("received response: ", response.data);
    console.log("name service: ", reservationDetails.value.serviceName);
  } catch (error) {
    console.error('Error fetching reservation details:', error);
  }
};
const reservationDetails = ref({
  id:"",
  nrPeople:"",
  serviceName:"",
  date:"",
  hour:"",
  nameSurname:"",
  email:"",
  phone:"",
  specification:"",
  language:""
});
const handleDeletedReservation = (reservation_id) =>{
  reservations.value=reservations.value.filter(reservation => reservation.id !== reservation_id);
};
</script>

<template>
  <v-app id="inspire">
    <StaffNavbar/>
    <v-main>
      <v-container class="container">
        <v-row
            no-gutters
        >
          <v-col cols="4">
            <v-sheet class="pa-2 mt-2 mb-2">
              <v-date-input
                  label="Select a date"
                  class="date-input"
                  :density="'compact'"
                  variant="outlined"
                  v-model="filterData.date"
              ></v-date-input>
            </v-sheet>
          </v-col>
          <v-col
              cols="3"
              class="custom-offset"
          >
            <v-sheet class="pa-2 ml-15 mt-2 mb-2">
              <v-select
                  v-model="filterData.serviceId"
                  class="select-component"
                  variant="outlined"
                  density="compact"
                  :items="services"
                  item-title="name"
                  item-value="id"
                  label="Filter by service">
              </v-select>
            </v-sheet>
          </v-col>
          <v-col
              class="custom-col"
          >
            <v-sheet class="pa-2 mb-2 mt-2">
                <v-text-field
                    v-model="filterData.nameSurname"
                    style="width: 200px; height: 40px;"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                    label="Find by name"
                ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container pa-0>
        <v-dialog
            v-model="addDialog"
            max-width="800px"
            max-height="600px"
            :style="{ top: position.Y + 'px', left: position.X + 'px', position: 'absolute' }"
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                :ripple="false"
                v-bind="activatorProps"
                icon="mdi-plus" size="small"></v-btn>
          </template>
          <AddServiceReservation/>
        </v-dialog>
      </v-container>
      <v-container class="pa-0">
        <div v-if="!responseStatus" class="no-result-section">
          <v-empty-state
              icon="mdi-magnify"
              title="Aucun résultat trouvé."
          ></v-empty-state>
        </div>
        <div v-if="responseStatus">
          <v-row class="list-row">
            <v-col v-for="(item, index) in reservations" :key="item.id" class="list-col">
              <v-dialog
                  v-model="dialog"
                  max-width="800"
                  scrim="false"
                  :style="{ top: position.Y + 'px', left: position.X + 'px', position: 'absolute' }"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-card link class="reservation-card" v-bind="activatorProps" @click="getReservationDetails(item.id)">
                    <v-card-title class="card-components d-flex align-center">
                      <span class="category-time text-left" style="flex: 1;">{{ item.hour.slice(0, -3) }}</span>
                      <span class="card-text text-left" style="flex: 7;">{{ item.nameSurname }}, {{ item.nrPeople }} personnes</span>
                      <span class="category-hall text-right" style="flex: 1;">{{ item.touristicServiceName }}</span>
                    </v-card-title>
                  </v-card>
                </template>
                <ReservationServiceDetailsCard
                    :reservationDetails="reservationDetails"
                    :dialog="dialog"
                    @update:dialog="dialog = $event"
                    @reservation-deleted="handleDeletedReservation"/>/>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.date-input{
  height: 30px;
  width: 350px;
}
.container{
  margin-left: 0px;
  padding-bottom:0px
}
.select-component{
  width: 200px;
}
.custom-col {
  width: 22%;
  max-width: 250px;
}
.custom-offset {
  margin-left: 23%;
}
.reservation-card{
  background-color: rgba(185, 82, 59, 0.85);
  border-color: #b9523b;
  height: 40px;
  width:1200px;
}
.list-row{
  margin-top: 10px;
  margin-bottom: 10px;
}
.list-col{
  padding:5px;
}
.category-time{
  font-size: 13px;
  font-weight: 300;
}
.category-hall{
  font-size: 13px;
  font-weight: 300;
}
.card-text{
  font-size:15px;
}
.card-components{
  display:flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
}
.no-result-section{
  margin-top: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.custom-col{
  display:flex;
  justify-content:center;
}
.custom-col{
  margin-left: auto;
  display: flex;
  justify-content: end;
}
</style>

