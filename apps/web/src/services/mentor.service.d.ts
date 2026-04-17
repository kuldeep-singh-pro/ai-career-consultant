export declare const mentorService: {
    sendMessage(sessionId: string, message: string): Promise<any>;
    getMessageHistory(sessionId: string, limit?: number): Promise<any>;
    getSessions(): Promise<any>;
    clearSession(sessionId: string): Promise<any>;
    getChatContext(): Promise<any>;
};
//# sourceMappingURL=mentor.service.d.ts.map