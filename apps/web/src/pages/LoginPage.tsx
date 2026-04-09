import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layouts/AuthLayout';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { mutate: loginMutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          navigate('/dashboard');
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || 'Login failed');
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-blue-600 hover:underline">
            Register
          </button>
        </p>

        <p className="mt-3 text-center text-sm text-slate-600">
          Forgot password?{' '}
          <button onClick={() => navigate('/forgot-password')} className="text-blue-600 hover:underline">
            Reset here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
