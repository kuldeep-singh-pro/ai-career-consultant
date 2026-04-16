import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCareerPaths,
  useGenerateCareerPath,
  useDeleteCareerPath,
} from "../hooks/useCareer";
import { useNavigate } from "react-router-dom";
import { 
  Target, 
  Plus, 
  Trash2, 
  Briefcase, 
  Zap, 
  ChevronRight, 
  Loader2,
  Trophy
} from "lucide-react";

export const CareerPathsPage: React.FC = () => {
  const { data: careerPaths, isPending } = useCareerPaths();
  const { mutate: generateCareerPath, isPending: isGenerating } = useGenerateCareerPath();
  const { mutate: deleteCareerPath } = useDeleteCareerPath();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse uppercase tracking-widest text-xs">Loading Pathways</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Career Paths
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Strategize your journey towards high-impact roles.
            </p>
          </div>

          <button
            onClick={() => generateCareerPath()}
            disabled={isGenerating}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all active:scale-95"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            )}
            {isGenerating ? "Mapping..." : "Generate New Path"}
          </button>
        </div>

        {!careerPaths || careerPaths.length === 0 ? (
          <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 mb-6">
              <Target size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No pathways detected</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">Generate a new career path to start visualizing your professional trajectory.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {careerPaths.map((path: any) => (
              <div
                key={path._id}
                className="group relative bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                      <Zap size={14} className="text-emerald-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                        {path.matchPercentage}% Match
                      </span>
                    </div>
                  </div>

                  <div
                    className="cursor-pointer space-y-4"
                    onClick={() => navigate(`/career-paths/${path._id}`)}
                  >
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {path.targetRole}
                    </h3>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <span className="text-[10px] font-black uppercase tracking-widest">Current:</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 italic">{path.currentRole}</span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Progress</span>
                        <span className="text-sm font-black text-blue-600">{Math.round(path.totalProgress ?? 0)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 group-hover:brightness-110"
                          style={{ width: `${path.totalProgress ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50 dark:border-slate-900">
                    <button
                      onClick={() => deleteCareerPath(path._id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <button 
                       onClick={() => navigate(`/career-paths/${path._id}`)}
                       className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:gap-3 transition-all"
                    >
                      View Roadmap <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => generateCareerPath()}
              disabled={isGenerating}
              className="flex flex-col items-center justify-center p-12 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group min-h-[300px]"
            >
              <div className="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy size={32} className="text-slate-300 group-hover:text-blue-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600">Explore Another Path</span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};