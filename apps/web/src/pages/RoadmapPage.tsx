import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCareerPaths,
  useUpdateMilestone,
} from "../hooks/useCareer";
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Flag, 
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

export const RoadmapPage: React.FC = () => {
  const { data: careerPaths, isPending } = useCareerPaths();
  const { mutate: updateMilestone, isPending: updating } = useUpdateMilestone();

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse uppercase tracking-widest text-xs">Architecting Roadmap</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!careerPaths || careerPaths.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto py-20 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 mb-6">
            <Map size={40} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">No Roadmap Available</h2>
          <p className="text-slate-500 mt-2">Generate a career path first to view your structured roadmap.</p>
        </div>
      </DashboardLayout>
    );
  }

  const path = careerPaths[0];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Career Roadmap
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Step-by-step blueprint to master <span className="text-blue-600 font-bold">{path.targetRole}</span>.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} /> Optimized Path
          </div>
        </header>

        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Flag size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {path.targetRole}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Objective</span>
                </div>
              </div>
            </div>

            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              {path.milestones?.map((milestone: any, index: number) => (
                <div key={index} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                  
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-950 bg-slate-50 dark:bg-slate-900 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:border-blue-500">
                    {milestone.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">Phase {index + 1}</span>
                        </div>
                        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {milestone.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <select
                          disabled={updating}
                          value={milestone.completed ? "Completed" : "Pending"}
                          onChange={(e) =>
                            updateMilestone({
                              careerPathId: path._id,
                              milestoneIndex: index,
                              completed: e.target.value === "Completed",
                            })
                          }
                          className={`appearance-none cursor-pointer px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            milestone.completed
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                              : "bg-white border-slate-200 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 hover:border-blue-400"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-600" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Overall Mastery</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600 italic">
                    {Math.round(path.totalProgress || 0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-1">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                    style={{ width: `${path.totalProgress || 0}%` }}
                  />
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <ChevronRight size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Next Step</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none tracking-tight">Focus on Phase {Math.floor((path.totalProgress / 100) * path.milestones?.length) + 1}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};