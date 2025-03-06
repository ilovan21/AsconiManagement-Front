<script setup>
import { useRouter } from "vue-router";
import { logout } from "@/services/authService.js";

const router = useRouter();

function handleLogout() {
  logout();
  router.push({ name: "auth" });
}
</script>

<template>
  <v-container>
    <h1>Admin Page</h1>
    <v-btn color="red" @click="handleLogout">Logout</v-btn>
  </v-container>
</template>
