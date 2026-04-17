import axiosInstance from "../api/axiosInstance";
export const userService = {
    async getCurrentUser() {
        const response = await axiosInstance.get("/user/me");
        return response.data.data;
    },
    async updateCurrentUser(data) {
        const response = await axiosInstance.patch("/user/me", data);
        return response.data.data;
    },
    async uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append("profilePicture", file);
        const response = await axiosInstance.post("/user/upload-picture", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    },
    async deleteAccount() {
        await axiosInstance.delete("/user/me");
    },
};
