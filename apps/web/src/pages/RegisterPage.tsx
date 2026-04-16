import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  Sparkles 
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mutate: registerMutate, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    registerMutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate('/otp-verification', { state: { email } });
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || 'Registration failed');
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <UserPlus size={120} />
          </div>

          <header className="text-center mb-8 relative z-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white mb-6 shadow-xl shadow-blue-500/20">
              <Sparkles size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Join Career AI
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
              Start your journey to professional mastery.
            </p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in shake duration-500">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl px-5 pl-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                  placeholder="Kuldeep Singh"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl px-5 pl-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl px-5 pl-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Verify</label>
                <div className="relative group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl px-5 pl-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-4"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-center relative z-10">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Already a member?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="text-blue-600 hover:text-blue-700 transition-colors font-black"
              >
                Sign In
              </button>
            </p>
          </footer>
        </div>
      </div>
    </AuthLayout>
  );
};