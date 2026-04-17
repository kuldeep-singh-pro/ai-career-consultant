import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useSettings, useUpdateSettings, useDeleteAccount, useSettingsSummary, } from "../hooks/useSettings";
import { useAuthContext } from "../context/AuthContext";
import { ShieldCheck, Save, Trash2, CheckCircle2, AlertTriangle, Loader2, Mail, Phone, Eye, EyeOff, UserCog, Fingerprint } from "lucide-react";
export const SettingsPage = () => {
    const { data: settings, isPending } = useSettings();
    const { data: summary } = useSettingsSummary();
    const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();
    const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        privacy: {
            profileVisibility: "private",
            showEmail: false,
            showPhone: false,
        },
    });
    useEffect(() => {
        if (!settings)
            return;
        setFormData({
            privacy: settings.privacy ?? {
                profileVisibility: "private",
                showEmail: false,
                showPhone: false,
            },
        });
    }, [settings]);
    if (isPending) {
        return (_jsx(DashboardLayout, { children: _jsx("div", { className: "flex flex-col items-center justify-center h-[60vh]", children: _jsx(Loader2, { className: "w-10 h-10 text-blue-600 animate-spin" }) }) }));
    }
    const handlePrivacyUpdate = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            privacy: { ...prev.privacy, [field]: value },
        }));
    };
    const handleSave = () => {
        updateSettings({
            privacy: formData.privacy,
        });
    };
    const handleDeleteAccount = () => {
        if (window.confirm("Are you absolutely sure? This will permanently erase your career data and cannot be undone.")) {
            deleteAccount(undefined, {
                onSuccess: () => {
                    logout();
                    navigate("/");
                },
            });
        }
    };
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-slate-900 dark:text-white", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-black tracking-tight uppercase", children: "Settings" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium", children: "Manage your profile privacy and core account security." })] }), summary && (_jsxs("div", { className: `flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${summary.isConfigured ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-800'}`, children: [summary.isConfigured ? _jsx(CheckCircle2, { size: 14 }) : _jsx(AlertTriangle, { size: 14 }), summary.isConfigured ? "Identity Verified" : "Action Required"] }))] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("div", { className: "lg:col-span-8 space-y-8", children: _jsxs("section", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10 transition-all hover:shadow-md", children: [_jsxs("div", { className: "flex items-center gap-4 mb-10", children: [_jsx("div", { className: "p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600", children: _jsx(ShieldCheck, { size: 26 }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-black tracking-tight uppercase", children: "Privacy Shield" }), _jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5", children: "Control who sees your career data" })] })] }), _jsxs("div", { className: "space-y-10", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2", children: [_jsx(Fingerprint, { size: 14 }), " Profile Visibility Level"] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                                                            { id: 'public', label: 'Public Profile', icon: Eye, desc: 'Visible to hiring managers' },
                                                            { id: 'private', label: 'Private Mode', icon: EyeOff, desc: 'Hidden from search' },
                                                        ].map((opt) => (_jsxs("button", { onClick: () => handlePrivacyUpdate("profileVisibility", opt.id), className: `flex items-center gap-4 p-6 rounded-[1.8rem] border-2 transition-all text-left ${formData.privacy?.profileVisibility === opt.id
                                                                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/5'
                                                                : 'border-slate-100 dark:border-slate-900 hover:border-slate-200 bg-slate-50/30 dark:bg-slate-900/30'}`, children: [_jsx(opt.icon, { size: 22, className: formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-400' }), _jsxs("div", { children: [_jsx("p", { className: `text-xs font-black uppercase tracking-widest ${formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`, children: opt.label }), _jsx("p", { className: "text-[10px] text-slate-400 font-bold mt-1 leading-tight", children: opt.desc })] })] }, opt.id))) })] }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2", children: [_jsx(UserCog, { size: 14 }), " Contact Information Display"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("label", { className: "flex items-center justify-between p-6 rounded-[1.8rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400", children: _jsx(Mail, { size: 18 }) }), _jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter", children: "Show Public Email" })] }), _jsxs("div", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: formData.privacy?.showEmail ?? false, onChange: (e) => handlePrivacyUpdate("showEmail", e.target.checked) }), _jsx("div", { className: "w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })] })] }), _jsxs("label", { className: "flex items-center justify-between p-6 rounded-[1.8rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400", children: _jsx(Phone, { size: 18 }) }), _jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter", children: "Show Public Phone" })] }), _jsxs("div", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: formData.privacy?.showPhone ?? false, onChange: (e) => handlePrivacyUpdate("showPhone", e.target.checked) }), _jsx("div", { className: "w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })] })] })] })] })] })] }) }), _jsx("aside", { className: "lg:col-span-4 space-y-6", children: _jsxs("div", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 sticky top-24", children: [_jsxs("h2", { className: "text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2", children: [_jsx(Save, { size: 14 }), " Update Hub"] }), _jsx("div", { className: "space-y-4", children: _jsxs("button", { onClick: handleSave, disabled: isUpdating, className: "w-full flex items-center justify-center gap-3 h-16 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50", children: [isUpdating ? _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : _jsx(Save, { size: 18 }), isUpdating ? "Syncing..." : "Commit Changes"] }) }), _jsxs("div", { className: "mt-12 pt-10 border-t border-slate-100 dark:border-slate-900 space-y-6", children: [_jsxs("div", { className: "flex items-center gap-3 text-rose-500", children: [_jsx("div", { className: "p-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg", children: _jsx(AlertTriangle, { size: 14 }) }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em]", children: "Danger Zone" })] }), _jsx("p", { className: "text-[11px] text-slate-400 font-medium leading-relaxed", children: "Permanently erase your account, roadmap history, and all AI-generated career insights." }), _jsxs("button", { onClick: handleDeleteAccount, disabled: isDeleting, className: "w-full flex items-center justify-center gap-3 h-16 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-500 hover:text-white text-rose-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl border border-rose-100 dark:border-rose-900/30 transition-all active:scale-95", children: [isDeleting ? _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : _jsx(Trash2, { size: 18 }), "Wipe Entire Profile"] })] })] }) })] })] }) }));
};
