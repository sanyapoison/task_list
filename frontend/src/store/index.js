import { createStore } from "vuex";

export default createStore({
    state: {
        isAuthenticated: !!localStorage.getItem("token"),
        userEmail: localStorage.getItem("userEmail") || "",
    },
    mutations: {
        setAuth(state, { isAuthenticated, userEmail }) {
            state.isAuthenticated = isAuthenticated;
            state.userEmail = userEmail;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userEmail = "";
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
        },
    },
    actions: {
        login({ commit }, { token, email }) {
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", email);
            commit("setAuth", { isAuthenticated: true, userEmail: email });
        },
        logout({ commit }) {
            commit("logout");
        },
    },
});
