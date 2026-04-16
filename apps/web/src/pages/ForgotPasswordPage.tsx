import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import axiosInstance from '../api/axiosInstance';
import { 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  AlertCircle,
  ChevronRight,
  Fingerprint
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axiosInstance.post('/auth/request-otp', { email });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <KeyRound size={120} />
          </div>

          <header className="text-center mb-10 relative z-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-6 shadow-sm">
              {step === 'email' && <Mail size={28} />}
              {step === 'otp' && <Fingerprint size={28} />}
              {step === 'reset' && <ShieldCheck size={28} />}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {step === 'email' && 'Reset Access'}
              {step === 'otp' && 'Verify Identity'}
              {step === 'reset' && 'Secure Account'}
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
              {step === 'email' && 'Enter your email to receive recovery instructions.'}
              {step === 'otp' && `Enter the 6-digit code sent to ${email}.`}
              {step === 'reset' && 'Create a strong, unique password for your account.'}
            </p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in shake duration-500">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="relative z-10">
            {step === 'email' && (
              <form onSubmit={handleRequestOTP} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Account Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                      placeholder="name@company.com"
                    />
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Request OTP'}
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center block">Authentication Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-20 text-center text-4xl font-black tracking-[0.3em] bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder="000000"
                  />
                </div>
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                  >
                    Confirm Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="w-full h-14 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    Resend Email
                  </button>
                </div>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Verify Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl px-6 pl-14 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : 'Confirm New Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('otp')}
                    className="w-full h-14 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all"
                  >
                    Back to OTP
                  </button>
                </div>
              </form>
            )}
          </div>

          <footer className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-900 text-center relative z-10">
            <button 
              onClick={() => navigate('/login')} 
              className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Return to Login
            </button>
          </footer>
        </div>
        
        <p className="mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
          Secure End-to-End Encryption <ShieldCheck size={12} />
        </p>
      </div>
    </AuthLayout>
  );
};