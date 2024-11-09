<template>
  <v-app>
    <ComponentHeader />
    <v-main>
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ref, provide } from "vue";
import ComponentHeader from "./components/ComponentHeader.vue"; // Убедитесь, что путь правильный

export default {
  name: "App",
  components: {
    ComponentHeader,
  },
  setup() {
    const isAuthenticated = ref(!!localStorage.getItem("token"));
    provide("isAuthenticated", isAuthenticated);

    return {
      isAuthenticated,
    };
  },
};
</script>

<style>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding-top: 16px;
}
</style>
