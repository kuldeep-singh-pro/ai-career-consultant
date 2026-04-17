import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useUploadResume, useAnalyzeResume } from "../hooks/useResume";
import { Upload, FileText, Loader2, Sparkles, } from "lucide-react";
export const ResumeAnalyzerPage = () => {
    const navigate = useNavigate();
    const [dragActive, setDragActive] = useState(false);
    const { mutate: uploadMutate, isPending: isUploading } = useUploadResume();
    const { mutate: analyzeMutate, isPending: isAnalyzing } = useAnalyzeResume();
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };
    const handleFile = (file) => {
        if (file.type === "application/pdf") {
            uploadMutate(file, {
                onSuccess: () => {
                    analyzeMutate(undefined, {
                        onSuccess: () => {
                            alert("Resume analyzed successfully! Redirecting to dashboard...");
                            navigate("/dashboard");
                        },
                        onError: (err) => {
                            alert(err.response?.data?.message || "Analysis failed");
                        },
                    });
                },
                onError: (err) => {
                    alert(err.response?.data?.message || "Upload failed");
                },
            });
        }
        else {
            alert("Please upload a valid PDF file.");
        }
    };
    const isProcessing = isUploading || isAnalyzing;
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase", children: "Resume Analyzer" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 mt-2 font-medium", children: "Extract intelligence from your professional history." })] }), _jsxs("div", { className: "flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest", children: [_jsx(Sparkles, { size: 14 }), "AI Optimization Enabled"] })] }), _jsx("div", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden", children: _jsx("div", { className: "p-8 md:p-12", children: _jsx("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, className: `relative group border-2 border-dashed rounded-[2rem] p-12 md:p-20 text-center transition-all duration-300 ${dragActive
                                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[0.99]"
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`, children: isProcessing ? (_jsxs("div", { className: "flex flex-col items-center animate-in zoom-in duration-300", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx(Loader2, { className: "w-16 h-16 text-blue-600 animate-spin" }), _jsx(FileText, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600", size: 24 })] }), _jsx("h2", { className: "text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white", children: isUploading
                                            ? "Uploading Document"
                                            : "AI Analysis in Progress" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed", children: isUploading
                                            ? "Securely transferring your resume..."
                                            : "Gemini is analyzing your experience..." })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-500", children: _jsx(Upload, { size: 40, strokeWidth: 1.5 }) }), _jsx("h2", { className: "text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-3", children: "Submit Professional Profile" }), _jsxs("p", { className: "text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium", children: ["Drag and drop your resume in", _jsx("span", { className: "text-blue-600 font-bold", children: " PDF format" }), "."] }), _jsx("input", { type: "file", accept: ".pdf", onChange: (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleFile(file);
                                            }
                                        }, className: "hidden", id: "file-input" }), _jsx("label", { htmlFor: "file-input", className: "inline-flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl cursor-pointer hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95", children: "Browse Files" })] })) }) }) })] }) }));
};
