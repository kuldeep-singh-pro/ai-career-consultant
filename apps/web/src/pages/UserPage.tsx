import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCurrentUser,
  useUpdateUser
} from "../hooks/useUser";
import {
  useState,
  useEffect
} from "react";
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Edit3, 
  Save, 
  X, 
  Loader2, 
  Camera,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export const UserPage: React.FC = () => {
  const { data: user, isPending } = useCurrentUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
  }, [user]);

  if (isPending)
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Retrieving Profile</p>
        </div>
      </DashboardLayout>
    );

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  const handleSave = () => {
    updateUser(
      { name },
      {
        onSuccess: () => {
          setIsEditing(false);
        }
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-slate-900 dark:text-white">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              User Profile
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Manage your personal identity and account details.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
            <CheckCircle2 size={14} /> Verified Account
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 text-center sticky top-24 transition-all hover:shadow-md">
              <div className="relative inline-block group">
                <div className="w-32 h-32 flex items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-5xl font-black shadow-2xl shadow-blue-500/40 group-hover:scale-105 transition-transform duration-500">
                  {firstLetter}
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg text-slate-500 hover:text-blue-600 transition-colors">
                  <Camera size={18} />
                </button>
              </div>

              <div className="mt-8 space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{user?.name}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Shield size={12} /> {user?.role}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-900 space-y-4">
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-50 dark:border-slate-800">
                  <Mail size={16} className="shrink-0" />
                  <span className="text-xs font-bold truncate">{user?.email}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600">
                    <UserIcon size={24} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight uppercase">Identity Settings</h3>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Role</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white capitalize">{user?.role}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Update Full Name</label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-16 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-[1.5rem] px-6 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                      />
                      <UserIcon size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      disabled={isUpdating}
                      className="flex-1 flex items-center justify-center gap-2 h-16 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {isUpdating ? "Processing..." : "Commit Changes"}
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 flex items-center justify-center gap-2 h-16 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all active:scale-95"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 dark:bg-blue-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles size={100} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-black tracking-tight uppercase mb-2">Pro Career Tracking</h3>
                  <p className="text-blue-200 text-sm max-w-sm leading-relaxed">
                    Your profile data is used to calibrate your AI Mentor sessions and Roadmap accuracy. Keep it updated for better results.
                  </p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-3xl border border-blue-400/20 backdrop-blur-sm text-center min-w-[140px]">
                  <p className="text-3xl font-black">100%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Data Integrity</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};