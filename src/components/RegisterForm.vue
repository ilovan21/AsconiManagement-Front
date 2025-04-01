<script setup>
import {ref, computed, defineProps, defineEmits} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useUserStore } from '@/stores/userStore.js';

const props = defineProps({
  dialog: { type: Boolean, required: true }
});
const emit = defineEmits(["update:dialog"]);

const userStore = useUserStore();
const showPassword = ref(false);

const loginData = ref({
  email: "",
  password:"",
  remember:""
});

const loginRules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}));

const rules = computed(() => ({
  nameSurname: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  phone: { required, minLength: minLength(10) },
}));

const vLogin = useVuelidate(loginRules, loginData);

const message=ref(null);
const errorLoginMessage=ref(null);
const login = async () => {
  const isValid = await vLogin.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }
  try {
    const requestLogin = {
      email: loginData.value.email,
      password: loginData.value.password,
      remember:loginData.value.remember
    };

    const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        requestLogin
    );
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("phone", response.data.telephone);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("token", response.data.token);
    console.log("Login successful, redirecting...");

    userStore.setUser(response.data.name, response.data.email, response.data.role, response.data.token);

    await new Promise((resolve) => setTimeout(resolve, 100));
    if (response.data.role === "ROLE_ADMIN") {
      router.push("/listing/restaurant");
    } else if (response.data.role === "ROLE_HOSTESS") {
      router.push("/list");
    } else if (response.data.role === "ROLE_PERSONNEL") {
      router.push("/reservation");
    } else {
      router.push("/");
    }
  } catch (error) {
    message.value = true;
    errorLoginMessage.value ="Incorrect email or password;"
    console.error("Login error:", error);
  }
};

</script>

<template>
  <v-row class="auth-container" no-gutters>
    <v-col class="custom-col centered-content">
      <div class="col-text">
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="pa-0" elevation="0">
        <v-card-title class="text-h5">Connexion</v-card-title>
        <v-card-text elevation="0">
          <v-form>
            <v-text-field
                label="Email"
                v-model="loginData.email"
                variant="outlined"
                required
                :error-messages="vLogin.email.$errors.map(e => e.$message)"
            ></v-text-field>
            <v-text-field
                label="Parole"
                v-model="loginData.password"
                variant="outlined"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                required
                :error-messages="vLogin.password.$errors.map(e => e.$message)"
            ></v-text-field>
            <div v-if="errorLoginMessage" class="errorMessage">
              <p>{{errorLoginMessage}}</p>
            </div>
            <v-checkbox label="Mémoriser mes informations" v-model="loginData.remember"></v-checkbox>
            <v-btn class="custom-button" @click="login">Se connecter</v-btn>
            <p class="mt-2 text-caption text-start">
            </p>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.text-h5{
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: 200;
  margin-top: 15px;
  margin-bottom: 15px;
}
.auth-container {
  background-color: white;
  width: 650px;
  height: 430px;
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  background-size: contain;
  box-sizing: border-box;
}
.custom-button {
  min-width: fit-content;
  padding: 35px 25px;
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
a {
  color: #b9523b;
}
.custom-col{
  filter: brightness(75%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  margin: 0px;
  padding: 0px;
  background: url("@/assets/form2.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
}
.errorMessage{
  padding: 0px;
  font-size: 12px;
  margin-left: 15px;
  color: rgba(185, 82, 59, 0.85);
}
.col-text{
  filter: brightness(100%);
  color: white;
}
</style>