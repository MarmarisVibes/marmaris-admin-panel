import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Businesses', path: '/businesses' },
    { name: 'Signups', path: '/signups' },
    { name: 'Media Uploads', path: '/media-uploads' },
    { name: 'Review Reports', path: '/review-reports' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded transition ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;