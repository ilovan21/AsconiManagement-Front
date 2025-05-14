<script setup>
import CChartPie from "@/components/restaurant/charts/ChartPie.vue";
import CChartLine from "@/components/restaurant/charts/LineChart.vue";
import CChartBar from "@/components/restaurant/charts/ChartBar.vue";
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CCard, CCardBody, CCardHeader} from "@coreui/vue/dist/esm/components/card/index.js";
</script>

<template>
  <CRow class="ml-2">
    <CCol class="mb-4 piechart-col">
      <CCard>
        <CCardHeader> Reservation par Salles </CCardHeader>
        <CCardBody>
          <CChartPie />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Clients par mois</CCardHeader>
        <v-spacer></v-spacer>
        <CCardBody><CChartLine /></CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Reservations par mois</CCardHeader>
        <CCardBody><CChartBar /></CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<style scoped>
.piechart-col {
  max-width: calc(50% - 10px);
}
</style>