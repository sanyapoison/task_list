<template>
  <v-container class="centered-content">
    <v-row class="justify-center">
      <h1>404 - Page Not Found</h1>
    </v-row>
    <v-row class="justify-center">
      <router-link to="/">Go to Home</router-link>
    </v-row>

    <!-- Всплывающее уведомление, если нужно -->
    <v-snackbar v-model="snackbar" color="red" timeout="3000" top right>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "Page not found!",
      snackbar: true, // Сразу показываем уведомление
    };
  },
};
</script>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding: 16px;
}
</style>
