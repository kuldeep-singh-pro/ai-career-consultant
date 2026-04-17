import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [token, setToken] = useState(storedToken);
    const [user, setUser] = useState(storedUser
        ? JSON.parse(storedUser)
        : null);
    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    };
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            token,
            isAuthenticated: !!token,
            login,
            logout,
        }, children: children }));
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used inside AuthProvider");
    }
    return context;
};
