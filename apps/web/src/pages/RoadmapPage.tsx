import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCareerPaths,
  useUpdateMilestone,
} from "../hooks/useCareer";

export const RoadmapPage: React.FC = () => {
  const { data: careerPaths, isPending } =
    useCareerPaths();

  const {
    mutate: updateMilestone,
    isPending: updating,
  } = useUpdateMilestone();

  if (isPending)
    return (
      <div className="text-center py-12">
        Loading roadmap...
      </div>
    );

  if (!careerPaths || careerPaths.length === 0)
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          No roadmap available
        </div>
      </DashboardLayout>
    );

  const path = careerPaths[0];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Career Roadmap
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">
            {path.targetRole}
          </h2>

          <div className="space-y-6">
            {path.milestones?.map(
              (milestone: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-start border-l-4 border-blue-500 pl-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {milestone.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {milestone.description}
                    </p>
                  </div>

                  <select
                    disabled={updating}
                    value={
                      milestone.completed
                        ? "Completed"
                        : "Pending"
                    }
                    onChange={(e) =>
                      updateMilestone({
                        careerPathId: path._id,
                        milestoneIndex: index,
                        completed:
                          e.target.value ===
                          "Completed",
                      })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>
              )
            )}
          </div>

          <div className="mt-8">
            <div className="text-sm mb-2">
              Progress
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${path.totalProgress || 0}%`,
                }}
              />
            </div>

            <div className="text-right text-xs mt-1">
              {Math.round(
                path.totalProgress || 0
              )}
              %
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};  