<script setup>
import StaffNavbar from "@/components/pageElements/StaffNavbar.vue";
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import HallDetailsCard from "@/components/restaurant/hall/HallDetailsCard.vue";

onMounted(() => {
  getAllHalls();
});
const handleEditedService = () =>{
  getAllHalls();
};
const selectedHall= ref(null);
const asconiHalls = ref([]);
const solHalls=ref([]);

const token = localStorage.getItem('user_token');
const getAllHalls = async() => {
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
const disabledDates = ref([]);
const getHallTables = async (hallId) => {
  if (hallTables.value[hallId]) return;
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
const getUnavailableDates = async (hallId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/unavailable-dates/hall?hallId=${hallId}`);
    if (Array.isArray(response.data)) {
      disabledDates.value = response.data.map(date => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
      });
      console.log(disabledDates.value);
    } else {
      console.error('Invalid data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching disabled dates:', error);
  }
};
const expandedPanel = ref(null);
watch(expandedPanel, (newVal) => {
  if (newVal !== null && solHalls.value[newVal]) {
    const hall = solHalls.value[newVal];
    getHallTables(hall.id);
    getUnavailableDates(hall.id);
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
                  :disabledDates="disabledDates[item.id]"
              />
              <div v-else>Loading...</div>
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
                  :disabledDates="disabledDates"
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
.category-manage{
  font-size: 20px;
  padding-top:20px;
  padding-bottom: 20px;
}
.container{
  margin-left: 0px;
}
</style>

