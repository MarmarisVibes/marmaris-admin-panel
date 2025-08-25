import { useEffect, useState } from 'react';
import { getMediaUploads, updateMediaUpload } from '../services/api';

const MediaUploadsPage = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    getMediaUploads().then(setUploads);
  }, []);

  const handleApprove = (id) => {
    updateMediaUpload(id, { status: 'approved' }).then(() => {
      setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
    });
  };

  const handleReject = (id) => {
    updateMediaUpload(id, { status: 'rejected' }).then(() => {
      setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' } : u));
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Media Uploads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((u) => (
          <div key={u.id} className="border rounded-lg overflow-hidden shadow">
            {u.type === 'photo' ? (
              <img src={u.url} alt={u.caption} className="w-full h-48 object-cover" />
            ) : (
              <video src={u.url} className="w-full h-48 object-cover" controls />
            )}
            <div className="p-4">
              <h3 className="font-medium">{u.caption}</h3>
              <p className="text-sm text-gray-600">{u.type} • {u.uploadDate}</p>
              <p className={`text-xs mt-1 capitalize ${
                u.status === 'approved' ? 'text-green-600' :
                u.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                Status: {u.status}
              </p>
              {u.status === 'pending' && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleApprove(u.id)}
                    className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(u.id)}
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUploadsPage;