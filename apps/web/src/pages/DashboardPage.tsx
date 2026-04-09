import { DashboardLayout } from '../layouts/DashboardLayout';
import { useDashboardStats, useDashboardProgress } from '../hooks/useDashboard';
import { useSkillGap } from '../hooks/useSkillGap';
import { useRoadmaps } from '../hooks/useCareer';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { data: stats, isPending: statsLoading } = useDashboardStats(isAuthenticated);
  const { data: progress, isPending: progressLoading } = useDashboardProgress(isAuthenticated);
  const { data: skillGap } = useSkillGap(isAuthenticated);
  const { data: roadmaps } = useRoadmaps(isAuthenticated);

  const loading = isAuthenticated && (statsLoading || progressLoading);

  const demoStats = {
    totalResumes: 87,
    overallProgress: 72,
  };

  const demoProgress = {
    overallProgress: 72,
  };

  const demoSkillGap = {
    analysis: {
      currentSkills: ['React', 'TypeScript', 'Node.js'],
    },
  };

  const demoRoadmaps = [
    {
      title: 'Full Stack Engineer Path',
      milestones: [
        { title: 'Advanced React Patterns', status: 'in-progress' },
        { title: 'System Design', status: 'pending' },
      ],
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const displayStats = isAuthenticated ? stats : demoStats;
  const displayProgress = isAuthenticated ? progress : demoProgress;
  const displaySkillGap = isAuthenticated ? skillGap : demoSkillGap;
  const displayRoadmaps = isAuthenticated ? roadmaps : demoRoadmaps;
  const displayName = user?.name ?? 'John';

  const nextMilestone = displayRoadmaps?.[0]?.milestones?.find((m: any) => m.status !== 'completed');
  const recentActivity = [
    { icon: '📄', title: 'Uploaded new resume', time: '2 hours ago' },
    { icon: '✅', title: 'Completed: React Hooks Deep Dive', time: '1 day ago' },
    { icon: '🗺️', title: 'Generated career roadmap', time: '3 days ago' },
    { icon: '📚', title: 'Started: System Design course', time: '1 week ago' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {displayName}!</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Here's your career development progress and next steps
            </p>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg w-64"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Resume Score</p>
                <p className="text-3xl font-bold mt-2">{displayStats?.totalResumes || 0}%</p>
                <p className="text-xs text-orange-600 mt-1">⚠️ Room for improvement</p>
              </div>
              <div className="text-3xl">📄</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Profile Completion</p>
                <p className="text-3xl font-bold mt-2">{displayProgress?.overallProgress || 0}%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Complete your profile</p>
              </div>
              <div className="text-3xl">👤</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Skills Identified</p>
                <p className="text-3xl font-bold mt-2">{displaySkillGap?.analysis?.currentSkills?.length || 0}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">From your resume</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Career Path Progress</p>
                <p className="text-3xl font-bold mt-2">{displayStats?.overallProgress || 0}%</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">On track to next milestone</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Resume Analysis</h2>
              <button
                onClick={() => navigate('/resume-analyzer')}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
              >
                Re-analyze
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Last analyzed 2 days ago</p>

            <div className="space-y-4">
              {['React', 'TypeScript', 'Node.js'].map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill}</span>
                    <span className="text-sm text-slate-600">
                      {[85, 72, 68][idx]}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${[85, 72, 68][idx]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/resume-analyzer')}
              className="mt-6 text-blue-600 text-sm font-medium hover:underline"
            >
              Improve Your Resume →
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-6">Skill Match</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${(72 / 100) * 283}`}
                    strokeDashoffset="0"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold">72%</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                Target Role Match
              </p>
              <button
                onClick={() => navigate('/skill-gap')}
                className="mt-4 text-blue-600 text-sm font-medium hover:underline"
              >
                View Gap Analysis
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-4">Recommended Career Roles</h2>
            <div className="space-y-3">
              {['Frontend Developer', 'Full Stack Engineer', 'UI/UX Developer'].map((role, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                  <span className="text-sm">{role}</span>
                  <span className="text-sm font-medium text-slate-600">{[92, 85, 78][idx]}%</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/career-paths')}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Explore Paths
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/resume-analyzer')}
                className="w-full text-left px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
              >
                📤 Upload Resume
              </button>
              <button
                onClick={() => navigate('/roadmap')}
                className="w-full text-left px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
              >
                🗺️ Generate Roadmap
              </button>
              <button
                onClick={() => navigate('/mentor-chat')}
                className="w-full text-left px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
              >
                👁️ View Schedule
              </button>
            </div>
          </div>
        </div>

        {nextMilestone && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Next Milestone</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              {nextMilestone.title}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Complete Advanced React course to unlock Full Stack Engineer path
            </p>
            <button
              onClick={() => navigate('/roadmap')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Continue Learning
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
            <div className="space-y-4">
              {[
                { title: 'Advanced React Patterns', progress: 60, days: '15 days to complete' },
                { title: 'System Design', progress: 40, days: '30 days to complete' },
                { title: 'DevOps Fundamentals', progress: 25, days: '45 days to complete' },
              ].map((course, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-xs text-slate-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{course.days}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                  <span className="text-lg">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
