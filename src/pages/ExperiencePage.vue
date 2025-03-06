<script setup>
import experiences from "@/assets/experiences.jpg"
import element from "@/assets/traditional-element.png"
import ImageComponent from "@/components/ImageComponent.vue";
import ServiceCard from '@/components/ServiceCard.vue'
import ClientNavbar from "@/components/ClientNavbar.vue";
import ClientFooter from "@/components/ClientFooter.vue";

</script>

<template>
  <ClientNavbar/>
  <ImageComponent :src="experiences" />
  <v-img
      class="mx-0 align-center"
      :src="element"
      contain
  ></v-img>
  <h2 class="text">Experiences &amp; Activities</h2>
  <p>From our passion for hospitality was born the idea to develop the tourist part of the winery.
    Our goal is to keep rural traditions intact, while maintaining the standards and new trends of wine tourism.</p>
  <v-img
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
  <ServiceCard
      title="Wine Tour"
      description="Have you ever seen the heat of wine making? Is rosé wine a mix of white and red wines? What is the difference between coupage and cepage? Why does Ice Wine have such intense aroma and taste? Book a tour around our winery and you will find the answers to all these questions and much more."
      additionalInfo="The tour is guided and lasts 30 minutes."
      buttonText="Make A Reservation"
      image="src/assets/tour.jpg"
  />
  <v-img
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
  <ServiceCard
      title="Wine Tasting"
      description="Have you ever seen the heat of wine making? Is rosé wine a mix of white and red wines? What is the difference between coupage and cepage? Why does Ice Wine have such intense aroma and taste? Book a tour around our winery and you will find the answers to all these questions and much more."
      additionalInfo="The tour is guided and lasts 30 minutes."
      buttonText="Make A Reservation"
      image="src/assets/tasting.jpg"
  />
  <v-img
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
  <ServiceCard
      title="Baking Workshop"
      description="One of the best things about Moldova is our plăcinta which is a sweet or savoury pastry with fillings that vary from pumpkin to cottage cheese, potatoes and many more. Here at Asconi we are known for our mouthwatery, flaky and just melt in your mouth plăcintas."
      additionalInfo="Book your baking masterclass now, so that you can make your own plăcinta later!"
      buttonText="Make A Reservation"
      image="src/assets/baking.jpg"
  />
  <v-img
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
  <ServiceCard
      title="Wine Art"
      description="Did you know that wine painting is considered one of the most unpredictable forms of art? The color ranges offered by wines cannot be imitated by any other pigment!
Book now and discover this unique art form with Vasile Botnaru! And the best part, you get to take home a bottle of wine with the label painted by none other than you!"
      additionalInfo=""
      buttonText="Make A Reservation"
      image="src/assets/wine-art.jpeg"
  />
  <v-img
      class="mx-0 align-center mt-1"
      :src="element"
      contain
  ></v-img>
  <h2 class="text-bottom">More infos at asconi@winery.md</h2>
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
.about-text{
  margin-top: 25px;
  text-align: justify;
  margin-left: 40px;
  margin-right: 50px;
}
.custom-button {
  margin-top: 80px;
  margin-left:40px ;
  min-width: fit-content;
  padding: 40px 30px;
  color: #b9523b;
  font-size: 17px;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-width: 1px;
  border-color: #b9523b;
  border-radius: 0px;
}
</style>