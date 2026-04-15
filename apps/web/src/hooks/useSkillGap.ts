import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillGapService } from "../services/skillgap.service";

export const useGenerateSkillGap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetRole: string) =>
      skillGapService.generateSkillGap(targetRole),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillgap"] });
    },
  });
};

export const useSkillGap = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["skillgap"],
    queryFn: skillGapService.getSkillGap,
    enabled,
  });
};