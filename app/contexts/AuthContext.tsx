import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "~/services/authService";

export const AuthContext = createContext<any>({});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") as string);
    if (localUser) {
      setUser(localUser);
      setIsAuthenticated(!!authService.getCurrentUser());
    }
  }, []);

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
    setUser({});
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, guestLogin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
