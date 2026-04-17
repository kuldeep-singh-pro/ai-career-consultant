import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layouts/AuthLayout';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const { mutate: loginMutate, isPending } = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        loginMutate({ email, password }, {
            onSuccess: (data) => {
                login(data.token, data.user);
                navigate('/dashboard');
            },
            onError: (error) => {
                setError(error.response?.data?.message || 'Authentication failed');
            },
        });
    };
    return (_jsx(AuthLayout, { children: _jsxs("div", { className: "w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("div", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 relative overflow-hidden group", children: [_jsx("div", { className: "absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700", children: _jsx(LogIn, { size: 120 }) }), _jsxs("header", { className: "text-center mb-10 relative z-10", children: [_jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white mb-6 shadow-xl shadow-blue-500/20", children: _jsx(ShieldCheck, { size: 32 }) }), _jsx("h1", { className: "text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase", children: "Member Portal" }), _jsx("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mt-2", children: "Sign in to continue your career evolution." })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in shake duration-500", children: [_jsx(AlertCircle, { size: 18, className: "shrink-0" }), error] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 relative z-10", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1", children: "Email Address" }), _jsxs("div", { className: "relative group", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none", placeholder: "name@example.com" }), _jsx(Mail, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors", size: 18 })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center ml-1", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Security Key" }), _jsx("button", { type: "button", onClick: () => navigate('/forgot-password'), className: "text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors", children: "Forgot?" })] }), _jsxs("div", { className: "relative group", children: [_jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx(Lock, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors", size: 18 })] })] }), _jsx("button", { type: "submit", disabled: isPending, className: "w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group", children: isPending ? (_jsx(Loader2, { className: "animate-spin", size: 18 })) : (_jsxs(_Fragment, { children: ["Enter Dashboard ", _jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })] })) })] }), _jsx("footer", { className: "mt-10 pt-8 border-t border-slate-100 dark:border-slate-900 text-center relative z-10", children: _jsxs("p", { className: "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest", children: ["New to the platform?", ' ', _jsx("button", { onClick: () => navigate('/register'), className: "text-blue-600 hover:text-blue-700 transition-colors", children: "Create Account" })] }) })] }), _jsxs("div", { className: "mt-8 flex items-center justify-center gap-4 opacity-50", children: [_jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400", children: [_jsx(Sparkles, { size: 12 }), " AI Powered"] }), _jsx("div", { className: "w-1 h-1 bg-slate-300 rounded-full" }), _jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400", children: [_jsx(ShieldCheck, { size: 12 }), " Secure Access"] })] })] }) }));
};
