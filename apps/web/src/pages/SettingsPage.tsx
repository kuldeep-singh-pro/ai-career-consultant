import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useSettings,
  useUpdateSettings,
  useDeleteAccount,
  useResetSettings,
  useSettingsSummary,
} from "../hooks/useSettings";
import { useAuthContext } from "../context/AuthContext";
import { 
  Palette, 
  Languages, 
  Clock, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Monitor,
  Moon,
  Sun,
  Mail,
  Phone,
  Eye,
  EyeOff
} from "lucide-react";

export const SettingsPage: React.FC = () => {
  const { data: settings, isPending } = useSettings();
  const { data: summary } = useSettingsSummary();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();
  const { mutate: resetSettings } = useResetSettings();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
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
      theme: settings.preferences?.theme ?? "auto",
      language: settings.preferences?.language ?? "en",
      timezone: settings.preferences?.timezone ?? "Asia/Kolkata",
      privacy: settings.privacy ?? {
        profileVisibility: "private",
        showEmail: false,
        showPhone: false,
      },
    });
  }, [settings]);

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePrivacyUpdate = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value },
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
      onSuccess: () => window.location.reload(),
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

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-slate-900 dark:text-white">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Configure your preferences and account privacy.
            </p>
          </div>
          {summary && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${summary.isConfigured ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-800'}`}>
              {summary.isConfigured ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {summary.isConfigured ? "Configuration Synced" : "Updates Required"}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600">
                  <Palette size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Appearance</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Customize your interface</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'auto', label: 'System', icon: Monitor },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleUpdate("theme", mode.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group ${
                      formData.theme === mode.id 
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                        : 'border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/30 hover:border-slate-200'
                    }`}
                  >
                    <mode.icon size={28} className={`mb-3 ${formData.theme === mode.id ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className={`text-xs font-black uppercase tracking-widest ${formData.theme === mode.id ? 'text-blue-600' : 'text-slate-500'}`}>
                      {mode.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600">
                  <Languages size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Localization</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Region and communication</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Languages size={14} /> Preferred Language
                  </label>
                  <select
                    value={formData.language ?? "en"}
                    onChange={(e) => handleUpdate("language", e.target.value)}
                    className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                  >
                    <option value="en">English (Global)</option>
                    <option value="hi">Hindi (India)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Clock size={14} /> Regional Timezone
                  </label>
                  <input
                    value={formData.timezone ?? "Asia/Kolkata"}
                    onChange={(e) => handleUpdate("timezone", e.target.value)}
                    className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Privacy Control</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Secure your data</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Profile Discovery</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'public', label: 'Public', icon: Eye, desc: 'Visible to mentors' },
                      { id: 'private', label: 'Private', icon: EyeOff, desc: 'Hidden from search' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handlePrivacyUpdate("profileVisibility", opt.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                          formData.privacy?.profileVisibility === opt.id 
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                            : 'border-slate-100 dark:border-slate-900 hover:border-slate-200'
                        }`}
                      >
                        <opt.icon size={20} className={formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-400'} />
                        <div>
                          <p className={`text-xs font-black uppercase tracking-widest ${formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>{opt.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <label className="flex items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400">
                        <Mail size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Public Email</span>
                    </div>
                    <input
                      type="checkbox"
                      className="w-6 h-6 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.privacy?.showEmail ?? false}
                      onChange={(e) => handlePrivacyUpdate("showEmail", e.target.checked)}
                    />
                  </label>
                  <label className="flex items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400">
                        <Phone size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Public Phone</span>
                    </div>
                    <input
                      type="checkbox"
                      className="w-6 h-6 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.privacy?.showPhone ?? false}
                      onChange={(e) => handlePrivacyUpdate("showPhone", e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 sticky top-24">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                <RotateCcw size={14} /> Persistence
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="w-full flex items-center justify-center gap-3 h-16 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                  {isUpdating ? "Syncing..." : "Apply Changes"}
                </button>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-3 h-16 border-2 border-slate-100 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl transition-all active:scale-95"
                >
                  <RotateCcw size={18} />
                  Restore Factory
                </button>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-900 space-y-6">
                <div className="flex items-center gap-3 text-rose-500">
                  <div className="p-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                    <AlertTriangle size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Danger Zone</span>
                </div>
                
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  Deleting your account will erase all <strong>AI Roadmaps</strong>, <strong>Skill Gaps</strong>, and <strong>Resume History</strong> permanently.
                </p>

                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-center gap-3 h-16 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-500 hover:text-white text-rose-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl border border-rose-100 dark:border-rose-900/30 transition-all active:scale-95"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={18} />}
                  Wipe All Data
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};