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
  { name: 'HOME', url: '/' },
  { name: 'WINERY', url: 'events' },
  { name: 'GUESTHOUSE', url: '/guesthouse' },
  { name: 'RESTAURANTS & POOL', url: '/restaurant' },
  { name: 'EXPERIENCES', url: '/experiences' },
  { name: 'EVENTS', url: '/events' },
  { name: 'GALLERY', url: '/gallery' },
  { name: 'CSR', url: '/csr' },
  { name: 'WINES', url: '/gallery' },
  { name: 'CONTACT US', url: '/auth' }
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
