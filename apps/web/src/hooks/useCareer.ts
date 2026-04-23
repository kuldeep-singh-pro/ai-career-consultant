import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { careerService } from "../services/career.service";

const refreshDashboard = async (queryClient: any) => {
  await queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
  await queryClient.invalidateQueries({ queryKey: ["dashboardProgress"] });
  await queryClient.invalidateQueries({ queryKey: ["dashboardOverview"] });
};

export const useGenerateCareerPath = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: careerService.generateCareerPath,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      await queryClient.invalidateQueries({ queryKey: ["career", "paths"] });

      await refreshDashboard(queryClient);
    },
  });
};

export const useGenerateQuickCareerPath = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role: string) => careerService.generateQuickCareerPath(role),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      await queryClient.invalidateQueries({ queryKey: ["career", "paths"] });

      await refreshDashboard(queryClient);
    },
  });
};

export const useGenerateRoadmap = () => {
  return useMutation({
    mutationFn: careerService.generateRoadmap,
  });
};

export const useLatestCareerPath = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "latest"],
    queryFn: careerService.getLatestCareerPath,
    enabled,
  });
};

export const useCareerPaths = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "paths"],
    queryFn: careerService.getCareerPathsWithProgress,
    enabled,
  });
};

export const useCareerPathDetail = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "detail", id],
    queryFn: () => careerService.getCareerPath(id),
    enabled: enabled && !!id,
  });
};

export const useDeleteCareerPath = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: careerService.deleteCareerPath,

    onSuccess: async (_, careerPathId) => {
      await queryClient.invalidateQueries({
        queryKey: ["career", "paths"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["career", "latest"],
      });

      await queryClient.removeQueries({
        queryKey: ["career", "detail", careerPathId],
      });

      await queryClient.removeQueries({
        queryKey: ["career", "latest"],
      });

      await refreshDashboard(queryClient);
    },
  });
};

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      careerPathId,
      milestoneIndex,
      completed,
    }: {
      careerPathId: string;
      milestoneIndex: number;
      completed: boolean;
    }) =>
      careerService.updateMilestone(careerPathId, milestoneIndex, completed),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      await queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      await queryClient.invalidateQueries({
        queryKey: ["career", "detail", variables.careerPathId],
      });

      await refreshDashboard(queryClient);
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      careerPathId,
      status,
    }: {
      careerPathId: string;
      status: string;
    }) => careerService.updateStatus(careerPathId, status),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      await queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      await queryClient.invalidateQueries({
        queryKey: ["career", "detail", variables.careerPathId],
      });

      await refreshDashboard(queryClient);
    },
  });
};

export const useRefreshProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      careerPathId,
      progress,
    }: {
      careerPathId: string;
      progress: number;
    }) => careerService.refreshProgress(careerPathId, progress),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      await queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      await queryClient.invalidateQueries({
        queryKey: ["career", "detail", variables.careerPathId],
      });

      await refreshDashboard(queryClient);
    },
  });
};
