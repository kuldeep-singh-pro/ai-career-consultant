import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useDashboardStats,
  useDashboardProgress,
} from "../hooks/useDashboard";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Target, 
  BrainCircuit, 
  GraduationCap, 
  TrendingUp, 
  MessageSquare, 
  Zap,
  ArrowUpRight,
  PlusCircle,
  Search,
  Map as MapIcon
} from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const { data: stats, isPending: statsLoading } =
    useDashboardStats(isAuthenticated);

  const { data: progress, isPending: progressLoading } =
    useDashboardProgress(isAuthenticated);

  const loading = statsLoading || progressLoading;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse tracking-tight">Syncing Career Data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Here is your real-time career development progress.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resume Skills</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{stats?.resume?.skillsCount || 0}</h3>
          </div>

          <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Target size={24} />
              </div>
              <ArrowUpRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Path Progress</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{stats?.career?.overallProgress || 0}%</h3>
          </div>

          <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-2xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <BrainCircuit size={24} />
              </div>
              <ArrowUpRight size={20} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Missing Skills</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{stats?.skillGap?.missingSkillsCount || 0}</h3>
          </div>

          <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <GraduationCap size={24} />
              </div>
              <ArrowUpRight size={20} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Learning Avg.</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{progress?.overallStats?.averageProgress || 0}%</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden border-b-4 border-b-blue-600">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <TrendingUp size={24} className="text-blue-600" />
                  Career Path Summary
                </h2>
              </div>
              <div className="p-10 grid grid-cols-3 gap-8">
                <div className="text-center group">
                  <p className="text-xs text-slate-400 uppercase font-black tracking-[0.2em] mb-2">Total</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">{stats?.career?.totalPaths || 0}</p>
                </div>
                <div className="text-center group">
                  <p className="text-xs text-slate-400 uppercase font-black tracking-[0.2em] mb-2 text-emerald-500">Active</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">{stats?.career?.activePaths || 0}</p>
                </div>
                <div className="text-center group">
                  <p className="text-xs text-slate-400 uppercase font-black tracking-[0.2em] mb-2 text-purple-500">Done</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">{stats?.career?.completedPaths || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Zap size={24} className="text-amber-500 fill-amber-500" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <button
                  onClick={() => navigate("/resume-analyzer")}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group active:scale-95"
                >
                  <PlusCircle size={32} className="text-blue-600 mb-3 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-sm font-black uppercase tracking-tighter">Upload Resume</span>
                </button>
                <button
                  onClick={() => navigate("/skill-gap")}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group active:scale-95"
                >
                  <Search size={32} className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-tighter">Skill Gap</span>
                </button>
                <button
                  onClick={() => navigate("/career-paths")}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group active:scale-95"
                >
                  <MapIcon size={32} className="text-purple-600 mb-3 group-hover:translate-y-1 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-tighter">Career Path</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 dark:bg-blue-950 rounded-[2rem] border border-slate-800 shadow-2xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <MessageSquare size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageSquare size={20} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold">AI Mentor</h2>
                </div>
                <div className="mb-8">
                  <p className="text-4xl font-black mb-1">{stats?.mentor?.totalConversations || 0}</p>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Active Conversations</p>
                </div>
                <button 
                  onClick={() => navigate("/mentor-chat")}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  CONTINUE CHAT
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em] mb-6">Learning Pulse</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-100 dark:bg-slate-900 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progress?.overallStats?.averageProgress || 0}%` }}
                  />
                </div>
                <span className="font-black text-sm">{progress?.overallStats?.averageProgress || 0}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};