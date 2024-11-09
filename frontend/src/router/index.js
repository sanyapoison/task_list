// frontend/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import UserLogin from "../components/UserLogin.vue";
import UserRegister from "../components/UserRegister.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
    { path: "/", component: TaskList, meta: { requiresAuth: true } },
    { path: "/login", component: UserLogin },
    { path: "/register", component: UserRegister },
    { path: "/:pathMatch(.*)*", component: NotFound }, // Для всех других страниц
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Ограничение доступа для неавторизованных пользователей
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
        next("/");
    } else {
        next();
    }
});

export default router;
