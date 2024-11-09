<template>
  <v-container max-width="30%">
    <v-card class="pa-3">
      <v-form @submit.prevent="loginHand">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card>

    <v-snackbar v-model="snackbar" color="red" timeout="3000" top right>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      snackbar: false,
    };
  },
  methods: {
    ...mapActions(["login"]), // Используем login из Vuex
    async loginHand() {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: this.email,
          password: this.password,
        });
        this.login({ token: response.data.access_token, email: this.email });
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || "Login failed";
        this.snackbar = true;
      }
    },
  },
};
</script>
