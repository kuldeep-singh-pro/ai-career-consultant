import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useCareerPaths, useUpdateMilestone, useLatestCareerPath } from "../hooks/useCareer";
import { Map, CheckCircle2, Circle, Loader2, TrendingUp, Target, Clock } from "lucide-react";

export const RoadmapPage: React.FC = () => {
  const { id } = useParams();
  const { data: latestPath, isPending: loadingLatest } = useLatestCareerPath(!id);
  const { data: careerPaths, isPending: loadingPaths } = useCareerPaths(!!id);
  const { mutate: updateMilestone, isPending: updating } = useUpdateMilestone();

  const path = id 
    ? careerPaths?.find((p: any) => p._id === id) 
    : latestPath;

  const isPending = id ? loadingPaths : loadingLatest;

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse uppercase tracking-widest text-xs">
            Architecting Roadmap
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!path) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto py-20 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 mb-6">
            <Map size={40} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            No Roadmap Available
          </h2>
          <p className="text-slate-500 mt-2">
            Generate a career path first to view your structured roadmap.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              Strategic Learning Path
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            {path.targetRole}
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl">
            {path.description || "A comprehensive blueprint designed to bridge your current skill gaps."}
          </p>
        </header>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
          {path.milestones?.map((milestone: any, index: number) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-950 bg-slate-50 dark:bg-slate-900 text-slate-500 group-hover:scale-110 transition-transform duration-500 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {milestone.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-slate-300" />}
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600">
                    <Clock size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{milestone.duration} Weeks</span>
                  </div>
                  
                  <button
                    disabled={updating}
                    onClick={() => updateMilestone({ careerPathId: path._id, milestoneIndex: index, completed: !milestone.completed })}
                    className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors ${
                      milestone.completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {milestone.completed ? "Completed" : "Mark Done"}
                  </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{milestone.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">{milestone.description}</p>

                {milestone.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {milestone.skills.map((skill: string, sIdx: number) => (
                      <span key={sIdx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest rounded-lg border border-slate-100 dark:border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
          <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-6"><Target size={32} /></div>
          <h2 className="text-3xl font-black uppercase mb-4">Ready to reach the peak?</h2>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
            Progress: {path.progress}%
            <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden ml-2">
              <div className="h-full bg-white transition-all duration-1000" style={{ width: `${path.progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};