import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { mentorService } from "../services/mentor.service";

export const useSendMessage = () =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      message,
    }: {
      sessionId: string;
      message: string;
    }) =>
      mentorService.sendMessage(
        sessionId,
        message
      ),

    onSuccess: (_, variables) =>
    {
      queryClient.invalidateQueries({
        queryKey: [
          "mentor",
          "history",
          variables.sessionId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "mentor",
          "sessions",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardStats",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardOverview",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardProgress",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardSkills",
        ],
      });
    },
  });
};


export const useMentorHistory = (
  sessionId: string,
  limit: number = 50,
  enabled: boolean = true
) =>
{
  return useQuery({
    queryKey: [
      "mentor",
      "history",
      sessionId,
    ],

    queryFn: () =>
      mentorService.getMessageHistory(
        sessionId,
        limit
      ),

    enabled:
      enabled && !!sessionId,
  });
};


export const useMentorSessions = (
  enabled: boolean = true
) =>
{
  return useQuery({
    queryKey: [
      "mentor",
      "sessions",
    ],

    queryFn:
      mentorService.getSessions,

    enabled,
  });
};


export const useClearMentorSession =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      mentorService.clearSession,

    onSuccess: () =>
    {
      queryClient.invalidateQueries({
        queryKey: [
          "mentor",
          "sessions",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "mentor",
          "history",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardStats",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardOverview",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardProgress",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboardSkills",
        ],
      });
    },
  });
};