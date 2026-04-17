import { UserSettings } from "../types";
export declare const settingsService: {
    getSettings(): Promise<UserSettings>;
    updateSettings(data: Partial<UserSettings>): Promise<any>;
    getSummary(): Promise<any>;
    deleteAccount(): Promise<any>;
};
//# sourceMappingURL=settings.service.d.ts.map