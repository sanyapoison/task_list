<template>
  <v-container max-width="30%">
    <v-card class="pa-3">
      <!-- Заголовок формы -->
      <v-card-title class="text-h5">Register</v-card-title>
      <v-divider></v-divider>

      <v-form @submit.prevent="register">
        <!-- Поле для ввода email -->
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
        ></v-text-field>

        <!-- Поле для ввода пароля -->
        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
        ></v-text-field>

        <!-- Поле для подтверждения пароля -->
        <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            required
        ></v-text-field>

        <!-- Ошибка, если пароли не совпадают -->
        <v-alert
            v-if="passwordMismatch"
            type="error"
            dense
            class="mb-3"
        >
          Passwords do not match!
        </v-alert>

        <!-- Кнопка отправки -->
        <v-btn
            type="submit"
            color="primary"
            block
            :disabled="passwordMismatch"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>

    <!-- Всплывающее уведомление об ошибке -->
    <v-snackbar
        v-model="snackbar"
        color="red"
        timeout="3000"
        top right
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from '@/config';

export default {
  name: "UserRegister",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      snackbar: false,
    };
  },
  computed: {
    // Проверяем, совпадают ли пароли
    passwordMismatch() {
      return this.password !== this.confirmPassword;
    },
  },
  methods: {
    async register() {
      try {
        if (this.passwordMismatch) {
          this.errorMessage = "Passwords do not match!";
          this.snackbar = true;
          return;
        }

        await axios.post(`${API_BASE_URL}/register`, {
          email: this.email,
          password: this.password,
        });

        // После успешной регистрации перенаправляем на страницу логина
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || "Registration failed";
        this.snackbar = true;
      }
    },
  },
};
</script>
