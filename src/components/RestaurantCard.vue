<script setup>
import { useRouter } from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
defineProps({
  title: { type: String, required: true },
  description: {type:String, required:false},
  list:{type:Array,required:true},
  additionalInfo: { type: String, default: '' },
  image: { type: String, required: true },
  availability:{type:String,required:true},
  contact:{type:String, default:'+373 (0)79988637'},
  buttonText: { type: String, default: 'Make a reservation' },
});

const router = useRouter();

const navigateToHall = (id) => {
  router.push({ path: "/hall", hash: `#${id}` });
};

</script>

<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="6">
        <h2 class="text service-name">{{ title }}</h2>
        <p class="about-text">{{ description }}</p>
        <p class="about-text" v-if="additionalInfo">{{ additionalInfo }}</p>
        <v-list>
          <v-list-item
              v-for="button in list"
              :key="button.id"
              :id="button.hash"
              @click="navigateToHall(button.id)"
              :ripple="false"
              class="hall d-flex align-center"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="circle-chevron-right" style="color: #000000; margin-right: 10px;" />
            </template>
            <v-list-item-content class="list-content">
              <v-list-item-title>{{ button.hall }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="additional-info">
            <template v-slot:prepend>
              <font-awesome-icon :icon="['fas', 'clock']" style="color: #000000; margin-right: 10px;" />
            </template>
            <v-list-item-content class="list-content">
              <v-list-item-title>{{ availability }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="additional-info">
            <template v-slot:prepend>
              <font-awesome-icon :icon="['fas', 'phone']" style="color: #000000;margin-right: 10px;" />
            </template>
            <v-list-item-content class="list-content">
              <v-list-item-title>{{ contact }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn
            class="custom-button"
        >
          {{ "Menu And Wine List" }}
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
  padding: 10px;
}

.text.service-name {
  margin-left: 35px;
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
.additional-info{
  margin-top: 10px;
}
.hall:hover {
  background: none;
  font-weight: normal;
}
</style>