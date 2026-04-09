import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';

export const useDashboardStats = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
    enabled,
  });
};

export const useDashboardOverview = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.getOverview(),
    enabled,
  });
};

export const useDashboardProgress = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dashboard', 'progress'],
    queryFn: () => dashboardService.getProgress(),
    enabled,
  });
};

export const useDashboardSkillsAnalytics = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dashboard', 'skills-analytics'],
    queryFn: () => dashboardService.getSkillsAnalytics(),
    enabled,
  });
};
