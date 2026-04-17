import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
export const useDashboardStats = (enabled = true) => {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: dashboardService.getStats,
        enabled,
    });
};
export const useDashboardOverview = (enabled = true) => {
    return useQuery({
        queryKey: ["dashboardOverview"],
        queryFn: dashboardService.getOverview,
        enabled,
    });
};
export const useDashboardProgress = (enabled = true) => {
    return useQuery({
        queryKey: ["dashboardProgress"],
        queryFn: dashboardService.getProgress,
        enabled,
    });
};
export const useDashboardSkillsAnalytics = (enabled = true) => {
    return useQuery({
        queryKey: ["dashboardSkills"],
        queryFn: dashboardService.getSkillsAnalytics,
        enabled,
    });
};
