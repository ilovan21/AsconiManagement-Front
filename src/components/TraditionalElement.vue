<script setup>

import element from "@/assets/traditional-element.png";


defineProps({
  id: {type: String, required: false},
});

</script>

<template>
  <v-img
      v-bind="id ? { id } : {}"
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
</template>

<style scoped>

</style>