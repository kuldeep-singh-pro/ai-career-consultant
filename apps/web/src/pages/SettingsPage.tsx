import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useSettings,
  useUpdateSettings,
  useDeleteAccount,
  useResetSettings,
  useSettingsSummary,
} from "../hooks/useSettings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const SettingsPage: React.FC = () => {
  const { data: settings, isPending } =
    useSettings();

  const { data: summary } =
    useSettingsSummary();

  const { mutate: updateSettings, isPending: isUpdating } =
    useUpdateSettings();

  const { mutate: resetSettings } =
    useResetSettings();

  const { mutate: deleteAccount, isPending: isDeleting } =
    useDeleteAccount();

  const { logout } =
    useAuthContext();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState<any>({
      theme: "auto",
      language: "en",
      timezone: "Asia/Kolkata",
      privacy: {
        profileVisibility: "private",
        showEmail: false,
        showPhone: false,
      },
    });

  useEffect(() => {
    if (!settings) return;

    setFormData({
      theme:
        settings.preferences?.theme ??
        "auto",

      language:
        settings.preferences?.language ??
        "en",

      timezone:
        settings.preferences?.timezone ??
        "Asia/Kolkata",

      privacy:
        settings.privacy ?? {
          profileVisibility: "private",
          showEmail: false,
          showPhone: false,
        },
    });
  }, [settings]);

  if (isPending)
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-slate-700 dark:text-slate-300">
          Loading settings...
        </div>
      </DashboardLayout>
    );

  const handleUpdate =
    (field: string, value: any) => {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handlePrivacyUpdate =
    (field: string, value: any) => {
      setFormData((prev: any) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [field]: value,
        },
      }));
    };

  const handleSave = () => {
    updateSettings({
      preferences: {
        theme: formData.theme,
        language: formData.language,
        timezone: formData.timezone,
      },
      privacy: formData.privacy,
    });
  };

  const handleReset = () => {
    resetSettings(undefined, {
      onSuccess: () =>
        window.location.reload(),
    });
  };

  const handleDeleteAccount =
    () => {
      if (
        window.confirm(
          "Delete your account permanently?"
        )
      ) {
        deleteAccount(undefined, {
          onSuccess: () => {
            logout();
            navigate("/");
          },
        });
      }
    };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto text-slate-900 dark:text-white">

        <h1 className="text-3xl font-bold mb-8">
          Settings
        </h1>

        {summary && (
          <div className="mb-6 bg-blue-50 dark:bg-slate-800 rounded-lg p-4 text-sm">
            Settings configured:{" "}
            {summary.isConfigured
              ? "Yes"
              : "No"}
          </div>
        )}

        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-4">
              Appearance
            </h2>

            <select
              value={
                formData.theme ??
                "auto"
              }
              onChange={(e) =>
                handleUpdate(
                  "theme",
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-2"
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>

              <option value="auto">
                Auto
              </option>
            </select>
          </div>


          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-4">
              Language
            </h2>

            <select
              value={
                formData.language ??
                "en"
              }
              onChange={(e) =>
                handleUpdate(
                  "language",
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-2"
            >
              <option value="en">
                English
              </option>

              <option value="hi">
                Hindi
              </option>
            </select>
          </div>


          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-4">
              Timezone
            </h2>

            <input
              value={
                formData.timezone ??
                "Asia/Kolkata"
              }
              onChange={(e) =>
                handleUpdate(
                  "timezone",
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-2"
            />
          </div>


          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-4">
              Privacy
            </h2>

            <select
              value={
                formData.privacy
                  ?.profileVisibility ??
                "private"
              }
              onChange={(e) =>
                handlePrivacyUpdate(
                  "profileVisibility",
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-2 mb-4"
            >
              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>
            </select>

            <label className="flex gap-2 items-center mb-2">
              <input
                type="checkbox"
                checked={
                  formData.privacy
                    ?.showEmail ??
                  false
                }
                onChange={(e) =>
                  handlePrivacyUpdate(
                    "showEmail",
                    e.target.checked
                  )
                }
              />
              Show Email
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={
                  formData.privacy
                    ?.showPhone ??
                  false
                }
                onChange={(e) =>
                  handlePrivacyUpdate(
                    "showPhone",
                    e.target.checked
                  )
                }
              />
              Show Phone
            </label>
          </div>


          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex gap-4 transition-colors">

            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isUpdating
                ? "Saving..."
                : "Save"}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              onClick={
                handleDeleteAccount
              }
              disabled={isDeleting}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {isDeleting
                ? "Deleting..."
                : "Delete Account"}
            </button>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};