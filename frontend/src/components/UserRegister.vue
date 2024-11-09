<template>
  <v-container max-width="30%">
    <v-card class="pa-3">
      <v-form @submit.prevent="register">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary" block>Register</v-btn>
      </v-form>
    </v-card>

    <!-- Всплывающее уведомление об ошибке -->
    <v-snackbar v-model="snackbar" color="red" timeout="3000" top right>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      snackbar: false,
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://localhost:5000/register", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || "Registration failed";
        this.snackbar = true;
      }
    },
  },
};
</script>
