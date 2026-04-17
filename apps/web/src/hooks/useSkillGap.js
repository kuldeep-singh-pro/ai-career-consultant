import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillGapService } from "../services/skillgap.service";
export const useSkillGap = (enabled = true) => {
    return useQuery({
        queryKey: ["skillgap"],
        queryFn: skillGapService.getSkillGap,
        enabled,
        staleTime: 0
    });
};
export const useGenerateSkillGap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: skillGapService.generateSkillGap,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["skillgap"]
            });
            queryClient.invalidateQueries({
                queryKey: ["skillgap"]
            });
            queryClient.refetchQueries({
                queryKey: ["skillgap"]
            });
        }
    });
};
export const useDeleteSkillGap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: skillGapService.deleteSkillGap,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["skillgap"]
            });
        }
    });
};
