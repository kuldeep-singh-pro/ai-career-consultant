import {
  createContext,
  useContext,
  useEffect
} from "react";

import {
  useSettings
} from "../hooks/useSettings";

import i18n
from "../i18n";

type SettingsContextType =
{
  theme: string;
  language: string;
  timezone: string;
};

const SettingsContext =
createContext<SettingsContextType>({
  theme: "light",
  language: "en",
  timezone: "Asia/Kolkata"
});

export const SettingsProvider =
({
  children
}:
{
  children: React.ReactNode
}) =>
{
  const {
    data: settings
  }
  =
  useSettings(true);

  const theme =
    settings?.preferences?.theme ??
    "light";

  const language =
    settings?.preferences?.language ??
    "en";

  const timezone =
    settings?.preferences?.timezone ??
    "Asia/Kolkata";

  useEffect(() =>
  {
    const root =
      document.documentElement;

    root.classList.remove(
      "dark"
    );

    if (theme === "dark")
    {
      root.classList.add(
        "dark"
      );
    }

    if (theme === "auto")
    {
      if (
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
      )
      {
        root.classList.add(
          "dark"
        );
      }
    }

  }, [
    settings?.preferences?.theme
  ]);

  useEffect(() =>
  {
    if (
      language &&
      i18n.language !== language
    )
    {
      i18n.changeLanguage(
        language
      );
    }

  }, [
    settings?.preferences?.language
  ]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        timezone
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext =
() =>
useContext(
  SettingsContext
);