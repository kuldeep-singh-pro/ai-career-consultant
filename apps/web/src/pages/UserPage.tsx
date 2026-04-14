import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useCurrentUser,
  useUpdateUser,
  useUploadProfilePicture,
} from "../hooks/useUser";
import { useState } from "react";

export const UserPage: React.FC = () => {
  const { data: user, isPending } = useCurrentUser();
  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUser();
  const { mutate: uploadPicture } =
    useUploadProfilePicture();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  if (isPending)
    return (
      <div className="text-center py-12">
        Loading user...
      </div>
    );

  const handleEdit = () => {
    setName(user?.name || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(
      { name },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handlePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) uploadPicture(file);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          User Profile
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={
                  user?.profilePicture ||
                  "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />

              <label
                htmlFor="picture-input"
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer"
              >
                📷
              </label>

              <input
                id="picture-input"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="hidden"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-slate-600">
                {user?.email}
              </p>

              <p className="text-sm text-slate-400">
                Role: {user?.role}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit Name
            </button>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isUpdating
                    ? "Saving..."
                    : "Save"}
                </button>

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="px-6 py-2 bg-slate-600 text-white rounded-lg"
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