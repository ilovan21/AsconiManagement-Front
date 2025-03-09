<script setup>
import { useRouter } from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const router = useRouter();

defineProps({
  id:{type:String,required :true},
  title: { type: String, required: true },
  description: {type:String, required:false},
  list:{type:Array,required:true},
  additionalInfo: { type: String, default: '' },
  image: { type: String, required: true },
  buttonText: { type: String, default: 'Make A Reservation' },
});

function redirectToReservation(hallId,hallName) {
  router.push({ name: 'RestaurantReservationPage',
    params: { id: hallId },
    query: { title: hallName } });
}
</script>

<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="6">
        <h2 class="text service-name">{{ title }}</h2>
        <v-list>
          <v-list-item
              v-for="(button, index) in list"
              :key="index"
              @click="button.action"
              class=" list d-flex align-center"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="circle-chevron-right" style="color: #000000; margin-right: 10px;" />
            </template>
            <v-list-item-content class="list-content">
              <v-list-item-title>{{ button.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn
            @click="redirectToReservation(id,title)"
            class="custom-button"
        >
          {{ buttonText }}
        </v-btn>
      </v-col>
      <v-col>
        <v-img
            class=" align-center mt-1"
            :src="image"
            cover
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
  padding: 0px 0px 10px;
}
.text.service-name {
  margin-left: 20px;
  text-align: left;
}
.custom-button {
  margin-top: 20px;
  margin-left: 20px;
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
  margin-top: 30px;
  text-align: justify;
  margin-left: 30px;
  margin-right: 10px;
}
.list{
  margin-left: 10px;
}

</style>