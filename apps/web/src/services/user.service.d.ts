import { Profile } from "../types";
export declare const userService: {
    getCurrentUser(): Promise<any>;
    updateCurrentUser(data: Partial<Profile>): Promise<any>;
    uploadProfilePicture(file: File): Promise<any>;
    deleteAccount(): Promise<any>;
};
//# sourceMappingURL=user.service.d.ts.map