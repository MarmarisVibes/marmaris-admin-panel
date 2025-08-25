import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../services/api';

const SettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const saveSettings = () => {
    updateSettings(settings).then(() => {
      alert('Settings saved!');
    });
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Business Approval</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.businessApproval.autoApprove}
            onChange={(e) => handleChange('businessApproval', 'autoApprove', e.target.checked)}
          />
          Auto-approve new businesses
        </label>
        <p className="text-sm text-gray-600 mt-2">
          Required documents: {settings.businessApproval.requiredDocuments.join(', ')}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Media Upload Limits</h3>
        <p>Max Photos: {settings.mediaUpload.maxPhotos}</p>
        <p>Max Videos: {settings.mediaUpload.maxVideos}</p>
        <p>Max Photo Size: {settings.mediaUpload.maxPhotoSize}</p>
        <p>Max Video Size: {settings.mediaUpload.maxVideoSize}</p>
        <p>Allowed Formats: {settings.mediaUpload.allowedFormats.join(', ')}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Review System</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.reviewSystem.allowAnonymousReviews}
            onChange={(e) => handleChange('reviewSystem', 'allowAnonymousReviews', e.target.checked)}
          />
          Allow anonymous reviews
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={settings.reviewSystem.requireVerification}
            onChange={(e) => handleChange('reviewSystem', 'requireVerification', e.target.checked)}
          />
          Require verification
        </label>
      </div>

      <button
        onClick={saveSettings}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
// Fix applied - July 25