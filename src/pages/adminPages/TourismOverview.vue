<script setup>
import StaffNavbar from '@/components/pageElements/StaffNavbar.vue'
import Charts from "@/components/tourism/charts/Charts.vue";
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CWidgetStatsB} from "@coreui/vue/dist/esm/components/widgets/index.js";

</script>

<template>
  <StaffNavbar/>
  <div>
    <h4 class="mb-3 ml-3">Tableau de bord</h4>
    <CRow class="custom-row">
      <CCol :sm="5" :lg="3">
        <CWidgetStatsB
            class="mb-4 ml-2 custom-card"
            :progress="{ color: 'success', value: 40 }"
            title="Réservations aujourd’hui"
            value="12"
        >
          <template #text>Services</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="info"
            inverse
            :progress="{ value: 12 }"
            title="Tour"
            value="7"
            text="Service plus réservés"
        />
      </CCol>

      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="warning"
            :progress="{ value: 12 }"
            title="Capacité de réservation"
            value="7%"
        >
          <template #text>Toutes les services</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="4" :lg="3">
        <CWidgetStatsB
            class="mb-4 custom-card"
            color="danger"
            inverse
            :progress="{ value: 90 }"
            title="Employés actifs"
            value="12"
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
}
.custom-row {
  margin-left: -5px;
  margin-right: -8px;
}
:deep(.col) {
  padding-left: 5px;
  padding-right: 5px;
}
</style>

