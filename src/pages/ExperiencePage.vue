<script setup>
import experiences from "@/assets/experiences.jpg"
import element from "@/assets/traditional-element.png"
import ImageComponent from "@/components/ImageComponent.vue";
import ServiceCard from '@/components/ServiceCard.vue'
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import TraditionalElement from "@/components/TraditionalElement.vue";

</script>

<template>
  <ClientNavbar/>
  <ImageComponent :src="experiences" />
  <TraditionalElement/>
  <h2 class="text">Expériences &amp; Activités</h2>
  <p>De notre passion pour l'hospitalité est née l'idée de développer la partie touristique du domaine.
    Notre objectif est de préserver les traditions rurales, tout en conservant les standards et les nouvelles tendances de l'œnotourisme.</p>
  <TraditionalElement/>
  <ServiceCard
      id="1"
      title="Visite du crame"
      description="Avez-vous déjà vu la chaleur de la vinification? Le rosé est-il un mélange de vins blancs et de vins rouges ? Quelle est la différence entre coupage et cépage ? Pourquoi le vin de glace a-t-il un arôme et un goût si intenses ?
       Réservez une visite de notre domaine et vous trouverez les réponses à toutes ces questions et bien plus encore."
      additionalInfo="La visite est guidée et dure 30 minutes."
      buttonText="Reserver "
      image="src/assets/tour.jpg"
  />
  <TraditionalElement/>
  <ServiceCard
      id="2"
      title="Degustation"
      description="Vous êtes-vous déjà demandé ce qui rend chaque vin unique en termes de goût et d'arôme ?Réservez une séance de dégustation et découvrez le monde fascinant du vin, apprenez les secrets derrière chaque bouteille et explorez
      les accords parfaits qui sublimeront votre expérience culinaire."
      additionalInfo="La dégustation dure un maximum de 45 minutes, en fonction du nombre de vins choisis."
      buttonText="Reserver"
      image="src/assets/tasting.jpg"
  />
<TraditionalElement/>
  <ServiceCard
      id="4"
      title="Atelier de Pâtisserie"
      description="L'un des meilleurs aspects de la Moldavie est notre plăcintă, une pâtisserie sucrée ou salée avec des garnitures variées, allant de la citrouille au fromage cottage, aux pommes de terre et bien plus encore. Ici, à Asconi, nous sommes connus pour nos
      plăcinte."
      additionalInfo="Réservez dès maintenant votre masterclass de pâtisserie, afin de pouvoir préparer votre propre plăcintă plus tard !"
      buttonText="Reserver"
      image="src/assets/baking.jpg"
  />
<TraditionalElement/>
  <ServiceCard
      id="3"
      title="Art du Vin"
      description="Saviez-vous que la peinture au vin est considérée comme l'une des formes d'art les plus imprévisibles ?
Les gammes de couleurs offertes par les vins ne peuvent être imitées par aucun autre pigment !
Réservez maintenant et découvrez cette forme d'art unique avec Vasile Botnaru ! Et le meilleur dans tout ça,
vous repartirez avec une bouteille de vin dont l'étiquette sera peinte par vous-même !
"
      additionalInfo=""
      buttonText="Reserver"
      image="src/assets/wine-art.jpeg"
  />
<TraditionalElement/>
  <h2 class="text-bottom">Plus d'infos sur asconi@winery.md</h2>
  <ClientFooter/>
</template>

<style scoped>
.text{
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 50px;
  font-weight: 200;
  color: #000000;
  padding: 10px;
}
.text-bottom{
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 25px;
  font-weight: 200;
  color: #000000;
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