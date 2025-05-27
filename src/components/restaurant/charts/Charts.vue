<script setup>
import CChartPie from "@/components/restaurant/charts/ChartPie.vue";
import CChartLine from "@/components/restaurant/charts/LineChart.vue";
import CChartBar from "@/components/restaurant/charts/ChartBar.vue";
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CCard, CCardBody, CCardHeader} from "@coreui/vue/dist/esm/components/card/index.js";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}
const today = new Date();
const reservationsPerMonth = ref();
const clientsPerMonth = ref();
const pieChart = ref();
const getChartData = async () => {
  const dateToSend = formatForRequest(today);
  try {
    const token=localStorage.getItem('user_token');
    const barChartData = await axios.get(`http://localhost:8080/api/restaurant/admin/overview/reservations-by-months/2025`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    reservationsPerMonth.value = barChartData.data;
    const chartLineData = await axios.get(`http://localhost:8080/api/restaurant/admin/overview/clients-by-months/2025`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    clientsPerMonth.value = chartLineData.data;
    const pieChartData = await axios.get(`http://localhost:8080/api/restaurant/admin/overview/reservations-by-month?month=5&year=2025`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    console.log("pie Chart", pieChartData.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted( () => {
  getChartData()
});
</script>

<template>
  <CRow class="ml-2">
    <CCol class="mb-4 piechart-col">
      <CCard>
        <CCardHeader> Reservation par Salles </CCardHeader>
        <CCardBody>
          <CChartPie :data="pieChart"/>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Clients par mois</CCardHeader>
        <v-spacer></v-spacer>
        <CCardBody><CChartLine :data="clientsPerMonth" /></CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Reservations par mois </CCardHeader>
        <CCardBody><CChartBar :data="reservationsPerMonth" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<style scoped>
.piechart-col {
  max-width: calc(50% - 10px);
}
</style>