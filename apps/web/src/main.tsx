import React
from "react";

import ReactDOM
from "react-dom/client";

import App
from "./App";

import "./index.css";

import "./i18n";

import {
  QueryClientProvider
}
from "@tanstack/react-query";

import {
  queryClient
}
from "./lib/queryClient";

import {
  SettingsProvider
}
from "./context/SettingsContext";

import {
  AuthProvider
}
from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);