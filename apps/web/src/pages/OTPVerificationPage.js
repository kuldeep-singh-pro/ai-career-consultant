import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyOTP } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';
import { Fingerprint, ArrowLeft, ShieldCheck, Loader2, AlertCircle, Mail, Sparkles } from 'lucide-react';
export const OTPVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const { mutate: verifyOTP, isPending } = useVerifyOTP();
    if (!email) {
        navigate('/register');
        return null;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        verifyOTP({ email, otp }, {
            onSuccess: () => {
                navigate('/login', { state: { message: 'Email verified! You can now log in.' } });
            },
            onError: (error) => {
                setError(error.response?.data?.message || 'OTP verification failed');
            },
        });
    };
    return (_jsx(AuthLayout, { children: _jsxs("div", { className: "w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("div", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 relative overflow-hidden group", children: [_jsx("div", { className: "absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700", children: _jsx(Fingerprint, { size: 120 }) }), _jsxs("header", { className: "text-center mb-10 relative z-10", children: [_jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-6 shadow-xl shadow-blue-500/10", children: _jsx(Mail, { size: 32 }) }), _jsx("h1", { className: "text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase", children: "Verify Email" }), _jsxs("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mt-2", children: ["Security code sent to ", _jsx("span", { className: "text-blue-600 font-bold", children: email })] })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in shake duration-500", children: [_jsx(AlertCircle, { size: 18, className: "shrink-0" }), error] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8 relative z-10", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center block", children: "Authentication Code" }), _jsx("input", { type: "text", required: true, maxLength: 6, autoFocus: true, value: otp, onChange: (e) => setOtp(e.target.value.replace(/\D/g, '')), className: "w-full h-20 text-center text-4xl font-black tracking-[0.3em] bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800", placeholder: "000000" })] }), _jsx("button", { type: "submit", disabled: isPending, className: "w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2", children: isPending ? (_jsx(Loader2, { className: "animate-spin", size: 18 })) : (_jsxs(_Fragment, { children: ["Validate Code ", _jsx(ShieldCheck, { size: 16 })] })) })] }), _jsx("footer", { className: "mt-10 pt-8 border-t border-slate-100 dark:border-slate-900 text-center relative z-10", children: _jsxs("p", { className: "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest", children: ["Didn't receive the email?", ' ', _jsxs("button", { onClick: () => navigate('/register'), className: "text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1", children: [_jsx(ArrowLeft, { size: 12 }), " Back to Register"] })] }) })] }), _jsxs("div", { className: "mt-8 flex items-center justify-center gap-4 opacity-50", children: [_jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400", children: [_jsx(Sparkles, { size: 12 }), " Real-time Sync"] }), _jsx("div", { className: "w-1 h-1 bg-slate-300 rounded-full" }), _jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400", children: [_jsx(ShieldCheck, { size: 12 }), " Two-Factor Security"] })] })] }) }));
};
