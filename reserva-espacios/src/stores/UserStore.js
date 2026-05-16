import { defineStore } from "pinia";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: getStoredUser(),
    token: localStorage.getItem("token") || null
  }),

  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});
