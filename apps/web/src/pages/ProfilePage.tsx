import { DashboardLayout } from '../layouts/DashboardLayout';
import { useProfile, useUpdateProfile, useUploadProfilePicture } from '../hooks/useProfile';
import { useState } from 'react';

export const ProfilePage: React.FC = () => {
  const { data: profile, isPending } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadPicture, isPending: isUploading } = useUploadProfilePicture();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  if (isPending) return <div className="text-center py-12">Loading profile...</div>;

  const handleEdit = () => {
    setFormData(profile || {});
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPicture(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={profile?.profilePicture || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <label htmlFor="picture-input" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">
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
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile?.bio || 'Your Name'}</h2>
              <p className="text-slate-600 dark:text-slate-400">{profile?.phone}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <p className="text-slate-600 dark:text-slate-400">{profile?.bio || 'No bio added'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <p className="text-slate-600 dark:text-slate-400">{profile?.location || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <p className="text-slate-600 dark:text-slate-400">{profile?.linkedinUrl || 'Not added'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <p className="text-slate-600 dark:text-slate-400">{profile?.githubUrl || 'Not added'}</p>
              </div>
              <button
                onClick={handleEdit}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
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
