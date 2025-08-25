import { useEffect, useState } from 'react';
import { getBusinesses, getSignups, getMediaUploads, getReviewReports } from '../services/api';

const DashboardStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    Promise.all([
      getBusinesses(),
      getSignups(),
      getMediaUploads(),
      getReviewReports(),
    ]).then(([businesses, signups, media, reports]) => {
      setStats({
        totalBusinesses: businesses.length,
        pendingSignups: signups.filter(s => s.status === 'pending').length,
        pendingMedia: media.filter(m => m.status === 'pending').length,
        underReviewReports: reports.filter(r => r.status === 'under_review').length,
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Businesses', value: stats.totalBusinesses, color: 'blue' },
        { label: 'Pending Signups', value: stats.pendingSignups, color: 'yellow' },
        { label: 'Media to Approve', value: stats.pendingMedia, color: 'indigo' },
        { label: 'Reviews Under Review', value: stats.underReviewReports, color: 'red' },
      ].map((stat) => (
        <div key={stat.label} className={`bg-${stat.color}-100 p-6 rounded-lg shadow`}>
          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2 text-${stat.color}-700">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;