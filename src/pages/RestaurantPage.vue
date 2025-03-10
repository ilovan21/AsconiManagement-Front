<script setup>
import restaurant from "@/assets/restaurant.jpg"
import element from "@/assets/traditional-element.png"
import ImageComponent from "@/components/ImageComponent.vue";
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import TraditionalElement from "@/components/TraditionalElement.vue";

</script>

<template>

  <ClientNavbar/>
  <ImageComponent :src="restaurant" />
  <TraditionalElement/>
  <h2 class="text">Restaurants</h2>
  <p>From our passion for hospitality was born the idea to develop the tourist part of the winery.
    Our goal is to keep rural traditions intact, while maintaining the standards and new trends of wine tourism.</p>
<TraditionalElement/>
  74
  <TraditionalElement/>
  <RestaurantCard
      title="Sol Negru Restaurant"
      description="With the aim of showcasing the most authentic Moldovan traditions, the winery’s first restaurant, ASCONI brings you the true heritage, tastes and aromas of Moldova. Together with our kitchen team, we have researched our families’ recipes and compiled our favorites, bringing you authentic tastes, cooked with fresh ingredients and sprinkled with love, just like Grandmother used to make it!"
      additionalInfo="SOL NEGRU restaurant covers a couple of halls and terraces:"
      :list="[
    {hall: 'Casa cu Sobe', action: () => window.location.href = '/hall#1'},
    {hall: 'Cerdac', action: () => window.location.href = '/hall#3'},
    {hall: 'Vinoteca', action: () => window.location.href = '/hall#2'},
    {hall: 'Casa de Vară', action: () => window.location.href = '/hall#4'},
    {hall: 'Terasa de la Cuptor', action: () => window.location.href = '/hall#5'},
    {hall: 'Terasa de la Găini', action: () => window.location.href = '/hall#6'}
  ]"
      image="src/assets/solnegru.jpg"
      availability="Only on weekends, from 11:00 AM to 10:00 PM"
  />

  <TraditionalElement/>
  <ClientFooter/>
</template>

<style scoped>
.text{
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 50px;
  font-weight: 200;
  color: #000000;
  padding:0px 0px 10px;
}
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