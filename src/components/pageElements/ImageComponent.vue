<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-img
      :src="src"
      cover
      height="100vh"
      alt="Cover Image"
  >
    <template v-slot:placeholder>
      <v-row align="center" justify="center" style="height: 100%;">
        <v-progress-circular indeterminate color="white" size="56"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<style scoped>
</style>
