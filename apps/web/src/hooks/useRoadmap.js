import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { careerService } from "../services/career.service";
export const useGenerateRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: careerService.generateRoadmap,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["career", "paths"],
            });
            queryClient.invalidateQueries({
                queryKey: ["career", "latest"],
            });
        },
    });
};
