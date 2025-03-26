<script setup>
import restaurant from "@/assets/restaurant.jpg"
import ImageComponent from "@/components/ImageComponent.vue";
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import TraditionalElement from "@/components/TraditionalElement.vue";
import {hallList, hallList2} from "@/constants/hallList.js";
</script>

<template>

  <ClientNavbar/>
  <ImageComponent :src="restaurant"/>
  <TraditionalElement/>
  <h2 class="text">Restaurants</h2>
  <p>C'est de notre passion pour l'hospitalité qu'est née l'idée de développer la partie touristique de la cave.
    Notre objectif est de préserver intactes les traditions rurales tout en respectant les standards et les nouvelles tendances de l'œnotourisme.</p>
  <TraditionalElement/>
  <RestaurantCard
      title="Asconi Restaurant"
      description="Dans le but de mettre en valeur les traditions les plus authentiques de la Moldavie,
       le premier restaurant de la cave, ASCONI, vous offre le véritable héritage, les saveurs et les arômes de la Moldavie.
        Nous avons étudié les recettes de nos familles et compilé nos préférées,
        vous apportant des saveurs authentiques, préparées avec des ingrédients frais et saupoudrées d'amour!"
      additionalInfo="Le restaurant ASCONI comprend plusieurs salles et terrasses :"
      :list="hallList"
      image="src/assets/vinoteca.jpg"
      availability="Tous les jours de 11h00 à 22h00"
  />
  <TraditionalElement/>
  <RestaurantCard
      title="Sol Negru Restaurant"
      description="Dans le but de mettre en valeur les traditions les plus authentiques de la Moldavie,
       le premier restaurant de la cave, SOL NEGRU, vous offre le véritable héritage, les saveurs et les arômes de la Moldavie.
        Nous avons étudié les recettes de nos familles et compilé nos préférées,
        vous apportant des saveurs authentiques!"
      additionalInfo="Le restaurant SOL NEGRU comprend plusieurs salles et terrasses :"
      :list= "hallList2"
      image="src/assets/solnegru2.jpg"
      availability="Tous les jours de 11h00 à 22h00"
  />

  <TraditionalElement/>
  <ClientFooter/>
</template>

<style scoped>
.text {
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 50px;
  font-weight: 200;
  color: #000000;
  padding: 0px 0px 10px;
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