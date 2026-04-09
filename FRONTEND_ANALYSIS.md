# CommunityEventFinder Frontend - Complete Architecture Analysis

## Project Overview
- **Repository**: https://github.com/kuldeep-singh-pro/CommunityEventFinder
- **Framework**: React 19.2.4 with TypeScript
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 3.4.19
- **State Management**: TanStack React Query 5.90.21
- **HTTP Client**: Axios 1.13.6
- **Routing**: React Router 7.13.1
- **UI Components**: Radix UI with custom components
- **Icons**: Lucide React 0.576.0
- **Animations**: Framer Motion 12.34.5

---

## 1. EXACT FOLDER HIERARCHY (src/ Structure)

```
FRONTEND/
├── src/
│   ├── main.tsx                    # Entry point with providers
│   ├── index.css                   # Tailwind + global styles
│   ├── app/
│   │   └── router.tsx              # Router configuration with all routes
│   ├── pages/
│   │   ├── Landing/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── Events/
│   │   │   ├── EventList.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── CreateEvent.tsx
│   │   │   ├── EditEvent.tsx
│   │   │   └── ManageEvent.tsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── MyEvents.tsx
│   │   ├── Calendar/
│   │   │   └── CalendarView.tsx
│   │   ├── Activity/
│   │   │   └── MyActivity.tsx
│   │   └── Profile/
│   │       └── Profile.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── auth/
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── VerificationCard.tsx
│   │   │   └── AnimatedCommunityCard.tsx
│   │   ├── event/
│   │   │   ├── EventCard.tsx
│   │   │   └── EventFilters.tsx
│   │   ├── dashboard/
│   │   │   └── StatCard.tsx
│   │   ├── logo/
│   │   │   └── Logo.tsx
│   │   └── ui/
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── page-pagination.tsx
│   │       └── textarea.tsx
│   ├── services/
│   │   ├── api.ts                  # Axios instance with interceptors
│   │   ├── auth.service.ts
│   │   └── event.service.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useEvents.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   ├── event.types.ts
│   │   └── (user.types.ts optional)
│   └── utils/
│       └── (helper functions)
├── public/
│   └── favicon.ico
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.js
├── index.html
└── components.json
```

---

## 2. AXIOS INSTANCE PATTERN & LOCATION

**File**: `src/services/api.ts`

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Request interceptor - Automatically adds Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

**Key Points**:
- Uses environment variable `VITE_API_URL` for dynamic API URL
- Request interceptor automatically attaches JWT token from localStorage
- Exported as default for easy imports
- Clean, minimal setup with no response interceptor (kept simple for fetch operations)

---

## 3. TANSTACK QUERY HOOKS PATTERN (Naming, Organization)

**Location**: `src/hooks/`

### Pattern for useAuth Hook
**File**: `src/hooks/useAuth.ts`

```typescript
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.service";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!token,  // Only fetch if token exists
  });

  const user = data || (storedUser ? JSON.parse(storedUser) : null);

  return { user, isLoading };
};
```

### Pattern for useEvents Hook
**File**: `src/hooks/useEvents.ts`

```typescript
export default function useEvents() {
  return { events: [] as any[] } as const;
}
```

### Usage Pattern in Pages
**File**: `src/pages/Events/EventList.tsx` (excerpt)

```typescript
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/event.service";

export default function EventList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["events", search, page],  // Query key includes filter params
    queryFn: () =>
      getEvents({
        search,
        page,
        limit: 6,
      }),
  });

  if (isLoading) return <div>Loading events...</div>;

  return (
    <div>
      {/* Render data */}
    </div>
  );
}
```

### Mutation Pattern (Login Example)
**File**: `src/pages/Auth/Login.tsx` (excerpt)

```typescript
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "organizer") {
        navigate("/dashboard");
      } else {
        navigate("/events");
      }
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={mutation.isPending}>
        {mutation.isPending ? "Signing in..." : "Sign In →"}
      </Button>
    </form>
  );
}
```

**Naming Conventions**:
- `useAuth` - For authentication queries
- `useEvents` - For event data queries (can be expanded)
- Query keys follow pattern: `["feature", filterParam1, filterParam2]`
- Always include `isPending` checking for loading states
- `onSuccess` and `onError` callbacks for side effects

---

## 4. SERVICES LAYER STRUCTURE

### Auth Service
**File**: `src/services/auth.service.ts`

```typescript
import api from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "participant" | "organizer";
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const verifyOTP = async (data: {
  email: string;
  code: string;
}) => {
  const response = await api.post("/auth/verify-email", data);
  return response.data;
};

export const resendOTP = async (email: string) => {
  const response = await api.post("/auth/resend-otp", { email });
  return response.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
}) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
```

### Event Service
**File**: `src/services/event.service.ts`

```typescript
import api from "./api";

export const getEvents = async (params?: any) => {
  const res = await api.get("/events", { params });
  return res.data.data;
};

export const getEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`);
  return res.data.data;
};

export const createEvent = async (data: any) => {
  const res = await api.post("/events", data);
  return res.data.data;
};

export const updateEvent = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.put(`/events/${id}`, data);
  return res.data.data;
};

export const closeEvent = async (id: string) => {
  const res = await api.patch(`/events/${id}/close`);
  return res.data.data;
};

export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`);
  return res.data.data;
};

export const joinEvent = async (id: string) => {
  const res = await api.post(`/events/${id}/join`);
  return res.data.data;
};

export const getMyEvents = async () => {
  const res = await api.get("/events/my-events");
  return res.data.data;
};

export const getPopularEvents = async () => {
  const res = await api.get("/events/popular");
  return res.data.data;
};

export const getCalendarEvents = async (month: number, year: number) => {
  const res = await api.get("/events/calendar", {
    params: { month, year },
  });
  return res.data.data;
};

export const approveParticipant = async (
  eventId: string,
  userId: string
) => {
  const res = await api.patch(`/events/${eventId}/approve/${userId}`);
  return res.data.data;
};

export const rejectParticipant = async (
  eventId: string,
  userId: string
) => {
  const res = await api.patch(`/events/${eventId}/reject/${userId}`);
  return res.data.data;
};
```

**Pattern**:
- All service functions are async functions
- Consistent naming: `getX`, `createX`, `updateX`, `deleteX`, `joinX`, etc.
- Always extract `.data.data` from response (backend double wraps)
- Typed parameters for functions
- Simple, pure functions with no state management

---

## 5. COMPONENTS FOLDER ORGANIZATION

**Location**: `src/components/`

### Folder Structure
```
components/
├── layout/
│   ├── MainLayout.tsx      # Main wrapper with Navbar & Footer
│   ├── Navbar.tsx          # Navigation header with auth state
│   ├── Footer.tsx
│   └── ProtectedRoute.tsx  # Auth guard component
├── auth/
│   ├── RegisterForm.tsx
│   ├── VerificationCard.tsx
│   └── AnimatedCommunityCard.tsx
├── event/
│   ├── EventCard.tsx       # Single event card display
│   └── EventFilters.tsx    # Filter/search component
├── dashboard/
│   └── StatCard.tsx        # Statistics display card
├── logo/
│   └── Logo.tsx
└── ui/                     # Radix UI wrapped components
    ├── card.tsx
    ├── button.tsx
    ├── input.tsx
    ├── label.tsx
    ├── select.tsx
    ├── separator.tsx
    ├── page-pagination.tsx
    └── textarea.tsx
```

### Component Pattern - Page Component
**File**: `src/pages/Events/EventList.tsx`

```typescript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import EventCard from "@/components/event/EventCard";
import EventFilters from "@/components/event/EventFilters";
import PagePagination from "@/components/ui/page-pagination";

import { getEvents } from "@/services/event.service";
import { Event } from "@/types/event.types";

export default function EventList() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["events", search, city, type, sort, page],
    queryFn: () =>
      getEvents({
        search,
        city,
        type,
        sort,
        page,
        limit: 6,
      }),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading events...</div>;
  }

  const cities = [
    ...new Set(
      data?.events?.map((e: Event) => e.location?.city).filter(Boolean)
    ),
  ] as string[];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
      <h1 className="text-3xl font-bold">Browse Events</h1>
      <p className="text-muted-foreground mt-2">
        Discover community events around you
      </p>

      <EventFilters
        search={search}
        city={city}
        type={type}
        sort={sort}
        cities={cities}
        onSearchChange={(v) => {
          setPage(1);
          setSearch(v);
        }}
        onCityChange={(v) => {
          setPage(1);
          setCity(v);
        }}
        onTypeChange={(v) => {
          setPage(1);
          setType(v);
        }}
        onSortChange={(v) => {
          setPage(1);
          setSort(v);
        }}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.events?.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No events found
          </div>
        )}

        {data?.events?.map((event: Event, idx: number) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PagePagination
          currentPage={page}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
```

---

## 6. LAYOUTS STRUCTURE

### MainLayout Component
**File**: `src/components/layout/MainLayout.tsx`

```typescript
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full min-w-0">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 min-w-0">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

### Navbar Component Pattern
**File**: `src/components/layout/Navbar.tsx` (excerpt)

```typescript
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/events"
            className="text-muted-foreground hover:text-indigo-600 transition"
          >
            Browse Events
          </Link>

          {user && (
            <Link
              to="/calendar"
              className="text-muted-foreground hover:text-indigo-600 transition"
            >
              Calendar
            </Link>
          )}

          {user?.role === "participant" && (
            <Link
              to="/my-activity"
              className="text-muted-foreground hover:text-indigo-600 transition"
            >
              My Activity
            </Link>
          )}

          {user?.role === "organizer" && (
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-indigo-700 transition">
                  {initials}
                </div>
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="hover:text-red-600"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
```

---

## 7. REUSABLE COMPONENT PATTERNS

### UI Component - Button
Radix UI wrapped with Tailwind, using `class-variance-authority` for variants

### Pattern for Page Components
```typescript
// Import patterns
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// State management
const [filter, setFilter] = useState("");
const navigate = useNavigate();

// Data fetching
const { data, isLoading, error } = useQuery({
  queryKey: ["feature", filter],
  queryFn: () => fetchData(filter),
});

// UI structure
return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {/* Component JSX */}
  </motion.div>
);
```

### Animation Pattern (Framer Motion)
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: idx * 0.08 }}
>
  {/* Content */}
</motion.div>
```

---

## 8. ROUTES/ROUTING PATTERN

**File**: `src/app/router.tsx`

```typescript
import { createBrowserRouter } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import EventList from "../pages/Events/EventList";
import EventDetails from "../pages/Events/EventDetails";
import CreateEvent from "../pages/Events/CreateEvent";
import EditEvent from "../pages/Events/EditEvent";

import Dashboard from "../pages/Dashboard/Dashboard";
import MyEvents from "../pages/Dashboard/MyEvents";

import CalendarView from "../pages/Calendar/CalendarView";
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import MyActivity from "@/pages/Activity/MyActivity";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import MangeEvent from "@/pages/Events/ManageEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/events",
        element: <EventList />,
      },

      {
        path: "/events/:id",
        element: <EventDetails />,
      },

      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/calendar",
        element: (
          <ProtectedRoute>
            <CalendarView />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-events",
        element: (
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        ),
      },

      {
        path: "/create-event",
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "/edit-event/:id",
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "/manageEvent-event/:id",
        element: (
          <ProtectedRoute>
            <MangeEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-activity",
        element: (
          <ProtectedRoute>
            <MyActivity />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="flex items-center justify-center h-screen text-xl">
        404 Page Not Found
      </div>
    ),
  },
]);
```

**Key Patterns**:
- Grouped routes with `<MainLayout />` as layout wrapper
- Protected routes wrapped in `<ProtectedRoute>` component
- Lazy loading not currently used but could be added with `React.lazy()`
- 404 fallback route at the end
- Dynamic segments like `:id` for parameterized routes

---

## 9. TYPES/TYPESCRIPT ORGANIZATION

**File**: `src/types/event.types.ts`

```typescript
export interface EventLocation {
  city?: string;
  state?: string;
  address?: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: "open" | "closed";
  location?: EventLocation;
  participants?: string[];
  maxParticipants?: number;
}
```

**Type Patterns**:
- Located in `src/types/` folder
- Separate files per domain (event.types.ts, user.types.ts, etc.)
- Use `interface` for object shapes
- Use union types for enums: `"open" | "closed"`
- Optional properties marked with `?`
- Shared types imported across services and components

---

## 10. STORE/STATE MANAGEMENT

### Context-Based Auth State
**File**: `src/context/AuthContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
```

**State Management Strategy**:
- Uses React Context API for authentication state
- TanStack Query for server state (events, dashboard data)
- localStorage for persistence
- No Redux or Zustand - keeps it lightweight
- Context hook (`useAuth`) available globally

### main.tsx Provider Setup
**File**: `src/main.tsx`

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./app/router";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

**Provider Stack**:
1. QueryClientProvider (TanStack Query)
2. AuthProvider (Context)
3. RouterProvider (React Router)

---

## 11. UTILS AND HELPER FUNCTIONS PATTERN

**Location**: `src/utils/`

While the specific utils files weren't directly fetched, the pattern used includes:
- Helper functions imported from services
- Utility functions in dedicated files
- No complex util libraries - relies on date-fns, clsx, tailwind-merge
- Most logic kept in components or hooks

**Usage in code**:
```typescript
import { clsx } from "clsx";
import { tailwindMerge } from "tailwind-merge";
import { format } from "date-fns";

// Example inline utility pattern
const initials = user?.name
  ? user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  : "U";
```

---

## 12. ENVIRONMENT VARIABLES HANDLING

### Environment Setup
**File**: `.env` (frontend folder)

```
VITE_API_URL=http://localhost:5000
```

or in production:
```
VITE_API_URL=https://communityeventfinder.onrender.com
```

### Usage Pattern
**File**: `src/services/api.ts`

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
```

**Key Points**:
- Uses Vite's `import.meta.env` instead of `process.env`
- Prefix all vars with `VITE_` for Vite to expose them
- Fallback to localhost if env var not set
- No `.env.example` file in repo (but should exist)

### Vite Config
**File**: `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

## 13. PAGES STRUCTURE

### Auth Pages
- **Landing** (`/`) - Public landing page
- **Login** (`/login`) - Public login form
- **Register** (`/register`) - Public registration with OTP verification
- **ForgotPassword** - Password reset request
- **ResetPassword** - Password reset with code

### Event Pages
- **EventList** (`/events`) - Public, browse all events
- **EventDetails** (`/events/:id`) - Public, single event details
- **CreateEvent** (`/create-event`) - Protected, organizer only
- **EditEvent** (`/edit-event/:id`) - Protected, organizer only
- **ManageEvent** (`/manageEvent-event/:id`) - Protected, approve/reject participants

### Dashboard Pages
- **Dashboard** (`/dashboard`) - Protected, organizer dashboard with stats
- **MyEvents** (`/my-events`) - Protected, organizer's events list

### Activity & Profile
- **MyActivity** (`/my-activity`) - Protected, participant activity tracking
- **CalendarView** (`/calendar`) - Protected, calendar event visualization
- **Profile** (`/profile`) - Protected, user profile

---

## 14. AUTH FLOW IMPLEMENTATION

### Complete Authentication Flow

#### Step 1: Registration
**File**: `src/pages/Auth/Register.tsx`

```typescript
export default function Register() {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div>
      {/* Initially show registration form */}
      <RegisterForm setEmail={setEmail} setShowOTP={setShowOTP} />

      {/* After registration, show OTP verification */}
      {showOTP ? (
        <VerificationCard email={email} />
      ) : (
        <AnimatedCommunityCard />
      )}
    </div>
  );
}
```

#### RegisterForm Component Pattern
```typescript
// Uses useMutation to register
const mutation = useMutation({
  mutationFn: registerUser,
  onSuccess: () => {
    setShowOTP(true);
    // OTP sent, now show verification
  },
});
```

#### VerificationCard Component Pattern
```typescript
// Uses useMutation to verify OTP
const verifyMutation = useMutation({
  mutationFn: verifyOTP,
  onSuccess: () => {
    navigate("/login"); // Redirect to login after verification
  },
});
```

#### Step 2: Login
**File**: `src/pages/Auth/Login.tsx`

```typescript
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const token = res.data.token;
      const user = res.data.user;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Route based on role
      if (user.role === "organizer") {
        navigate("/dashboard");
      } else {
        navigate("/events");
      }
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="alex@example.com"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Signing in..." : "Sign In →"}
      </Button>
    </form>
  );
}
```

#### Step 3: Token Usage & Auto-attach
**File**: `src/services/api.ts`

```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

#### Step 4: Get Current User
**File**: `src/hooks/useAuth.ts`

```typescript
export const useAuth = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!token, // Only fetch if token exists
  });

  const user = data || (storedUser ? JSON.parse(storedUser) : null);

  return { user, isLoading };
};
```

#### Step 5: Logout
**File**: `src/components/layout/Navbar.tsx`

```typescript
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setOpen(false);
  navigate("/");
};
```

### Password Reset Flow

#### Forgot Password
```typescript
export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};
```

**Flow**:
1. User enters email
2. Backend sends reset code
3. User receives email with code
4. User navigates to reset-password page

#### Reset Password
```typescript
export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
}) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
```

---

## 15. PROTECTED ROUTES IMPLEMENTATION

### ProtectedRoute Component
**File**: `src/components/layout/ProtectedRoute.tsx`

```typescript
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

**Simple Pattern**:
- Checks if token exists in localStorage
- If not, redirects to `/login`
- If exists, renders the wrapped component

### Usage in Router
**File**: `src/app/router.tsx` (excerpt)

```typescript
{
  path: "/calendar",
  element: (
    <ProtectedRoute>
      <CalendarView />
    </ProtectedRoute>
  ),
},

{
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
},

{
  path: "/create-event",
  element: (
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  ),
},
```

### Role-Based Protection
While not explicitly role-checking in ProtectedRoute, role-based UI is handled in components:

**File**: `src/components/layout/Navbar.tsx`

```typescript
{user?.role === "participant" && (
  <Link to="/my-activity">My Activity</Link>
)}

{user?.role === "organizer" && (
  <Link to="/dashboard">Dashboard</Link>
)}
```

**File**: `src/pages/Dashboard/Dashboard.tsx`

```typescript
{user?.role === "organizer" && (
  <div className="flex gap-4 text-sm pt-2">
    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
      Participants: {event.participants?.length || 0}
    </div>
  </div>
)}

{user?.role === "participant" && (
  <div className="pt-2">
    {event.participants?.some((p: any) => p._id === user._id) && (
      <span className="bg-green-100 text-green-700">Approved</span>
    )}
  </div>
)}
```

---

## PROJECT SETUP COMMANDS

### Install Dependencies
```bash
cd FRONTEND
npm install
```

### Development
```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build
```bash
npm run build
```

Creates optimized build

### Environment Setup
Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

---

## SUMMARY OF KEY PATTERNS

| Aspect | Pattern | Location |
|--------|---------|----------|
| HTTP Calls | Axios with interceptors | `src/services/api.ts` |
| Data Fetching | TanStack Query (useQuery) | `src/hooks/*` |
| Data Mutation | TanStack Query (useMutation) | `src/pages/*` |
| API Functions | Service layer | `src/services/*` |
| Auth State | React Context | `src/context/AuthContext.tsx` |
| Server State | TanStack Query | `src/hooks/*` |
| Protected Routes | Simple localStorage check | `src/components/layout/ProtectedRoute.tsx` |
| Routing | React Router v7 | `src/app/router.tsx` |
| Types | TypeScript interfaces | `src/types/*` |
| Styling | Tailwind CSS | `src/index.css` |
| Animations | Framer Motion | `src/pages/*`, `src/components/*` |
| UI Components | Radix + Custom Tailwind | `src/components/ui/*` |
| Environment | Vite env vars | `.env`, `vite.config.ts` |

---

## REPLICATION CHECKLIST

To replicate this architecture in your project:

- [ ] Set up Vite with React + TypeScript
- [ ] Install TanStack Query, Axios, React Router, Tailwind, Framer Motion
- [ ] Create axios instance in `src/services/api.ts` with request interceptor
- [ ] Implement AuthContext for global auth state
- [ ] Create service layer in `src/services/` for API calls
- [ ] Set up TanStack Query hooks in `src/hooks/`
- [ ] Create ProtectedRoute component based on token check
- [ ] Use `createBrowserRouter` for routes with MainLayout wrapper
- [ ] Add TypeScript types in `src/types/`
- [ ] Use useMutation for form submissions (login, register, etc.)
- [ ] Use useQuery for data fetching with proper queryKeys
- [ ] Implement role-based UI rendering in components
- [ ] Add Framer Motion animations for page transitions
- [ ] Set up environment variables with VITE_ prefix
