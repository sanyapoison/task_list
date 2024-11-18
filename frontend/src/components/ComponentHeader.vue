<template>
  <v-app-bar app fixed>
    <v-toolbar-title>Task App</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isAuthenticatedHead">
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
  data() {
    return {
      isAuthenticatedHead: false,
      userEmailHead: "",
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "userEmail"]),
  },
  created() {
    // Подписываемся на изменения Vuex
    this.$store.subscribe((mutation, state) => {
      console.log("isAuthenticated updated:", state.isAuthenticated);
      if (mutation.type === "logout" || mutation.type === "setAuth") {
        this.isAuthenticatedHead = state.isAuthenticated;

        if (this.isAuthenticatedHead) {
          this.userEmailHead = state.userEmail;
        }else{
          this.$router.push("/login");
        }
      }
    });
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
