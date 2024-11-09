// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch("logout");
            router.push("/login");
        }
        return Promise.reject(error);
    }
);

const app = createApp(App);
app.use(router);
app.use(store); // Подключаем Vuex-хранилище
app.use(vuetify);
app.mount("#app");
