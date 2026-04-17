import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useSettings,
  useUpdateSettings,
  useDeleteAccount,
  useSettingsSummary,
} from "../hooks/useSettings";
import { useAuthContext } from "../context/AuthContext";
import { 
  ShieldCheck, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Mail,
  Phone,
  Eye,
  EyeOff,
  UserCog,
  Fingerprint
} from "lucide-react";

export const SettingsPage: React.FC = () => {
  const { data: settings, isPending } = useSettings();
  const { data: summary } = useSettingsSummary();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    privacy: {
      profileVisibility: "private",
      showEmail: false,
      showPhone: false,
    },
  });

  useEffect(() => {
    if (!settings) return;
    setFormData({
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

  const handlePrivacyUpdate = (field: string, value: any) => {
    setFormData((prev: any) => ({
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

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-slate-900 dark:text-white">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Manage your profile privacy and core account security.
            </p>
          </div>
          {summary && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${summary.isConfigured ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-800'}`}>
              {summary.isConfigured ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {summary.isConfigured ? "Identity Verified" : "Action Required"}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10 transition-all hover:shadow-md">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Privacy Shield</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control who sees your career data</p>
                </div>
              </div>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Fingerprint size={14} /> Profile Visibility Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'public', label: 'Public Profile', icon: Eye, desc: 'Visible to hiring managers' },
                      { id: 'private', label: 'Private Mode', icon: EyeOff, desc: 'Hidden from search' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handlePrivacyUpdate("profileVisibility", opt.id)}
                        className={`flex items-center gap-4 p-6 rounded-[1.8rem] border-2 transition-all text-left ${
                          formData.privacy?.profileVisibility === opt.id 
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/5' 
                            : 'border-slate-100 dark:border-slate-900 hover:border-slate-200 bg-slate-50/30 dark:bg-slate-900/30'
                        }`}
                      >
                        <opt.icon size={22} className={formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-400'} />
                        <div>
                          <p className={`text-xs font-black uppercase tracking-widest ${formData.privacy?.profileVisibility === opt.id ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>{opt.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 leading-tight">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <UserCog size={14} /> Contact Information Display
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-6 rounded-[1.8rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400">
                          <Mail size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">Show Public Email</span>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.privacy?.showEmail ?? false}
                          onChange={(e) => handlePrivacyUpdate("showEmail", e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-6 rounded-[1.8rem] bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400">
                          <Phone size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">Show Public Phone</span>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.privacy?.showPhone ?? false}
                          onChange={(e) => handlePrivacyUpdate("showPhone", e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 sticky top-24">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                <Save size={14} /> Update Hub
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="w-full flex items-center justify-center gap-3 h-16 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                  {isUpdating ? "Syncing..." : "Commit Changes"}
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
                  Permanently erase your account, roadmap history, and all AI-generated career insights. 
                </p>

                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-center gap-3 h-16 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-500 hover:text-white text-rose-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl border border-rose-100 dark:border-rose-900/30 transition-all active:scale-95"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={18} />}
                  Wipe Entire Profile
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};