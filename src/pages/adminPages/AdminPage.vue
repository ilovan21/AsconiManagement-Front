<script setup>
import StaffNavbar from '@/components/pageElements/StaffNavbar.vue'
import Charts from "@/components/restaurant/charts/Charts.vue";
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CWidgetStatsB} from "@coreui/vue/dist/esm/components/widgets/index.js";
import axios from "axios";
import {onMounted, ref} from "vue";

function formatForRequest(date) {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}
const topHallData = ref({
  hallName:'',
  totalReservations: null,
  totalClients:null
});
const overviewData = ref({
  reservationCount:null,
  clientCount:null
})
const today = new Date();
const getOverviewData = async () => {
  const dateToSend = formatForRequest(today);
  console.log(dateToSend);
  try {
    const token=localStorage.getItem('user_token');
    const topHall = await axios.get(`http://localhost:8080/api/restaurant/admin/overview/top-hall/${dateToSend}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    topHallData.value.hallName = topHall.data[0];
    topHallData.value.totalReservations = topHall.data[1];
    topHallData.value.totalClients = topHall.data[2];
    const reservationCount = await axios.get(`http://localhost:8080/api/restaurant/admin/overview/total-by-date/${dateToSend}`,
        {headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    overviewData.value.reservationCount = reservationCount.data[0];
    overviewData.value.clientCount = reservationCount.data[1];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  getOverviewData();
});
</script>

<template>
  <StaffNavbar/>
  <div>
    <h4 class="mb-3 ml-3">Tableau de bord</h4>
    <CRow class="custom-row">
      <CCol :sm="5" :lg="3">
        <CWidgetStatsB
            class="mb-4 ml-2 custom-card"
            :progress="{ color: 'success', value: 10 }"
            title="Réservations aujourd’hui"
            :value="overviewData.reservationCount"
        >
          <template #text>Restaurant</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="5" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="info"
            inverse
            :progress="{ value: 65 }"
            :title="topHallData.hallName"
            :value="topHallData.totalReservations"
            text="Salle la plus utilisée"
        />
      </CCol>

      <CCol :sm="5" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="warning"
            :progress="{ value: 3 }"
            title="Clients aujourd’hui"
            :value="overviewData.clientCount"
        >
          <template #text>Toutes les salles</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="5" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="danger"
            inverse
            :progress="{ value: 90 }"
            title="Employés actifs"
            value="8"
            text="sur l'échange actuel"
        />
      </CCol>
    </CRow>
  </div>
  <Charts></Charts>
</template>

<style scoped>
.custom-card {
  height: 130px;
  margin-bottom: 15px;
}
.custom-row {
  margin-left: -5px;
  margin-right: -8px;
}
:deep(.col) {
  padding-left: 8px;
  padding-right: 8px;
}
</style>

