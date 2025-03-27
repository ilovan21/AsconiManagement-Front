<script setup>
import { ref } from "vue";
import romania from '@/assets/ro.png';
import logo from '@/assets/images.png'
import french from '@/assets/download.png';

const imageOptions = [
  { label: "Romania", src: romania },
  { label: "French", src: french }
];

const selectedImage = ref(french);

const links = ref([
  { name: 'ACCUEIL', url: '/' },
  { name: 'CAVE', url: 'events' },
  { name: 'MAISON D’HOTES', url: '/guesthouse' },
  { name: 'RESTAURANTS', url: '/restaurant' },
  { name: 'EXPÉRIENCES', url: '/experiences' },
  { name: 'ÉVÉNEMENTS', url: '/events' },
  { name: 'GALLERIE', url: '/gallery' },
  { name: 'RSE', url: '/csr' },
  { name: 'VINS', url: '/gallery' },
  { name: 'CONNECT', url: '/auth' }
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
          :ripple="false"
          class="item-page"
          v-for="link in links"
          :key="link.name"
          :to="link.url"
      >
      {{ link.name }}
      </v-tab>
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
.item-page {
  text-transform: none;
  font-weight: normal;
}

.item-page:hover {
  text-decoration: none;
  background: none;
  font-weight: normal;
}
</style>
