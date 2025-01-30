import { createContext, useContext, useState } from "react";
import { authService } from "~/services/authService";

const AuthContext = createContext({});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const login = async (credentials: any) => {
    const userData = await authService.login(credentials);
    setUser(userData?.user);
    setIsAuthenticated(true);
    return userData;
  };

  const guestLogin = async () => {
    const userData = await authService.guestLogin();
    setUser(userData?.user);
    setIsAuthenticated(true);
    return userData;
  };

  const register = async (userData: any) => {
    const response = await authService.register(userData);
    setUser(response?.user);
    setIsAuthenticated(true);
    return response;
  };

  const logout = async () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, guestLogin }}>{children}</AuthContext.Provider>;
}

export const useAuth = useContext(AuthContext);
