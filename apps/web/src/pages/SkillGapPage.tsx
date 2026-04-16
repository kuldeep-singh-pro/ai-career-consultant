import { DashboardLayout } from "../layouts/DashboardLayout";
import { useSkillGap, useGenerateSkillGap, useDeleteSkillGap } from "../hooks/useSkillGap";
import { useState } from "react";
import { 
  BrainCircuit, 
  Target, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  Clock,
  Zap,
  BookOpen,
  Trash2,
  RefreshCw,
  TrendingUp
} from "lucide-react";

export const SkillGapPage: React.FC = () => {
  const [targetRole, setTargetRole] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);

  const { data: skillGap, isPending, refetch } = useSkillGap();

  const {
    mutate: generateSkillGap,
    isPending: isGenerating,
  } = useGenerateSkillGap();

  const {
    mutate: deleteSkillGap,
    isPending: isDeleting,
  } = useDeleteSkillGap();

  const handleGenerate = (role: string) => {
    generateSkillGap(role, {
      onSuccess: () => {
        setIsRegenerating(false);
        setTargetRole("");
        refetch();
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      deleteSkillGap(undefined, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };

  if (isPending)
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Processing Skill Matrix</p>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-slate-900 dark:text-white">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              Skill Gap Analysis
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Bridge the distance between your current skills and your target role.
            </p>
          </div>
          
          {skillGap && !isRegenerating && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRegenerating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <RefreshCw size={14} /> Regenerate
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          )}
        </header>

        {!skillGap || isRegenerating ? (
          <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <Sparkles size={150} />
            </div>
            
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-8">
              <Target size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                {isRegenerating ? "Change Target Role" : "Set Your Target Role"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto font-medium">
              Enter the role you want to achieve. We'll compare it against your latest resume analysis.
            </p>

            <div className="relative max-w-md mx-auto group mb-4">
              <input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full h-16 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pr-14 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={20} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                onClick={() => handleGenerate(targetRole)}
                disabled={isGenerating || !targetRole}
                className="flex-1 flex items-center justify-center gap-3 h-16 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                {isGenerating ? "Analyzing Matrix..." : "Start AI Analysis"}
                </button>
                
                {isRegenerating && (
                    <button
                        onClick={() => setIsRegenerating(false)}
                        className="px-8 h-16 border-2 border-slate-100 dark:border-slate-800 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-4 space-y-8">
                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp size={120} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Match Core</p>
                    <h2 className="text-5xl font-black mb-2">{skillGap.matchPercentage}%</h2>
                    <p className="text-blue-100 text-xs font-bold leading-relaxed">Your resume aligns with {skillGap.targetRole} standards.</p>
                </section>

                <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <h3 className="font-black text-sm uppercase tracking-widest">Current Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {skillGap.currentSkills?.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                        {skill}
                        </span>
                    ))}
                    </div>
                </section>
            </div>

            <div className="lg:col-span-8 space-y-8">
                <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-600">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black tracking-tight uppercase leading-none">Missing Competencies</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Identified Gaps for {skillGap.targetRole}</p>
                    </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                    {skillGap.missingSkills?.map((skill, idx) => (
                        <span
                        key={idx}
                        className="px-5 py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800 rounded-xl text-xs font-black uppercase tracking-widest animate-in zoom-in duration-300"
                        style={{ animationDelay: `${idx * 50}ms` }}
                        >
                        {skill}
                        </span>
                    ))}
                    </div>
                </section>

                <section className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-xl font-black tracking-tight uppercase">Actionable Learning Plan</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800">
                        <Zap size={14} /> Accelerated Path
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skillGap.learningPlan?.map((item, idx) => (
                            <div key={idx} className="group relative flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-950">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                <h4 className="font-black text-sm tracking-tight">{item.skill}</h4>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md ${
                                    item.priority === 'high' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' :
                                    item.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' :
                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                }`}>
                                    {item.priority}
                                </span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5 font-black text-slate-500"><Clock size={12} /> {item.weeks} Weeks</span>
                                </div>
                            </div>
                            <div className="h-10 w-10 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:border-blue-600 group-hover:text-blue-600 transition-all">
                                <ArrowRight size={18} />
                            </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 text-center border-t border-slate-200 dark:border-slate-800">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        Data recalibrated based on latest resume version.
                        </p>
                    </div>
                </section>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};  