<script setup>
import image from "@/assets/asconi.jpg";
</script>

<template>
  <v-img
      :src="image"
      cover
      height="100vh"
      alt="Cover Image"
  >
    <template v-slot:placeholder>
      <v-row
          align="center"
          justify="center"
          style="height: 100%;"
      >
        <v-progress-circular
            indeterminate
            color="white"
            size="56"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<style scoped>

</style>