<script setup>
import CChartPie from "@/components/restaurant/charts/ChartPie.vue";
import CChartLine from "@/components/restaurant/charts/LineChart.vue";
import CChartBar from "@/components/restaurant/charts/ChartBar.vue";
import CChartDoughnut from "@/components/restaurant/charts/ChartDoughnut.vue"
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CCard, CCardBody, CCardHeader} from "@coreui/vue/dist/esm/components/card/index.js";
import {CButton} from "@coreui/vue/dist/esm/components/button/index.js";
import {CButtonGroup} from "@coreui/vue/dist/esm/components/button-group/index.js";
</script>

<template>
  <CRow class="ml-2">
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader> Line Chart </CCardHeader>
        <CCardBody>
          <CChartPie />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Bar Chart</CCardHeader>
        <v-spacer></v-spacer>
        <CCardBody><CChartLine /></CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Doughnut Chart</CCardHeader>
        <CCardBody><CChartBar /></CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<style scoped>

</style>