<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
import StaffNavbar from '@/components/StaffNavbar.vue'
import { VDateInput } from 'vuetify/labs/VDateInput';
import axios from "axios";
const currentDate = new Date();
import { watch, shallowRef } from 'vue';
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
const dialog = shallowRef(false)
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
    console.log("reservations : ",reservations.value);
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
              <v-responsive
                  class="mx-auto"
                  max-width="300"
              >
                <v-text-field
                    v-model="filterData.nameSurname"
                    style="width: 200px; height: 40px;"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                    label="Find by name"
                ></v-text-field>
              </v-responsive>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container ma-0>
        <v-row>
          <v-col cols="6" ma-0>
          </v-col>
          <v-col cols="6" class="custom-col" ma-0>
            <v-btn
                :ripple="false"
                icon="mdi-plus" size="small"></v-btn>
          </v-col>
        </v-row>
      </v-container>
      <template>
        <div class="pa-4 text-center">
          <v-dialog
              v-model="dialog"
              max-width="600"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                  class="text-none font-weight-regular"
                  prepend-icon="mdi-account"
                  text="Edit Profile"
                  variant="tonal"
                  v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card
                prepend-icon="mdi-account"
                title="User Profile"
            >
              <v-card-text>
                <v-row dense>
                  <v-col
                      cols="12"
                      md="4"
                      sm="6"
                  >
                    <v-text-field
                        label="First name*"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="4"
                      sm="6"
                  >
                    <v-text-field
                        hint="example of helper text only on focus"
                        label="Middle name"
                    ></v-text-field>
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

                <small class="text-caption text-medium-emphasis">*indicates required field</small>
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
            </v-card>
          </v-dialog>
        </div>
      </template>
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

