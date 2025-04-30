<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  id:{type:String,required :true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String, default: '' },
  buttonText: { type: String, default: 'Reserver un place' },
  image: { type: String, required: true },
});

function redirectToReservation(serviceId,serviceTitle,image) {
  router.push({ name: 'ServiceReservationPage',
    params: { id: serviceId },
    query: { title: serviceTitle , imagePath: encodeURIComponent(image)} });
}
</script>
<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col>
        <h2 class="text service-name">{{ title }}</h2>
        <p class="about-text">{{ description }}</p>
        <p class="about-text" v-if="additionalInfo">{{ additionalInfo }}</p>
        <v-btn
            @click="redirectToReservation(id, title, image)"
            class="custom-button"
        >
          {{ buttonText }}
        </v-btn>
      </v-col>
      <v-col>
        <v-img
            class="mt-3 align-center mt-1"
            :src="image"
            contain
            width="500"
            height="490"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text {
  text-align: center;
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 50px;
  font-weight: 200;
  color: #000000;
  padding: 10px;
}

.text.service-name {
  margin-left: 35px;
  text-align: left;
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

.about-text {
  margin-top: 25px;
  text-align: justify;
  margin-left: 40px;
  margin-right: 50px;
}

.custom-button {
  margin-top: 80px;
  margin-left: 40px;
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

