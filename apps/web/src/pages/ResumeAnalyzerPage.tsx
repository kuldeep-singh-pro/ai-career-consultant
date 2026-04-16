import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useUploadResume, useAnalyzeResume } from '../hooks/useResume';
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ResumeAnalyzerPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const { mutate: uploadMutate, isPending: isUploading } = useUploadResume();
  const { mutate: analyzeMutate, isPending: isAnalyzing } = useAnalyzeResume();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      uploadMutate(file, {
        onSuccess: (data) => {
          analyzeMutate(data.id);
        },
      });
    }
  };

  const isProcessing = isUploading || isAnalyzing;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Resume Analyzer
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Extract intelligence from your professional history.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} /> AI Optimization Enabled
          </div>
        </header>

        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 md:p-12">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative group border-2 border-dashed rounded-[2rem] p-12 md:p-20 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[0.99]' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="relative mb-6">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                    <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" size={24} />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    {isUploading ? 'Uploading Document' : 'AI Analysis in Progress'}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                    {isUploading 
                      ? 'Securely transferring your resume to our servers...' 
                      : 'Gemini is identifying your core competencies and experiences...'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-500">
                    <Upload size={40} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                    Submit Professional Profile
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium">
                    Drag and drop your resume in <span className="text-blue-600 font-bold">PDF format</span> for real-time analysis.
                  </p>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
                    className="hidden"
                    id="file-input"
                  />
                  <label 
                    htmlFor="file-input" 
                    className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl cursor-pointer hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95"
                  >
                    Browse Files
                  </label>
                </>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">Instant Scoring</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Get a relevance score based on modern industry standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Sparkles className="text-blue-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">Skill Extraction</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Automatically identify and categorize your technical stack.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">Gap Analysis</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Highlight areas where your resume needs more impact.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.2em]">
              Data is processed securely and encrypted. Only PDF format is supported.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};