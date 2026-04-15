import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  settingsService
} from "../services/settings.service";

export const useSettings =
(
  enabled: boolean = true
) =>
{
  return useQuery({
    queryKey: ["settings"],
    queryFn:
      settingsService.getSettings,
    enabled
  });
};

export const useUpdateSettings =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      settingsService.updateSettings,

    onSuccess:
      (response) =>
      {
        queryClient.setQueryData(
          ["settings"],
          response
        );
      }
  });
};

export const useResetSettings =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      settingsService.resetSettings,

    onSuccess:
      (response) =>
      {
        queryClient.setQueryData(
          ["settings"],
          response
        );
      }
  });
};

export const useDeleteAccount =
() =>
{
  return useMutation({
    mutationFn:
      settingsService.deleteAccount
  });
};

export const useSettingsSummary =
(
  enabled: boolean = true
) =>
{
  return useQuery({
    queryKey:
      ["settings", "summary"],

    queryFn:
      settingsService.getSummary,

    enabled
  });
};