<script setup>
import restaurant from "@/assets/restaurant.jpg"
import ImageComponent from "@/components/pageElements/ImageComponent.vue";
import ClientNavbar from "@/components/pageElements/ClientNavbar.vue";
import ClientFooter from "@/components/pageElements/ClientFooter.vue";
import HallCard from "@/components/restaurant/hall/HallCard.vue";
import TraditionalElement from "@/components/pageElements/TraditionalElement.vue";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

import {hallList, hallList2} from "@/constants/hallList.js";

const scrollToHash = (hash) => {
  hash = hash.replace("#", "")

  if (hash) {
    const element = document.getElementById(hash);

    if (element) {
      window.scrollTo({
        top: document.getElementById(hash).offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }
};

onMounted(async () => {
  scrollToHash(route.hash);
});

watch(() => route.hash, () => {
  scrollToHash(route.hash);
});
</script>

<template>

  <ClientNavbar/>
  <ImageComponent :src="restaurant"/>
  <span v-for="card in hallList.concat(hallList2)">
      <TraditionalElement />
      <HallCard
          :hash="card.hash"
          :id="card.id"
          :title="card.title"
          :list="card.list"
          :image="card.image"
          :buttonText="card.buttonText"
      />
  </span>
  <TraditionalElement/>
  <ClientFooter/>
</template>

<style scoped>
p {
  text-align: center;
  font-size: 17px;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: 100;
  font-style: normal;
  color: #000;
  margin-left: 300px;
  margin-right: 300px;
}
</style>