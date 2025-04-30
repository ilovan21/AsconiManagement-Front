<script setup>
import {computed, ref, shallowRef} from "vue";
import romania from '@/assets/ro.png';
import logo from '@/assets/images.png'
import french from '@/assets/download.png';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";
import AddReservation from "@/components/restaurant/reservation/AddReservation.vue";
import RegisterForm from "@/components/pageElements/RegisterForm.vue";
library.add(faUserLock);

const links = ref([
  { name: 'ACCUEIL', url: '/' },
  { name: 'CAVE', url: 'events' },
  { name: 'MAISON D’HOTES', url: '/guesthouse' },
  { name: 'RESTAURANTS', url: '/restaurant' },
  { name: 'EXPÉRIENCES', url: '/experiences' },
  { name: 'ÉVÉNEMENTS', url: '/events' },
  { name: 'GALLERIE', url: '/gallery' },
  { name: 'RSE', url: '/csr' },
  { name: 'VINS', url: '/gallery' }
]);
const dialogStyles = computed(() => ({
  position: "fixed",
  left: "130px",
  top: "50%",
  transform: "translateY(-90%)"
}));
const formDialog = shallowRef(false);
const position = { X: 130}
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
    <v-dialog
        v-model="formDialog"
        max-width="800px"
        max-height="600px"
        scrim="rgba(0, 0, 0, 0.9)"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <font-awesome-icon v-bind="activatorProps" class="icon" :icon="faUserLock" />
      </template>
      <RegisterForm :dialog="formDialog"
                    style="margin-left: 75px"
                      @update:dialog="formDialog = $event"/>
    </v-dialog>
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
.icon{
  width: 20px;
  height: 20px;
  padding-right: 20px;
}
</style>
