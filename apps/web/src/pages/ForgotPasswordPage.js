import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import axiosInstance from '../api/axiosInstance';
import { KeyRound, Mail, Lock, ArrowLeft, ShieldCheck, Loader2, AlertCircle, Fingerprint } from 'lucide-react';
export const ForgotPasswordPage = () => {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axiosInstance.post('/auth/request-otp', { email });
            setStep('otp');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to request OTP');
        }
        finally {
            setLoading(false);
        }
    };
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setError('');
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        setStep('reset');
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.post('/auth/reset-password', {
                email,
                newPassword,
            });
            navigate('/login', { state: { message: 'Password reset successful!' } });
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(AuthLayout, { children: _jsxs("div", { className: "w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("div", { className: "bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 relative overflow-hidden group", children: [_jsx("div", { className: "absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700", children: _jsx(KeyRound, { size: 120 }) }), _jsxs("header", { className: "text-center mb-10 relative z-10", children: [_jsxs("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-6 shadow-sm", children: [step === 'email' && _jsx(Mail, { size: 28 }), step === 'otp' && _jsx(Fingerprint, { size: 28 }), step === 'reset' && _jsx(ShieldCheck, { size: 28 })] }), _jsxs("h1", { className: "text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase", children: [step === 'email' && 'Reset Access', step === 'otp' && 'Verify Identity', step === 'reset' && 'Secure Account'] }), _jsxs("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mt-2", children: [step === 'email' && 'Enter your email to receive recovery instructions.', step === 'otp' && `Enter the 6-digit code sent to ${email}.`, step === 'reset' && 'Create a strong, unique password for your account.'] })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in shake duration-500", children: [_jsx(AlertCircle, { size: 18, className: "shrink-0" }), error] })), _jsxs("div", { className: "relative z-10", children: [step === 'email' && (_jsxs("form", { onSubmit: handleRequestOTP, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1", children: "Account Email" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none", placeholder: "name@company.com" }), _jsx(Mail, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400", size: 18 })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2", children: loading ? _jsx(Loader2, { className: "animate-spin", size: 18 }) : 'Request OTP' })] })), step === 'otp' && (_jsxs("form", { onSubmit: handleVerifyOTP, className: "space-y-8", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center block", children: "Authentication Code" }), _jsx("input", { type: "text", required: true, maxLength: 6, autoFocus: true, value: otp, onChange: (e) => setOtp(e.target.value.replace(/\D/g, '')), className: "w-full h-20 text-center text-4xl font-black tracking-[0.3em] bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all", placeholder: "000000" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { type: "submit", className: "w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95", children: "Confirm Code" }), _jsx("button", { type: "button", onClick: () => setStep('email'), className: "w-full h-14 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900", children: "Resend Email" })] })] })), step === 'reset' && (_jsxs("form", { onSubmit: handleResetPassword, className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1", children: "New Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "password", required: true, value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx(Lock, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400", size: 18 })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1", children: "Verify Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx(ShieldCheck, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400", size: 18 })] })] })] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsx("button", { type: "submit", disabled: loading, className: "w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2", children: loading ? _jsx(Loader2, { className: "animate-spin", size: 18 }) : 'Confirm New Password' }), _jsx("button", { type: "button", onClick: () => setStep('otp'), className: "w-full h-14 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all", children: "Back to OTP" })] })] }))] }), _jsx("footer", { className: "mt-10 pt-8 border-t border-slate-100 dark:border-slate-900 text-center relative z-10", children: _jsxs("button", { onClick: () => navigate('/login'), className: "group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors", children: [_jsx(ArrowLeft, { size: 14, className: "group-hover:-translate-x-1 transition-transform" }), "Return to Login"] }) })] }), _jsxs("p", { className: "mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2", children: ["Secure End-to-End Encryption ", _jsx(ShieldCheck, { size: 12 })] })] }) }));
};
