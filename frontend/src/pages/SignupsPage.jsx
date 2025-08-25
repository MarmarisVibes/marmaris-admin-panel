import { useEffect, useState } from 'react';
import { getSignups, updateSignup } from '../services/api';

const SignupsPage = () => {
  const [signups, setSignups] = useState([]);

  useEffect(() => {
    getSignups().then(setSignups);
  }, []);

  const handleApprove = (id) => {
    updateSignup(id, { status: 'approved' }).then(() => {
      setSignups(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    });
  };

  const handleReject = (id) => {
    updateSignup(id, { status: 'rejected' }).then(() => {
      setSignups(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Business Signups</h2>
      <div className="space-y-6">
        {signups.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-xl font-semibold">{s.businessName}</h3>
            <p className="text-gray-600">{s.contactPerson} • {s.email}</p>
            <p className="mt-2">
              <strong>Type:</strong> {s.businessType} ({s.venueTypes.join(', ')})
            </p>

            <h4 className="font-medium mt-4">Proposed Activities:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {s.proposedActivities.map((a, i) => (
                <li key={i}>{a.name} • {a.category} • {a.proposedPrice}</li>
              ))}
            </ul>

            <div className="mt-4">
              <h4 className="font-medium">Documents:</h4>
              {s.documents.map((doc) => (
                <div key={doc.type} className="text-sm">
                  {doc.type}: <span className={`capitalize ${
                    doc.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                  }`}>{doc.status}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleApprove(s.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                disabled={s.status !== 'pending'}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(s.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                disabled={s.status !== 'pending'}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignupsPage;