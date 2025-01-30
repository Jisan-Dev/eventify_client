import api from "../utils/api.js";

export const authService = {
  register: async (userData: any) => {
    const { data } = await api.post("/auth/register", userData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  login: async (credentials: any) => {
    const { data } = await api.post("/auth/login", credentials);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  guestLogin: async () => {
    const { data } = await api.post("/auth/guest-login");
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user") as string);
  },
};
