<script setup>
import logo from "@/assets/logo-footer.jpg";
import {ref} from "vue";

</script>

<template>
  <v-footer class="bg-black">
    <v-container>
      <v-row no-gutters>
        <v-col        >
          <v-sheet class="ma-0 pa-1 bg-black" >
            <v-img
                class="mx-2 d-flex justify-start"
                :src="logo"
                height="150"
                width="150"
                contain
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col        >
          <v-sheet class="ma-0 pa-2 bg-black">
            <v-list class="bg-black" dense>
              <v-list-item
                  v-for="(link, index) in links"
                  :key="index"
                  class="pa-0 ma-0"
                  :ripple="false"
              >
                <router-link
                    :to="link.url"
                    class="list-item-text"
                >
                  <v-list-item-title class="list-item-text">
                    <span>
                      {{ link.name }}
                    </span>
                  </v-list-item-title>
                </router-link>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
        <v-col        >
          <v-sheet class="ma-0 pa-2 bg-black">
            <v-list-item
                v-for="(link, index) in links2"
                :key="index"
                class="custom-list-item"
                :ripple="false"
            >
              <router-link
                  :to="link.url"
                  class="list-item-text"
              >
                <v-list-item-title class="list-item-text">
                    <span>
                      {{ link.name }}
                    </span>
                </v-list-item-title>
              </router-link>
            </v-list-item>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col        >
          <v-sheet class="ma-0 pa-1 bg-black" >
            <span>2025 © Asconi Winery</span>
          </v-sheet>
        </v-col>
        <v-col        >
          <v-sheet class="ma-0 pa-1 bg-black " >
            <v-row>
              <span></span>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: [
      { name: 'HOME', url: '/' },
      { name: 'THE WINERY', url: '#' },
      { name: 'GUEST HOUSE', url: '#' },
      { name: 'RESTAURANT', url: '/restaurant' },
      { name: 'EXPERIENCES', url: '/experiences' },
      { name: 'EVENTS', url: '#' },
      { name: 'GALLERY', url: '#' },
      { name: 'CSR', url: '#' },
      { name: 'WINES', url: '#' },
      { name: 'CONTACT US', url: '#' }
    ],
    links2: [
      { name: 'PRIVACY POLICY', url: '#' },
      { name: 'TERMS OF SERVICE', url: '#' },
      { name: 'SHIPPING POLICY', url: '#' },
      { name: 'TERMS AND CONDITIONS', url: '#' },
      { name: 'SECURITY POLICY AND CARD PAYMENTS', url: '#' },
      { name: 'FOOD SAFETY POLICY', url: '#' },
    ],
  }),
}
</script>

<style scoped>
.custom-list-item {
  min-height: 30px;
  padding: 5px 10px;
  background-color: transparent;
}
.list-item-text,span {
  color: white;
  font-size: 14px;
  font-weight: 90;
  text-decoration: none;
  display: block;
  padding: 4px 0;
}

.list-item-text:hover {
  text-decoration: none;
  color: white;
  background: none;
  font-weight: normal;
}

</style>