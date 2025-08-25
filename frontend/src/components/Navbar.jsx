import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Marmaris Admin</h1>
          <div className="text-sm text-gray-600">Welcome, Admin</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;