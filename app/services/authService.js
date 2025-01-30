import api from "../utils/api.ts";

export const authService = {
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  login: async (credentials) => {
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
};
