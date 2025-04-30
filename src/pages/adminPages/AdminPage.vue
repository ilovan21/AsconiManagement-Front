<script setup>
import Chart from 'primevue/chart';
import StaffNavbar from '@/components/pageElements/StaffNavbar.vue'
import Charts from "@/components/restaurant/charts/Charts.vue";
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CWidgetStatsB} from "@coreui/vue/dist/esm/components/widgets/index.js";

</script>

<template>
  <StaffNavbar/>
  <div>
    <h4 class="mb-3 ml-3">Admin Overview</h4>
    <CRow class="custom-row">
      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 ml-2 custom-card"
            :progress="{ color: 'success', value: 80 }"
            title="Réservations aujourd’hui"
            value="45"
        >
          <template #text>Restaurant</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="info"
            inverse
            :progress="{ value: 65 }"
            title="Casa Cu Sobe"
            value="128"
            text="Salle la plus utilisée"
        />
      </CCol>

      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="warning"
            :progress="{ value: 40 }"
            title="Capacité de réservation"
            value="12%"
        >
          <template #text>Toutes les salles</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="4" :lg="3">
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
  margin-left: -8px;
  margin-right: -8px;
}
:deep(.col) {
  padding-left: 8px;
  padding-right: 8px;
}
</style>

