import React, { useState } from "react";
import { 
  LayoutDashboard, 
  FileSearch, 
  TrendingUp, 
  Target, 
  Map, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/Logo";

export const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  const navigationItems = [
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/resume-analyzer", label: "Resume Analyzer", icon: FileSearch },
    { href: "/skill-gap", label: "Skill Gap", icon: TrendingUp },
    { href: "/career-paths", label: "Career Paths", icon: Target },
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: "/mentor-chat", label: "AI Mentor", icon: MessageSquare },
    { href: "/profile", label: t("profile"), icon: User },
    { href: "/settings", label: t("settings"), icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 transition-colors font-sans">
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 fixed h-full z-40 flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Logo sidebarOpen={sidebarOpen} />
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link 
                key={item.href} 
                to={item.href} 
                className={`flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group hover:pl-5 ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-slate-900 dark:group-hover:text-slate-200"}`} 
                />
                {sidebarOpen && <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {user && (
            <button 
              onClick={() => navigate("/profile")} 
              className="flex items-center gap-4 w-full px-3 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-all group"
            >
               <div className="h-6 w-6 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold group-hover:ring-2 ring-blue-400 ring-offset-1 dark:ring-offset-slate-900 transition-all">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              {sidebarOpen && <span className="text-sm font-bold truncate">{user.name}</span>}
            </button>
          )}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 w-full px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} flex flex-col transition-all duration-300`}>
        <header className="h-16 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex justify-between items-center z-30">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-bold">{user.name}</span>
                </div>
                <button 
                  onClick={() => navigate("/profile")} 
                  className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white font-black text-sm shadow-sm hover:ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950 transition-all"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold hover:text-blue-600">Sign In</Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};