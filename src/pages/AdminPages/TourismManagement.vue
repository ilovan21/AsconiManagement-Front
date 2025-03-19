<script setup>
import { shallowRef } from 'vue'
import ReservationDetailsCard from "@/components/ReservationDetailsCard.vue";
const position1 = { X: 420, Y: 240 }
const dialog = shallowRef(false)
</script>
<template>
  <div class="pa-4 text-end">
    <v-dialog
        v-model="dialog"
        max-width="800"
        :style="{ top: position1.Y + 'px', left: position1.X + 'px', position: 'absolute' }"
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

      <ReservationDetailsCard :dialog="dialog" @update:dialog="dialog = $event"/>
    </v-dialog>
  </div>
</template>