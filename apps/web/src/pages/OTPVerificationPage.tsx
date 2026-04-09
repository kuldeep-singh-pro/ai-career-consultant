import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyOTP } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';

export const OTPVerificationPage: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    verifyOTP(
      { email, otp },
      {
        onSuccess: () => {
          navigate('/login', { state: { message: 'Email verified! You can now log in.' } });
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || 'OTP verification failed');
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Verify Email</h1>
        <p className="text-center text-slate-600 mb-6">Enter the 6-digit OTP sent to {email}</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400"
          >
            {isPending ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Didn't receive OTP?{' '}
          <button onClick={() => navigate('/register')} className="text-blue-600 hover:underline">
            Back to Register
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
