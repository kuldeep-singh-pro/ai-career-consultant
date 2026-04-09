import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { OTPVerificationPage } from '../pages/OTPVerificationPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ResumeAnalyzerPage } from '../pages/ResumeAnalyzerPage';
import { SkillGapPage } from '../pages/SkillGapPage';
import { CareerPathsPage } from '../pages/CareerPathsPage';
import { RoadmapPage } from '../pages/RoadmapPage';
import { MentorChatPage } from '../pages/MentorChatPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp-verification" element={<OTPVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/resume-analyzer"
            element={
              <ProtectedRoute>
                <ResumeAnalyzerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill-gap"
            element={
              <ProtectedRoute>
                <SkillGapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/career-paths"
            element={
              <ProtectedRoute>
                <CareerPathsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <RoadmapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor-chat"
            element={
              <ProtectedRoute>
                <MentorChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
