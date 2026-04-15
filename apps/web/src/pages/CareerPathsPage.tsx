import { DashboardLayout } from "../layouts/DashboardLayout";

import {
  useCareerPaths,
  useGenerateCareerPath,
  useDeleteCareerPath,
} from "../hooks/useCareer";

import { useNavigate } from "react-router-dom";

export const CareerPathsPage: React.FC =
  () => {
    const {
      data: careerPaths,
      isPending,
    } = useCareerPaths();

    const {
      mutate: generateCareerPath,
      isPending: isGenerating,
    } = useGenerateCareerPath();

    const {
      mutate: deleteCareerPath,
    } = useDeleteCareerPath();

    const navigate =
      useNavigate();

    if (isPending)
      return (
        <div className="text-center py-12">
          Loading career paths...
        </div>
      );

    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Career Paths
            </h1>

            <button
              onClick={() =>
                generateCareerPath()
              }
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              {isGenerating
                ? "Generating..."
                : "Generate New Path"}
            </button>
          </div>

          {!careerPaths ||
          careerPaths.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              No career paths yet
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {careerPaths.map(
                (path: any) => (
                  <div
                    key={path._id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/career-paths/${path._id}`
                        )
                      }
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {
                          path.targetRole
                        }
                      </h3>

                      <p className="text-sm mb-2">
                        Current Role:{" "}
                        {
                          path.currentRole
                        }
                      </p>

                      <p className="text-sm mb-2">
                        Match:{" "}
                        {
                          path.matchPercentage
                        }
                        %
                      </p>

                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              path.totalProgress ??
                              0
                            }%`,
                          }}
                        />
                      </div>

                      <p className="text-xs text-right mt-1">
                        {Math.round(
                          path.totalProgress ??
                            0
                        )}
                        %
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() =>
                          deleteCareerPath(
                            path._id
                          )
                        }
                        className="px-4 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  };