import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCurrentUser,
  useUpdateUser
} from "../hooks/useUser";

import {
  useState,
  useEffect
} from "react";

export const UserPage: React.FC =
() =>
{
  const {
    data: user,
    isPending
  } =
  useCurrentUser();

  const {
    mutate: updateUser,
    isPending: isUpdating
  } =
  useUpdateUser();

  const [
    isEditing,
    setIsEditing
  ] =
  useState(false);

  const [
    name,
    setName
  ] =
  useState("");

  useEffect(() =>
  {
    if (!user) return;

    setName(
      user.name ?? ""
    );

  }, [user]);

  if (isPending)
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-slate-700 dark:text-slate-300">
          Loading user...
        </div>
      </DashboardLayout>
    );

  const firstLetter =
    user?.name?.charAt(0).toUpperCase() || "U";

  const handleSave =
  () =>
  {
    updateUser(
      { name },
      {
        onSuccess:
        () =>
        {
          setIsEditing(false);
        }
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto text-slate-900 dark:text-white">

        <h1 className="text-3xl font-bold mb-8">
          User Profile
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">

          <div className="flex items-center gap-6 mb-8">

            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold shadow">
              {firstLetter}
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-slate-600 dark:text-slate-300">
                {user?.email}
              </p>

              <p className="text-sm text-slate-400">
                Role: {user?.role}
              </p>

            </div>

          </div>

          {!isEditing ? (

            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Name
            </button>

          ) : (

            <div className="space-y-4">

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"
              />

              <div className="flex gap-4">

                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isUpdating
                    ? "Saving..."
                    : "Save"}
                </button>

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
};