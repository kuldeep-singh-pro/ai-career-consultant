import { DashboardLayout } from '../layouts/DashboardLayout';
import { useCareerPaths, useGenerateCareerPath } from '../hooks/useCareer';
import { useNavigate } from 'react-router-dom';

export const CareerPathsPage: React.FC = () => {
  const { data: careerPaths, isPending } = useCareerPaths();
  const { mutate: generateCareerPath, isPending: isGenerating } = useGenerateCareerPath();
  const navigate = useNavigate();

  if (isPending) return <div className="text-center py-12">Loading career paths...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Career Paths</h1>
          <button
            onClick={() => generateCareerPath()}
            disabled={isGenerating}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400"
          >
            {isGenerating ? 'Generating...' : 'Generate New Path'}
          </button>
        </div>

        {(!careerPaths || careerPaths.length === 0) ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No career paths yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((path) => (
              <div key={path.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/career-paths/${path.id}`)}>
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{path.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Duration: {path.estimatedDuration}</span>
                  <span className="text-blue-600">{path.steps?.length || 0} steps</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
