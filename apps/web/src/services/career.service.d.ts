export declare const careerService: {
    generateCareerPath(): Promise<any>;
    generateQuickCareerPath(role: string): Promise<any>;
    generateRoadmap(): Promise<any>;
    getLatestCareerPath(): Promise<any>;
    getCareerPathsWithProgress(): Promise<any>;
    getCareerPath(pathId: string): Promise<any>;
    deleteCareerPath(pathId: string): Promise<any>;
    updateMilestone(careerPathId: string, milestoneIndex: number, completed: boolean): Promise<any>;
    updateResource(careerPathId: string, resourceIndex: number, completed: boolean): Promise<any>;
    updateStatus(careerPathId: string, status: string): Promise<any>;
    refreshProgress(careerPathId: string, progress: number): Promise<any>;
};
//# sourceMappingURL=career.service.d.ts.map