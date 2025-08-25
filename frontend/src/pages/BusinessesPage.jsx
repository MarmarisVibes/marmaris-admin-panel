import { useEffect, useState } from 'react';
import { getBusinesses } from '../services/api';
import { Link } from 'react-router-dom';

const BusinessesPage = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    getBusinesses().then(setBusinesses);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Businesses</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Business
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((b) => (
          <div key={b.id} className="border rounded-lg overflow-hidden shadow">
            <img
              src={b.media?.photos?.[0]?.url || 'https://via.placeholder.com/300x200'}
              alt={b.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{b.name}</h3>
              <p className="text-sm text-gray-600">{b.type} • {b.location.area}</p>
              <p className="mt-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  b.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {b.status}
                </span>
                <span className="ml-2">⭐ {b.rating}</span>
              </p>
              <Link
                to={`/businesses/${b.id}`}
                className="text-blue-600 text-sm mt-3 block hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessesPage;
// Fix applied - July 25