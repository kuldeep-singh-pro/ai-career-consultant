import {
  createContext,
  useContext,
  useState,
} from "react";

import { User } from "../types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const storedToken =
  localStorage.getItem("token");

const storedUser =
  localStorage.getItem("user");

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] =
    useState<string | null>(storedToken);

  const [user, setUser] =
    useState<User | null>(
      storedUser
        ? JSON.parse(storedUser)
        : null
    );

  const login = (
    newToken: string,
    newUser: User
  ) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
};