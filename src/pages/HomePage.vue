<script setup>
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";
import ImageComponent from "@/components/ImageComponent.vue";
import homeImage from "@/assets/asconi.jpg";
import TraditionalElement from "@/components/TraditionalElement.vue";
import ServiceCard from "@/components/ServiceCard.vue";
import HomePageElement from "@/components/HomePageElement.vue";

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
               description="Wine, food, and hospitality runs through the veins of every Moldovan, however for us it has a separate place in our hearts. For us this is more than just a business, it’s the fruit of our passion and hard work. Every single bottle, dish and the entire atmosphere within, is created with love. We strive for the highest quality of wine, mouthwatering meals and warmest welcomes.
As Vince Lombardi once said “Perfection is not attainable but if we chase perfection we can catch excellence!”">
  </HomePageElement>
  <TraditionalElement/>
  <HomePageElement
      title="The Production"
      image="src/assets/tour.jpg"
      description="Using the latest Italian technology, Asconi Winery has a production of over 3 million bottles per year, focusing mainly on white and red wines. The winery also produces roses, sparkling and dessert wines in more exclusive productions.
Stainless steel tanks for both fermentation and storage that can hold up to 30,000, 60,000 and 150,000 liters each, juice concentrator*, a state-of-the-art bottling line with a speed of 8,000 bottles per hour – all these add to the quality of our wines."
      additional-info="*A juice concentrator is used to produce concentrated juice from the grapes in order to produce semi dry, semi sweet and sweet wines."></HomePageElement>
  <TraditionalElement/>
  <h2 class="text"></h2>
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
  padding: 10px;
}
</style>
