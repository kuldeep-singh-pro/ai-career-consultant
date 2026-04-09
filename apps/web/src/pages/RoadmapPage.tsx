import { DashboardLayout } from '../layouts/DashboardLayout';
import { useRoadmaps, useGenerateRoadmap, useUpdateMilestone } from '../hooks/useCareer';
import { useCareerPaths } from '../hooks/useCareer';
import { useState } from 'react';

export const RoadmapPage: React.FC = () => {
  const { data: roadmaps, isPending } = useRoadmaps();
  const { data: careerPaths } = useCareerPaths(true);
  const { mutate: generateRoadmap, isPending: isGenerating } = useGenerateRoadmap();
  const { mutate: updateMilestone } = useUpdateMilestone();
  const [selectedPathId, setSelectedPathId] = useState<string>('');

  if (isPending) return <div className="text-center py-12">Loading roadmaps...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Career Roadmap</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Select Career Path</label>
              <select
                value={selectedPathId}
                onChange={(e) => setSelectedPathId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
              >
                <option value="">Choose a path...</option>
                {careerPaths?.map((path) => (
                  <option key={path.id} value={path.id}>
                    {path.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => selectedPathId && generateRoadmap(selectedPathId)}
              disabled={isGenerating || !selectedPathId}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400"
            >
              {isGenerating ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(!roadmaps || roadmaps.length === 0) ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">No roadmaps yet</p>
            </div>
          ) : (
            roadmaps.map((roadmap) => (
              <div key={roadmap.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{roadmap.title}</h2>
                <div className="space-y-4">
                  {roadmap.milestones?.map((milestone) => (
                    <div key={milestone.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">Milestone {milestone.number}: {milestone.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{milestone.description}</p>
                          <p className="text-xs text-slate-500 mt-1">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                        </div>
                        <select
                          value={milestone.status}
                          onChange={(e) =>
                            updateMilestone({ roadmapId: roadmap.id, milestoneId: milestone.id, status: e.target.value })
                          }
                          className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Progress</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${roadmap.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1">{roadmap.progress || 0}%</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
