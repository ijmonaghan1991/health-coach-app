import {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");

    return saved ? JSON.parse(saved) : null;
  });

  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);
  };

  const register = async (formData) => {
    const { data } = await api.post(
      "/auth/register",
      formData
    );

    saveSession(data);
  };

  const login = async (formData) => {
    const { data } = await api.post(
      "/auth/login",
      formData
    );

    saveSession(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}