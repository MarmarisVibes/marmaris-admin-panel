import { useEffect, useState } from 'react';
import { getReviewReports, updateReviewReport } from '../services/api';

const ReviewReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReviewReports().then(setReports);
  }, []);

  const handleResolve = (id) => {
    updateReviewReport(id, { status: 'resolved' }).then(() => {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Review Reports</h2>
      <div className="space-y-6">
        {reports.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold">Report #{r.id} - {r.reason}</h3>
            <p><strong>Review ID:</strong> {r.reviewId}</p>
            <p><strong>Reported By:</strong> {r.reportedBy}</p>
            <p><strong>Description:</strong> {r.description}</p>
            <p><strong>Date:</strong> {r.reportedDate}</p>
            <p className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
              r.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
              r.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {r.status}
            </p>
            {r.status === 'under_review' && (
              <button
                onClick={() => handleResolve(r.id)}
                className="ml-3 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewReportsPage;
// Fix applied - July 25