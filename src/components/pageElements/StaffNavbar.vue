<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logout } from "@/services/authService.js";
import logo from "@/assets/images.png";
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const selectedItem = ref(null);
const drawer = ref(null);

const section = ref(route.path.includes('tourism') ? 'tourism' : 'restaurant');
const tab = ref(section.value);

const links = computed(() => [
  { title: 'Aperçu', path: `/overview/${section.value}`, icon: 'mdi-view-dashboard' },
  { title: 'Gestion', path: `/management/${section.value}`, icon: 'mdi-cog' },
  { title: 'Liste des Réservations', path: `/listing/${section.value}`, icon: 'mdi-format-list-bulleted' }
]);

watch(section, (newSection) => {
  tab.value = newSection;
});

function changeSection(newSection) {
  section.value = newSection;
  tab.value = newSection;

  if (route.path.includes('/overview')) {
    router.push(`/overview/${newSection}`);
  } else if (route.path.includes('/management')) {
    router.push(`/management/${newSection}`);
  } else if (route.path.includes('/listing')) {
    router.push(`/listing/${newSection}`);
  }
}

function handleLogout() {
  logout();
  router.push({ name: "auth" });
}
</script>

<template>
    <v-navigation-drawer
        v-model="drawer"
        elevation="2"
        class="b-navigation-drawer">
      <v-img class="logo-image" :src="logo" height="70" width="180" Cover></v-img>

      <v-sheet class="pa-4" color="white">
        <v-list>
          <v-list-item
              prepend-avatar="https://static.vecteezy.com/system/resources/previews/030/504/836/non_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"
              :subtitle="userStore.email"
              :title="userStore.name"
          ></v-list-item>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>

      <v-list density="comfortable" nav v-model:selected="selectedItem">
        <v-list-item
            v-for="item in links"
            :key="item.path"
            :to="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="custom-button" block @click="handleLogout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-card :height="50" dense elevation="0" class="navbar-sections">
      <v-tabs v-model="tab" align-tabs="center" bg-color="white" color="red-darken-3">
        <v-tab value="restaurant" @click="changeSection('restaurant')">Restaurant</v-tab>
        <v-tab value="tourism" @click="changeSection('tourism')">Tourism</v-tab>
      </v-tabs>
    </v-card>
</template>

<style scoped>
.logo-image {
  margin-left: 20px;
}
.custom-selected {
  background-color: #b9523b;
  color: white;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: #b9523b;
}
.custom-button {
  border-color: #b9523b;
  background-color: white;
  border-radius: 10px;
}
.b-navigation-drawer {
  border-radius: 6px;
}
v-app-bar {
  height: 40px !important;
  min-height: 40px !important;
}
</style>
