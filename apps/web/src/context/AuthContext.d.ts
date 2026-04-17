import { User } from "../types";
interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}
export declare const AuthProvider: ({ children, }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useAuthContext: () => AuthContextType;
export {};
//# sourceMappingURL=AuthContext.d.ts.map