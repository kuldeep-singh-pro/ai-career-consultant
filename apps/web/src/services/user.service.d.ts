import { User } from "../types";
export declare const userService: {
    getCurrentUser(): Promise<User>;
    updateCurrentUser(data: Partial<User>): Promise<User>;
    uploadProfilePicture(file: File): Promise<User>;
    deleteAccount(): Promise<void>;
};
//# sourceMappingURL=user.service.d.ts.map