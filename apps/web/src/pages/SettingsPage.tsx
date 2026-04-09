import { DashboardLayout } from '../layouts/DashboardLayout';
import { useSettings, useUpdateSettings, useDeleteAccount } from '../hooks/useSettings';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { data: settings, isPending } = useSettings();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  if (isPending) return <div className="text-center py-12">Loading settings...</div>;

  const handleUpdate = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    updateSettings(formData);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      deleteAccount(undefined, {
        onSuccess: () => {
          logout();
          navigate('/');
        },
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications !== false ? settings?.emailNotifications : false}
                  onChange={(e) => handleUpdate('emailNotifications', e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.pushNotifications !== false ? settings?.pushNotifications : false}
                  onChange={(e) => handleUpdate('pushNotifications', e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Push Notifications</span>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <select
                  value={formData.theme || settings?.theme || 'auto'}
                  onChange={(e) => handleUpdate('theme', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={formData.language || settings?.language || 'en'}
                  onChange={(e) => handleUpdate('language', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Privacy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                <select
                  value={formData.profileVisibility || settings?.privacy?.profileVisibility || 'private'}
                  onChange={(e) => handleUpdate('profileVisibility', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 mr-3"
            >
              {isUpdating ? 'Saving...' : 'Save Settings'}
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-400"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
