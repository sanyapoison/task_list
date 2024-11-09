<template>
  <v-app-bar app fixed>
    <v-toolbar-title>Task App</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isAuthenticated">
      <span>Welcome, {{ userEmail }}</span>
      <v-btn color="primary" @click="logout">Logout</v-btn>
    </div>
    <div v-else>
      <router-link to="/login">
        <v-btn color="primary">Login</v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn color="primary">Register</v-btn>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ComponentHeader",
  computed: {
    ...mapState(["isAuthenticated", "userEmail"]), // Используем состояния из Vuex
  },
  methods: {
    ...mapActions(["logout"]), // Используем экшен для выхода
  },
};
</script>

<style>
.v-app-bar {
  height: 64px;
}
</style>
