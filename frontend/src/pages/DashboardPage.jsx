import DashboardStats from '../components/DashboardStats';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <ul className="space-y-2">
            <li><Link to="/signups" className="text-blue-600 hover:underline">Review Business Signups</Link></li>
            <li><Link to="/media-uploads" className="text-blue-600 hover:underline">Approve Media Uploads</Link></li>
            <li><Link to="/review-reports" className="text-blue-600 hover:underline">Handle Review Reports</Link></li>
            <li><Link to="/settings" className="text-blue-600 hover:underline">Update Platform Settings</Link></li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Aqua Restaurant uploaded a new video</li>
            <li>• Review reported for Sunset Beach Hotel</li>
            <li>• New signup: Adventure Tours Marmaris</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
// Fix applied - July 25