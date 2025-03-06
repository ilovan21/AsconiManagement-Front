<script setup>
import { ref } from "vue";
import romania from '@/assets/ro.png';
import logo from '@/assets/images.png'
import england from '@/assets/en.png';

const imageOptions = [
  { label: "Romania", src: romania },
  { label: "England", src: england }
];

const selectedImage = ref(romania);

const links = ref([
  'HOME',
  'WINERY',
  'GUESTHOUSE',
  'RESTAURANTS&POOL',
  'EXPERIENCES',
  'EVENTS',
  'GALLERY',
  'CSR',
  'WINES',
  'CONTACT US'
]);
</script>

<template>
  <v-app-bar class="px-3" density="compact" flat height="90">
    <v-img
        class="mx-2"
        :src="logo"
        height="130"
        width="130"
        contain
    ></v-img>
    <v-avatar class="hidden-md-and-up" color="white" size="32"></v-avatar>

    <v-spacer></v-spacer>

    <v-tabs align-tabs="center" color="#b9523b">
      <v-tab
          v-for="link in links"
          :key="link"
          :text="link"
          font-sans="font-sans"
      ></v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-img
        class="custom-image"
        :src="selectedImage"
        :width="45"
        :height="21"
    />
  </v-app-bar>
</template>

<style scoped>
.custom-image img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
