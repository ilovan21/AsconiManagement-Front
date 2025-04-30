<script setup>
import StaffNavbar from "@/components/pageElements/StaffNavbar.vue";
import axios from "axios";
import {nextTick, onMounted, ref, shallowRef} from "vue";
import ServiceDetailsCard from "@/components/tourism/service/ServiceDetailsCard.vue";
import EditServiceDetailsCard from "@/components/tourism/service/EditServiceDetailsCard.vue";

onMounted(() => {
  getAllServices();
});

const handleEditedService = () =>{
  getAllServices();
};

const selectedService= ref(null);
const services = ref([]);
const getAllServices = async() => {
  const token=localStorage.getItem('user_token');
  try{
    const response = await axios.get(`http://localhost:8080/api/admin/services/all-services`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    services.value = response.data;
    console.log("services: ", response.data);
  } catch (error) {
  console.error('Error fetching the reservations:', error);
  }
};

const detailsDialog = ref({});

const dialog = shallowRef(false);
const position = { X: 150, Y: 0}

const openDialog = async (serviceId) => {
  await getServiceDetails(serviceId);
  await nextTick();
  selectedService.value = serviceId;
  detailsDialog.value = true;
}

const getServiceDetails = async (serviceId) => {
  try {
    const token = localStorage.getItem('user_token');
    const response = await axios.get(`http://localhost:8080/api/admin/service/${serviceId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    serviceDetails.value.id= response.data.id;
    serviceDetails.value.name= response.data.name;
    serviceDetails.value.duration= response.data.duration;
    serviceDetails.value.capacity=response.data.capacity;
    serviceDetails.value.about= "La visite comprend l’exploration de la zone de production, où les " +
        "processus de fermentation, de maturation et de conservation du vin sont expliqués en" +
        " détail. Elle se termine par la découverte des étapes finales, de la mise en bouteille à " +
        "l’étiquetage, révélant tout le savoir-faire de notre domaine.\n";
  } catch (error) {
    console.error('Error fetching service details:', error);
  }
};

const serviceDetails = ref({
  id:"",
  name:"",
  duration:"",
  capacity:"",
  about: ""
});

</script>

<template>
  <v-app id="inspire">
    <StaffNavbar/>
    <v-main>
      <v-container class="container">
  <v-row no-gutters>
    <p class="category-manage">Services</p>
  </v-row>
        <v-row no-gutters style="padding-left: 20px; padding-bottom:5px">
          <v-col cols="3">Type</v-col>
          <v-col style="margin-left: 73px">Capacite</v-col>
          <v-col style="font-weight: 300">Duration</v-col>
        </v-row>
        <v-row class="list-row">
    <v-row  v-for="(item) in services" :key="item.id" class="list-col">
    <v-col cols="11" style="padding: 5px; margin: 0px;">
      <v-dialog
          v-model="detailsDialog[item.id]"
          max-width="800"
          :style="{ top: position.Y + 'px', left: position.X + 'px', position: 'absolute' }"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-card link class="reservation-card" v-bind="activatorProps" @click="openDialog(item.id)">
            <v-card-title class="card-components d-flex align-center">
              <span class="card-text text-left" style="flex: 1;"> {{item.name}}</span>
              <span class="category-hall text-center" style="flex:1;" > max {{item.capacity}} p.</span>
              <span class="category-hall text-center" style="flex: 2;text-align: center;">{{item.duration}} min.</span>
              <span class="view-more text-end"> view more</span>
            </v-card-title>
          </v-card>
                </template>
                  <ServiceDetailsCard
                      v-if="selectedService === item.id"
                      :dialog="detailsDialog"
                      :serviceDetails="serviceDetails"
                      @edited-service="handleEditedService"
                      @update:dialog="detailsDialog = $event"/>
              </v-dialog>
    </v-col>
    </v-row>
  </v-row>
        <v-row no-gutters>
          <p class="res-section">Service responsables</p>
        </v-row>
        <v-row no-gutters style="padding-left: 20px; padding-bottom:5px">
          <v-col cols="3">Service</v-col>
          <v-col style="margin-left: 73px">Responsables</v-col>
        </v-row>
        <v-row class="list-row">
          <v-row  v-for="(item) in services" :key="item.id" class="list-col">
            <v-col cols="11" style="padding: 5px; margin: 0px;">
              <v-card class="reservation-card">
                <v-card-title class="card-components d-flex align-center">
                  <span class="card-text text-left" style="flex: 1;"> {{item.name}}</span>
                  <span class="view-more text-center" style="flex:1; padding-left:180px;" > Ilovan Maria, Marin Petrescu, Daniela Savciuc, Mirela Dogari</span>
                  <span class="category-hall text-center" style="flex: 2;text-align: center;">  </span>
                  <span class="view-more text-end ">Modifier</span>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.res-section{
  padding-left:20px;
  font-size: 20px;
  padding-top:40px;
  padding-bottom: 20px;
}
.category-manage{
  padding-left:20px;
  font-size: 20px;
  padding-top:20px;
  padding-bottom: 20px;
}
.view-more{
  font-size: 13px;
  font-weight: 400;
}

.container{
  padding-left:45px;
  margin-left: 0px;
  padding-bottom:0px
}
.reservation-card{
  background-color: rgba(189, 185, 185, 0.4);
  border-color: rgb(158, 31, 31);
  height: 40px;
  width:1150px;
}
.list-row{
  margin-top: 10px;
  margin-bottom: 10px;
  width: fit-content;
}
.list-col{
  padding-left:15px;
  width:1300px;
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
</style>

