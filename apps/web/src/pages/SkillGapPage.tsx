import { DashboardLayout } from "../layouts/DashboardLayout";
import { useSkillGap, useGenerateSkillGap } from "../hooks/useSkillGap";
import { useState } from "react";

export const SkillGapPage: React.FC = () => {
  const [targetRole, setTargetRole] = useState("");

  const { data: skillGap, isPending } = useSkillGap();

  const {
    mutate: generateSkillGap,
    isPending: isGenerating,
  } = useGenerateSkillGap();

  if (isPending)
    return (
      <div className="text-center py-12">
        Loading skill gap analysis...
      </div>
    );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Skill Gap Analysis
        </h1>

        {!skillGap ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
            <input
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              placeholder="Enter target role"
              className="border rounded px-4 py-2 mb-4 w-full"
            />

            <button
              onClick={() =>
                generateSkillGap(targetRole)
              }
              disabled={
                isGenerating || !targetRole
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400"
            >
              {isGenerating
                ? "Generating..."
                : "Generate Analysis"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Current Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {skillGap.currentSkills?.map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {skillGap.missingSkills?.map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Learning Plan
              </h2>

              <ul className="list-disc list-inside space-y-2 text-sm">
                {skillGap.learningPlan?.map(
                  (item, idx) => (
                    <li key={idx}>
                      {item.skill} —{" "}
                      {item.priority} priority (
                      {item.weeks} weeks)
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};