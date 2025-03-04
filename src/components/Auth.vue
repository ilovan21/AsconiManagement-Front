<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router/index.js";
const loginData = ref({
  email: "",
  password: "",
  remember: false,
});

const registerData = ref({
  nameSurname: "",
  email: "",
  password: "",
  phone: ""
});

const register = async () => {
  if (!registerData.nameSurname || !registerData.email || !registerData.password || !registerData.phone) {
    console.error('Please fill all fields');
    alert('All fields are required!');
    return;
  }

  try {
    const requestData = {
      name: registerData.nameSurname,
      email: registerData.email,
      password: registerData.password,
      telephone: registerData.phone
    };

    const response = await axios.post('http://localhost:8080/api/auth/signup', requestData);
    console.log('Registration successful:', response.data);
    router.push('/');
  } catch (error) {
    console.error('Registration error: ', error);
  }
};

</script>

<template>
  <v-container fluid class="auth-container">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="3">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Email"
                  v-model="loginData.email"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-text-field
                  label="Password"
                  v-model="loginData.password"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-checkbox label="Remember me" v-model="loginData.remember"></v-checkbox>
              <v-btn class="custom-button">Log In</v-btn>
              <p class="mt-2 text-caption text-start">
                <a href="#">Lost your password?</a>
              </p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="3">
          <v-card-title class="text-h5">Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Name Surname"
                  v-model="registerData.nameSurname"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-text-field
                  label="Email"
                  v-model="registerData.email"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-text-field
                  label="Phone"
                  v-model="registerData.phone"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-text-field
                  label="Password"
                  v-model="registerData.password"
                  variant="outlined"
                  required
              ></v-text-field>
              <v-btn class="custom-button" @click="register">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-h5{
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-weight: 200;
}
.auth-container {
  background: url("@/assets/asconi.jpg") no-repeat center center;
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}
.custom-button {
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
a {
  color: #b9523b;
}
</style>

