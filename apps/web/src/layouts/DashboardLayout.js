import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LayoutDashboard, FileSearch, TrendingUp, Target, Map, MessageSquare, User, Settings, LogOut, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/", { replace: true });
        }
        catch (error) {
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
    return (_jsxs("div", { className: "flex h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 transition-colors font-sans", children: [_jsxs("aside", { className: `${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 fixed h-full z-40 flex flex-col`, children: [_jsx("div", { className: "h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800", children: _jsxs(Link, { to: "/", className: "flex items-center gap-3 overflow-hidden group", children: [_jsx("div", { className: "bg-blue-600 p-2 rounded-lg shrink-0 group-hover:rotate-12 transition-transform", children: _jsx(Sparkles, { size: 20, className: "text-white" }) }), sidebarOpen && (_jsx("span", { className: "font-bold text-lg tracking-tight whitespace-nowrap text-slate-900 dark:text-white", children: "Career AI" }))] }) }), _jsx("nav", { className: "flex-1 mt-6 px-3 space-y-1", children: navigationItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (_jsxs(Link, { to: item.href, className: `flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"}`, children: [_jsx(item.icon, { size: 20, className: `shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-slate-900 dark:group-hover:text-slate-200"}` }), sidebarOpen && (_jsx("span", { className: "text-sm font-medium whitespace-nowrap", children: item.label }))] }, item.href));
                        }) }), _jsxs("div", { className: "p-4 border-t border-slate-200 dark:border-slate-800 space-y-2", children: [user && (_jsxs("button", { onClick: () => navigate("/profile"), className: "flex items-center gap-4 w-full px-3 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-all group", children: [_jsx("div", { className: "h-6 w-6 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold group-hover:ring-2 ring-blue-400 ring-offset-1 dark:ring-offset-slate-900 transition-all", children: user.name.charAt(0).toUpperCase() }), sidebarOpen && (_jsx("span", { className: "text-sm font-medium truncate", children: user.name }))] })), _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-4 w-full px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all", children: [_jsx(LogOut, { size: 20, className: "shrink-0" }), sidebarOpen && _jsx("span", { className: "text-sm font-medium", children: "Logout" })] })] })] }), _jsxs("div", { className: `flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} flex flex-col transition-all duration-300`, children: [_jsxs("header", { className: "h-16 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex justify-between items-center z-30", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md transition-colors", children: sidebarOpen ? _jsx(ChevronLeft, { size: 20 }) : _jsx(ChevronRight, { size: 20 }) }), _jsx("div", { className: "flex items-center gap-4", children: user ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "hidden md:flex flex-col items-end", children: [_jsx("span", { className: "text-sm font-semibold", children: user.name }), _jsx("span", { className: "text-[10px] text-slate-500 uppercase tracking-wider font-bold", children: "Pro Member" })] }), _jsx("button", { onClick: () => navigate("/profile"), className: "h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow-sm hover:ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950 transition-all", children: user.name.charAt(0).toUpperCase() })] })) : (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/login", className: "text-sm font-medium hover:text-blue-600 transition-colors", children: "Sign In" }), _jsx(Link, { to: "/register", className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-md shadow-blue-500/20", children: "Get Started" })] })) })] }), _jsx("main", { className: "flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto", children: children })] })] }));
};
