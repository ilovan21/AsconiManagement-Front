<script setup>
import restaurant from "@/assets/restaurant.jpg"
import ImageComponent from "@/components/ImageComponent.vue";
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import HallCard from "@/components/HallCard.vue";
import TraditionalElement from "@/components/TraditionalElement.vue";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

import {ref} from 'vue'

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

const hallElementsList = [
  {
    id: 22,
    title: "ASCONI Restaurant",
    list: [
      {text: 'Casa cu Sobe'},
      {text: 'Cerdac'},
      {text: 'Vinoteca'},
      {text: 'Casa de Vară'},
      {text: 'Terasa de la Cuptor'},
      {text: 'Terasa de la Găini'}
    ],
    image: "src/assets/asconirest.jpg",
    buttonText: "Menu and Wine List",
  },
  {
    id: 1,
    title: "Casa cu Sobe",
    list: [
      {text: 'Capacity: 72 pax'},
      {text: 'Style: traditional, rustic'}
    ],
    image: "src/assets/casacusobe.jpg",
  },
  {
    id: 2,
    title: "Vinoteca",
    list: [
      {text: 'Capacity: 100 pax'},
      {text: 'Area: 200 m2'},
      {text: 'Style: the winery’s young collection, with traditional elements'}
    ],
    image: "src/assets/vinoteca.jpeg"
  },
  {
    id: 3,
    title: "Cerdac",
    list: [
      {text: 'Capacity: 70 pax'},
      {text: 'Area: 90 m2'},
      {text: 'Style: traditional, rustic'}
    ],
    image: "src/assets/cerdac.jpeg",
  },
  {
    id: 4,
    title: "Casa de Vară",
    list: [
      {text: 'Capacity: 40 pax'},
      {text: 'Area: 75 m2'},
      {text: 'Style: classic with rustic elements'}
    ],
    image: "src/assets/casadevara.jpeg"
  },
  {
    id: 6,
    title: "Terasa de la Cuptor",
    list: [
      {text: 'Capacity: 52 pax'},
      {text: 'Area: 72 m2'},
      {text: 'Style: traditional, accompanied by the aroma of freshly baked bread'}
    ],
    image: "src/assets/terasacuptor.jpeg"
  },
  {
    id: 5,
    title: "Terasa de la Găini",
    list: [
      {text: 'Capacity: 40 pax'},
      {text: 'Area: 60 m2'},
      {text: 'Style: traditional, covered with vines'}
    ],
    image: "src/assets/terasagaini.jpeg"
  },
  {
    id: 20,
    title: "SOL NEGRU Restaurant",
    list: [
      {text: 'Casa cu Sobe'},
      {text: 'Cerdac'},
      {text: 'Vinoteca'},
      {text: 'VIP'},
      {text: 'Terasa Bucatarie'},
      {text: 'Terasa Cuptor'}
    ],
    image: "src/assets/solnegru2.jpg",
    buttonText: "Menu and Wine List"
  },
  {
    id: 9,
    title: "Entrance",
    list: [
      {text: 'Capacity: 16 pax'},
      {text: 'Style: traditional with a Balkan twist'}
    ],
    image: "src/assets/entrance.jpg"
  },
  {
    id: 10,
    title: "Left Room",
    list: [
      {text: 'Capacity: 26 pax'},
      {text: 'Area: 26 m2'},
      {text: 'Style: traditional, rustic'}
    ],
    image: "src/assets/leftroom.jpg"
  },
  {
    id: 11,
    title: "Right Room",
    list: [
      {text: 'Capacity: 40 pax'},
      {text: 'Area: 51 m2'},
      {text: 'Style: warm and colourful, decorated with carpets and rustic elements'}
    ],
    image: "src/assets/rightroom.jpg"
  },
  {
    id: 12,
    title: "SOL NEGRU Terrace",
    list: [
      {text: 'Capacity: 80 pax'},
      {text: 'Area: 176 m2'},
      {text: 'Style: traditional rustic'}
    ],
    image: "src/assets/terrace.jpeg"
  },
  {
    id: 13,
    title: "2nd Floor",
    list: [
      {text: 'Capacity: 100 pax'},
      {text: 'Style: traditional rustic'}
    ],
    image: "src/assets/2ndfloor.jpg"
  },
  {
    id: 14,
    title: "Terasa de la Salcâmi (Acacia Terrace)",
    list: [
      {text: 'Capacity: 50 pax'},
      {text: 'Style: on the grass, under the shadow of the acacias'}
    ],
    image: "src/assets/accacia.jpg"
  }
];
</script>

<template>

  <ClientNavbar/>
  <ImageComponent :src="restaurant"/>
  <span v-for="card in hallElementsList">
      <TraditionalElement/>
      <HallCard
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