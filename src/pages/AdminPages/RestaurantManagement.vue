<script setup>
import StaffNavbar from "@/components/StaffNavbar.vue";
import axios from "axios";
import {nextTick, onMounted, ref, shallowRef, watch} from "vue";
import ServiceDetailsCard from "@/components/ServiceDetailsCard.vue";
import EditServiceDetailsCard from "@/components/EditServiceDetailsCard.vue";
import HallDetailsCard from "@/components/HallDetailsCard.vue";

onMounted(() => {
  getAllHalls();
});
const handleEditedService = () =>{
  getAllHalls();
};
const selectedHall= ref(null);
const asconiHalls = ref([]);
const solHalls=ref([]);
const getAllHalls = async() => {
  const token = localStorage.getItem('user_token');
  try {
    const response = await Promise.all([
      axios.get(`http://localhost:8080/api/admin/hall/by-restaurant/1`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`http://localhost:8080/api/admin/hall/by-restaurant/2`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);
    asconiHalls.value = response[0].data;
    solHalls.value = response[1].data;
  } catch (error) {
    console.error('Error fetching the reservations:', error);
  }
};

const hallTables = ref({});
const getHallTables = async (hallId) => {
  const token = localStorage.getItem('user_token');
  if (hallTables.value[hallId]) return;
  console.log(hallId);
  try {
    const response = await axios.get(`http://localhost:8080/api/admin/restaurant/tables/by-hall/${hallId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    hallTables.value[hallId] = response.data;
  } catch (error) {
    console.error('Error fetching the tables:', error);
  }
};
const expandedPanel = ref(null);
watch(expandedPanel, (newVal) => {
  if (newVal !== null && solHalls.value[newVal]) {
    const hall = solHalls.value[newVal];
    getHallTables(hall.id);
  }
});
</script>

<template>
  <v-app id="inspire">
    <StaffNavbar/>
    <v-main>
      <v-container class="container">
        <v-row no-gutters>
          <p class="category-manage">ASCONI</p>
        </v-row>
        <v-expansion-panels>
          <v-expansion-panel
              v-for="(item) in asconiHalls" :key="item.id">
            <v-expansion-panel-title>
              {{ item.hallName }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <HallDetailsCard
                  v-if="hallTables[item.id]"
                  :tables="hallTables[item.id]"
              />
              <div v-else>Se încarcă mesele...</div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row no-gutters>
          <p class="category-manage">SOL NEGRU</p>
        </v-row>
        <v-expansion-panels v-model="expandedPanel">
          <v-expansion-panel
              v-for="(item, index) in solHalls"
              :key="item.id"
          >
            <v-expansion-panel-title>
              {{ item.hallName }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <HallDetailsCard
                  v-if="hallTables[item.id]"
                  :tables="hallTables[item.id]"
              />
              <div v-else>Se încarcă mesele...</div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
  font-size: 20px;
  padding-top:20px;
  padding-bottom: 20px;
}
.view-more{
  font-size: 13px;
  font-weight: 400;
}
.container{
  margin-left: 0px;
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

