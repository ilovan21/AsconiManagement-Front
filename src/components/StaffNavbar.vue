<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import router from "@/router/index.js";
import {logout} from "@/services/authService.js";
import logo from "@/assets/images.png";

const selectedItem=ref(null);
let tab = ref(null);
defineProps({
  name: {type: String, required: true},
  email: {type: String, required: true}
});

const links = [
  {title: 'Overview', value: 'overview', icon:'mdi-inbox-arrow-down',url: '/admin'},
  {title: 'Management', value: 'management', icon:'mdi-send',url: '/admin-manage'},
  {title: 'Booking Listing', value: 'listing', icon:'mdi-inbox-arrow-down',url: '/admin-listing'}];

const drawer = ref(null)

function handleLogout(){
  logout();
  router.push({name:"auth"});
}
</script>

<script>
</script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="2" class="b-navigation-drawer">
      <v-img
          class="logo-image"
          :src="logo"
          height="70"
          width="180"
          Cover
      ></v-img>
      <v-sheet
          class="pa-4"
          color="white"
      >
        <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :subtitle="email"
              :title="name"
          ></v-list-item>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>
      <v-list density="comfortable" nav v-model:selected="selectedItem">
        <v-list-item
            v-for = "item in links"
            :key="item.value"
            :value="item.value"
            :class="{ 'custom-selected': selectedItem === item.value }"
            @click="selectedItem = item.value"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.url"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="custom-button" block >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-card :height="50" dense elevation="0" class="navbar-sections">
      <v-tabs
          v-model="tab"
          align-tabs="center"
          bg-color="white"
          color="red-darken-3"
      >
        <v-tab value="restaurant">Restaurant</v-tab>
        <v-tab value="tourism">Tourism</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="restaurant">
            Restaurant
          </v-tabs-window-item>
          <v-tabs-window-item value="tourism">
            Tourism
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-app>
</template>
<style scoped>
.logo-image{
  margin-left: 20px;
}
.custom-selected {
  background-color: #b9523b;
  color: white;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: #b9523b;
}
.custom-button{
  border-color: #b9523b;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.b-navigation-drawer{
  border-radius: 6px;
}
v-app-bar{
  height: 40px !important;
  min-height: 40px !important;
}

</style>
