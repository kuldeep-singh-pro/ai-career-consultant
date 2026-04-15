import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useDashboardStats,
  useDashboardProgress,
} from "../hooks/useDashboard";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const { data: stats, isPending: statsLoading } =
    useDashboardStats(isAuthenticated);

  const { data: progress, isPending: progressLoading } =
    useDashboardProgress(isAuthenticated);

  const loading = statsLoading || progressLoading;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Here's your real-time career development progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Resume Skills Count */}
          <div className="bg-white rounded-lg border p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Resume Skills Identified
            </p>
            <p className="text-3xl font-bold mt-2">
              {stats?.resume?.skillsCount || 0}
            </p>
          </div>

          {/* Career Progress */}
          <div className="bg-white rounded-lg border p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Career Path Progress
            </p>
            <p className="text-3xl font-bold mt-2">
              {stats?.career?.overallProgress || 0}%
            </p>
          </div>

          {/* Skill Gap Missing Skills */}
          <div className="bg-white rounded-lg border p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Missing Skills
            </p>
            <p className="text-3xl font-bold mt-2">
              {stats?.skillGap?.missingSkillsCount || 0}
            </p>
          </div>

          {/* Average Learning Progress */}
          <div className="bg-white rounded-lg border p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Average Learning Progress
            </p>
            <p className="text-3xl font-bold mt-2">
              {progress?.overallStats?.averageProgress || 0}%
            </p>
          </div>

        </div>

        {/* Career Paths Summary */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Career Path Summary 📈
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Total Paths
              </p>
              <p className="text-xl font-semibold">
                {stats?.career?.totalPaths || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Active Paths
              </p>
              <p className="text-xl font-semibold">
                {stats?.career?.activePaths || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Completed Paths
              </p>
              <p className="text-xl font-semibold">
                {stats?.career?.completedPaths || 0}
              </p>
            </div>

          </div>
        </div>

        {/* Mentor Activity */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Mentor Activity 💬
          </h2>

          <p className="text-sm text-gray-600">
            Conversations:
            <span className="ml-2 font-semibold">
              {stats?.mentor?.totalConversations || 0}
            </span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Quick Actions ⚡
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => navigate("/resume-analyzer")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/skill-gap")}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Generate Skill Gap
            </button>

            <button
              onClick={() => navigate("/career-paths")}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Generate Career Path
            </button>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};