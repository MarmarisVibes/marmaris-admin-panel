import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import BusinessesPage from './pages/BusinessesPage';
import SignupsPage from './pages/SignupsPage';
import MediaUploadsPage from './pages/MediaUploadsPage';
import ReviewReportsPage from './pages/ReviewReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/businesses" element={<BusinessesPage />} />
              <Route path="/signups" element={<SignupsPage />} />
              <Route path="/media-uploads" element={<MediaUploadsPage />} />
              <Route path="/review-reports" element={<ReviewReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;