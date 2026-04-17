import axiosInstance from "../api/axiosInstance";
export const skillGapService = {
    async generateSkillGap(targetRole) {
        const response = await axiosInstance.post("/skillgap/analyze", {
            targetRole
        });
        return response.data.data;
    },
    async getSkillGap() {
        const response = await axiosInstance.get("/skillgap/analysis");
        return response.data.data;
    },
    async deleteSkillGap() {
        const response = await axiosInstance.delete("/skillgap/analysis");
        return response.data.data;
    }
};
