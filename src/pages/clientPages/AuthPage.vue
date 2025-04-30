<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import router from "@/router/index.js";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import ClientNavbar from "@/components/pageElements/ClientNavbar.vue";
import ClientFooter from "@/components/pageElements/ClientFooter.vue";
import { useUserStore } from '@/stores/userStore.js';

const userStore = useUserStore();
const showPassword = ref(false);

const loginData = ref({
  email: "",
  password:"",
  remember:""
});
const registerData = ref({
  nameSurname: "",
  email: "",
  password: "",
  phone: "",
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

const v$ = useVuelidate(rules, registerData);
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
    errorLoginMessage.value ="Email or password incorrect!"
    console.error("Login error:", error);
  }
};

const register = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.error("Validation failed!");
    return;
  }

  try {
    const requestData = {
      name: registerData.value.nameSurname,
      email: registerData.value.email,
      password: registerData.value.password,
      telephone: registerData.value.phone,
    };

    const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        requestData
    );
    console.log("Registration successful:", response.data);
    router.push("/");
  } catch (error) {
    console.error("Registration error: ", error);
  }
};
</script>
<template>
  <ClientNavbar />

  <ClientFooter/>
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
.errorMessage{
  padding: 0px;
  font-size: 12px;
  margin-left: 15px;
  color: rgba(185, 82, 59, 0.85);
}
</style>

