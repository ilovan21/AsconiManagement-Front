<script setup>
import ClientNavbar from "@/components/pageElements/ClientNavbar.vue";
import ClientFooter from "@/components/pageElements/ClientFooter.vue";
import ImageComponent from "@/components/pageElements/ImageComponent.vue";
import homeImage from "@/assets/asconi.jpg";
import TraditionalElement from "@/components/pageElements/TraditionalElement.vue";
import ServiceCard from "@/components/tourism/service/ServiceCard.vue";
import HomePageElement from "@/components/pageElements/HomePageElement.vue";

</script>

<template>
  <ClientNavbar/>
  <ImageComponent :src="homeImage" />
  <TraditionalElement/>
  <h2 class="text">Asconi Winery</h2>
  <TraditionalElement/>
  <HomePageElement
               title="Asconi Winery"
               image="src/assets/asconi-winery-home.png"
               description="Le vin, la nourriture et l'hospitalité coulent dans les veines de chaque Moldave, mais pour nous, cela occupe une place particulière dans nos cœurs. Pour nous, c'est bien plus qu'un simple commerce, c'est le fruit de notre passion et de notre travail acharné. Chaque bouteille, chaque plat et toute l'atmosphère qui y règne sont créés avec amour. Nous visons la plus haute qualité de vin, des repas savoureux et un accueil chaleureux.
Comme l'a dit Vince Lombardi : La perfection n'est pas atteignable, mais si nous poursuivons la perfection, nous pourrons atteindre l'excellence !">
  </HomePageElement>
  <TraditionalElement/>
  <HomePageElement
      title="La Production"
      image="src/assets/tour.jpg"
      description="Utilisant la dernière technologie italienne, la cave Asconi produit plus de 3 millions de bouteilles par an, se concentrant principalement sur les vins blancs et rouges. La cave produit également des rosés, des vins effervescents et des vins de dessert dans des productions plus exclusives.
Des cuves en inox pour la fermentation et le stockage, un concentrateur de jus*, une ligne de mise en bouteille à la pointe de la technologie avec une capacité de 8 000 bouteilles par heure – tous ces éléments contribuent à la qualité de nos vins."
      additional-info="*Un concentrateur de jus est utilisé pour produire du jus concentré à partir des raisins afin de produire des vins demi-secs, demi-doux et doux."></HomePageElement>
  <TraditionalElement/>
  <h2 class="text"> “La perfection est inatteignable, mais en poursuivant la perfection, nous pouvons atteindre l’excellence!”</h2>
  <TraditionalElement/>
  <HomePageElement
      title="Passion Familiale"
      image="src/assets/as.jpg"
      description="La cave Asconi est une entreprise familiale fondée en 1994, qui vise à produire le meilleur vin possible en utilisant les dernières technologies, tout en préservant les traditions locales.
En tant qu'entreprise familiale, la cave Asconi est notre maison, les habitants sont notre communauté et les traditions locales, notre héritage. C'est avec enthousiasme que nous partageons notre maison avec vous."
      additional-info="Visitez notre cave, découvrez nos vins, goûtez notre cuisine et partagez notre succès et nos réalisations avec nous, car peu importe d'où vous venez, vous aurez toujours une maison à la cave Asconi.."></HomePageElement>
<TraditionalElement/>
  <ClientFooter/>
</template>
<style scoped>
.text{
  margin-left: 200px;
  margin-right: 200px;
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 50px;
  font-weight: 200;
  color: #000000;
  padding: 10px;
}
</style>
