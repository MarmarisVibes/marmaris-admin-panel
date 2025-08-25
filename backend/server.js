<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MarmarisVibes Admin Dashboard</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
        .loading { display: flex; justify-content: center; align-items: center; height: 100vh; }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    </div>
    
    <script type="text/babel">
        const { useState, useRef, useEffect } = React;
        // Get icons from the global lucide object
        const { 
            Upload, Download, Users, MapPin, Star, Calendar, TrendingUp, Database,
            FileSpreadsheet, CheckCircle, AlertCircle, Eye, Edit, Trash2, Plus,
            Filter, Search, BarChart3, Gem, Hotel, Camera, Activity, ShoppingBag
        } = lucide;
        
        const MarmarisAdminDashboard = () => {
            const [activeTab, setActiveTab] = useState('dashboard');
            const [businesses, setBusinesses] = useState([]);
            const [arGems, setArGems] = useState([]);
            const [users, setUsers] = useState([]);
            const [bookings, setBookings] = useState([]);
            const [analytics, setAnalytics] = useState({});
            const [uploadStatus, setUploadStatus] = useState('');
            const [searchTerm, setSearchTerm] = useState('');
            const [filterType, setFilterType] = useState('all');
            const [loading, setLoading] = useState(false);
            const fileInputRef = useRef(null);
            
            useEffect(() => {
                initializeDemoData();
            }, []);
            
            const initializeDemoData = () => {
                setBusinesses([
                    { id: 1, name: 'Sunset Beach Hotel', type: 'hotel', rating: 4.5, location: 'Marmaris Bay', status: 'active', gems: 3, phone: '+90 252 412 1234', email: 'info@sunsetbeach.com' },
                    { id: 2, name: 'Aqua Restaurant', type: 'restaurant', rating: 4.2, location: 'Marina District', status: 'active', gems: 2, phone: '+90 252 412 5678', email: 'contact@aquarestaurant.com' },
                    { id: 3, name: 'Adventure Tours Marmaris', type: 'activity', rating: 4.8, location: 'Old Town', status: 'pending', gems: 5, phone: '+90 252 412 9012', email: 'bookings@adventuretours.com' },
                    { id: 4, name: 'Marina Yacht Club', type: 'activity', rating: 4.6, location: 'Marmaris Marina', status: 'active', gems: 4, phone: '+90 252 412 3456', email: 'info@marinayacht.com' },
                    { id: 5, name: 'Turkish Delight Cafe', type: 'restaurant', rating: 4.3, location: 'Bazaar Street', status: 'active', gems: 2, phone: '+90 252 412 7890', email: 'hello@turkishdelight.com' }
                ]);
                setArGems([
                    { id: 1, name: 'Ruby Sunset', rarity: 'legendary', location: 'Castle Hill', points: 500, collected: 23, active: true },
                    { id: 2, name: 'Marina Sapphire', rarity: 'rare', location: 'Marina', points: 200, collected: 45, active: true },
                    { id: 3, name: 'Beach Crystal', rarity: 'common', location: 'Main Beach', points: 50, collected: 127, active: true },
                    { id: 4, name: 'Ancient Emerald', rarity: 'legendary', location: 'Castle Ruins', points: 750, collected: 8, active: true },
                    { id: 5, name: 'Harbor Diamond', rarity: 'rare', location: 'Old Harbor', points: 300, collected: 34, active: true }
                ]);
                setUsers([
                    { id: 1, name: 'John Smith', email: 'john@email.com', tier: 'Gold', points: 2500, gems: 15, joinDate: '2024-01-15', status: 'active' },
                    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', tier: 'Silver', points: 1200, gems: 8, joinDate: '2024-02-20', status: 'active' },
                    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', tier: 'Bronze', points: 650, gems: 4, joinDate: '2024-03-10', status: 'active' },
                    { id: 4, name: 'Emma Davis', email: 'emma@email.com', tier: 'Gold', points: 3200, gems: 22, joinDate: '2023-12-05', status: 'active' },
                    { id: 5, name: 'Alex Thompson', email: 'alex@email.com', tier: 'Silver', points: 1800, gems: 12, joinDate: '2024-01-30', status: 'active' }
                ]);
                setBookings([
                    { id: 1, user: 'John Smith', business: 'Sunset Beach Hotel', date: '2024-08-20', status: 'confirmed', amount: '€150', type: 'hotel' },
                    { id: 2, user: 'Sarah Johnson', business: 'Adventure Tours Marmaris', date: '2024-08-18', status: 'pending', amount: '€75', type: 'activity' },
                    { id: 3, user: 'Mike Wilson', business: 'Aqua Restaurant', date: '2024-08-19', status: 'completed', amount: '€45', type: 'restaurant' },
                    { id: 4, user: 'Emma Davis', business: 'Marina Yacht Club', date: '2024-08-21', status: 'confirmed', amount: '€200', type: 'activity' },
                    { id: 5, user: 'Alex Thompson', business: 'Turkish Delight Cafe', date: '2024-08-17', status: 'completed', amount: '€32', type: 'restaurant' }
                ]);
                setAnalytics({ totalUsers: 1247, totalBusinesses: 84, totalGems: 156, totalBookings: 523, revenue: 12450, activeUsers: 892 });
            };
            
            const handleFileUpload = async (event) => {
                const file = event.target.files[0];
                if (!file) return;
                setLoading(true);
                setUploadStatus('uploading');
                
                try {
                    const data = await file.arrayBuffer();
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    const newBusinesses = jsonData.map((row, index) => ({
                        id: businesses.length + index + 1,
                        name: row.name || row.business_name || row.Name || 'Unknown Business',
                        type: row.type || row.category || row.Type || 'other',
                        rating: parseFloat(row.rating || row.stars || Math.random() * 5),
                        location: row.location || row.address || row.Location || 'Marmaris',
                        status: 'pending',
                        gems: Math.floor(Math.random() * 5) + 1,
                        phone: row.phone || row.telephone || row.Phone || '',
                        email: row.email || row.Email || '',
                        description: row.description || row.Description || ''
                    }));
                    setBusinesses(prev => [...prev, ...newBusinesses]);
                    setUploadStatus('success');
                } catch (error) {
                    console.error('Error processing file:', error);
                    setUploadStatus('error');
                } finally {
                    setLoading(false);
                    setTimeout(() => setUploadStatus(''), 3000);
                    event.target.value = '';
                }
            };
            
            const downloadTemplate = () => {
                const template = [
                    { name: 'Sample Hotel', type: 'hotel', rating: 4.5, location: 'Marmaris Marina', phone: '+90 252 123 4567', email: 'info@samplehotel.com', description: 'Luxury beachfront hotel' },
                    { name: 'Sample Restaurant', type: 'restaurant', rating: 4.2, location: 'Old Town', phone: '+90 252 765 4321', email: 'contact@samplerest.com', description: 'Traditional Turkish cuisine' },
                    { name: 'Sample Activity', type: 'activity', rating: 4.8, location: 'Marmaris Center', phone: '+90 252 555 1234', email: 'bookings@sampleactivity.com', description: 'Water sports and tours' }
                ];
                
                const ws = XLSX.utils.json_to_sheet(template);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Businesses');
                XLSX.writeFile(wb, 'marmaris_business_template.xlsx');
            };
            
            const filteredBusinesses = businesses.filter(business => {
                const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || business.location.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesFilter = filterType === 'all' || business.type === filterType;
                return matchesSearch && matchesFilter;
            });
            
            const getTypeIcon = (type) => {
                switch (type) {
                    case 'hotel': return Hotel;
                    case 'restaurant': return ShoppingBag;
                    case 'activity': return Activity;
                    default: return Database;
                }
            };
            
            return (
                <div className="min-h-screen bg-gray-100">
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center">
                                    <Camera className="w-8 h-8 text-blue-600 mr-3" />
                                    <h1 className="text-2xl font-bold text-gray-900">MarmarisVibes Admin</h1>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">Welcome, Admin</span>
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">A</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <nav className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex space-x-8 overflow-x-auto">
                                {[
                                    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                                    { id: 'businesses', name: 'Businesses', icon: Database },
                                    { id: 'ar-gems', name: 'AR Gems', icon: Gem },
                                    { id: 'users', name: 'Users', icon: Users },
                                    { id: 'bookings', name: 'Bookings', icon: Calendar }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                            activeTab === tab.id 
                                                ? 'border-blue-500 text-blue-600' 
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <tab.icon size={20} className="mr-2" />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>
                    
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {activeTab === 'dashboard' ? (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                                <Users size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                                <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                                <Hotel size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Businesses</p>
                                                <p className="text-2xl font-bold text-gray-900">{businesses.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                                <Gem size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">AR Gems</p>
                                                <p className="text-2xl font-bold text-gray-900">{arGems.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                                <Calendar size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Bookings</p>
                                                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                                        <div className="space-y-3">
                                            {bookings.slice(0, 5).map((booking) => (
                                                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{booking.user}</p>
                                                        <p className="text-sm text-gray-600">{booking.business}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-gray-900">{booking.amount}</p>
                                                        <p className="text-sm text-gray-600">{booking.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top AR Gem Collectors</h3>
                                        <div className="space-y-3">
                                            {users
                                                .sort((a, b) => b.gems - a.gems)
                                                .slice(0, 5)
                                                .map((user, index) => (
                                                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center">
                                                            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm rounded-full mr-3">
                                                                {index + 1}
                                                            </span>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                                <p className="text-sm text-gray-600">{user.tier} Member</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">{user.gems} gems</p>
                                                            <p className="text-sm text-gray-600">{user.points} pts</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'businesses' ? (
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Business Directory</h2>
                                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Search businesses..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <select
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="all">All Types</option>
                                                <option value="hotel">Hotels</option>
                                                <option value="restaurant">Restaurants</option>
                                                <option value="activity">Activities</option>
                                            </select>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={loading}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                            >
                                                <Upload size={20} className="mr-2" />
                                                {loading ? 'Uploading...' : 'Upload Excel'}
                                            </button>
                                        </div>
                                    </div>
                                    {uploadStatus && (
                                        <div className={`mt-4 p-3 rounded-lg ${
                                            uploadStatus === 'success' 
                                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                                : uploadStatus === 'error' 
                                                    ? 'bg-red-100 text-red-800 border border-red-200' 
                                                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                                        }`}>
                                            <div className="flex items-center">
                                                {uploadStatus === 'success' && <CheckCircle size={20} className="mr-2" />}
                                                {uploadStatus === 'error' && <AlertCircle size={20} className="mr-2" />}
                                                {uploadStatus === 'uploading' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />}
                                                <span>
                                                    {uploadStatus === 'uploading' && 'Uploading and processing file...'}
                                                    {uploadStatus === 'success' && 'File uploaded successfully!'}
                                                    {uploadStatus === 'error' && 'Error uploading file. Please check format and try again.'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AR Gems</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredBusinesses.map((business) => {
                                                const TypeIcon = getTypeIcon(business.type);
                                                return (
                                                    <tr key={business.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <TypeIcon className="w-5 h-5 text-gray-400 mr-3" />
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">{business.name}</div>
                                                                    <div className="text-sm text-gray-500">{business.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                                                                {business.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                                                <span className="text-sm text-gray-900">{business.rating.toFixed(1)}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                                                                <span className="text-sm text-gray-900">{business.location}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <Gem className="w-4 h-4 text-purple-500 mr-1" />
                                                                <span className="text-sm text-gray-900">{business.gems}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                business.status === 'active' 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : business.status === 'pending' 
                                                                        ? 'bg-yellow-100 text-yellow-800' 
                                                                        : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {business.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex space-x-2">
                                                                <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                                                    <Eye size={16} />
                                                                </button>
                                                                <button className="text-green-600 hover:text-green-900 transition-colors">
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button className="text-red-600 hover:text-red-900 transition-colors">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                                </h2>
                                <p className="text-gray-600">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management features coming soon...
                                </p>
                                
                                {activeTab === 'ar-gems' && (
                                    <div className="mt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {arGems.map((gem) => (
                                                <div key={gem.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-center mb-2">
                                                        <Gem className={`w-6 h-6 mr-2 ${
                                                            gem.rarity === 'legendary' 
                                                                ? 'text-yellow-500' 
                                                                : gem.rarity === 'rare' 
                                                                    ? 'text-purple-500' 
                                                                    : 'text-blue-500'
                                                        }`} />
                                                        <h3 className="font-semibold text-gray-900">{gem.name}</h3>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{gem.location}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            gem.rarity === 'legendary' 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : gem.rarity === 'rare' 
                                                                    ? 'bg-purple-100 text-purple-800' 
                                                                    : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {gem.rarity}
                                                        </span>
                                                        <span className="text-sm text-gray-900">{gem.points} pts</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">Collected {gem.collected} times</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'users' && (
                                    <div className="mt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {users.map((user) => (
                                                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                                                    <h3 className="font-semibold text-gray-900 mb-2">{user.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            user.tier === 'Gold' 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : user.tier === 'Silver' 
                                                                    ? 'bg-gray-100 text-gray-800' 
                                                                    : 'bg-orange-100 text-orange-800'
                                                        }`}>
                                                            {user.tier}
                                                        </span>
                                                        <span className="text-sm text-gray-900">{user.gems} gems</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        {user.points} points • Joined {user.joinDate}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'bookings' && (
                                    <div className="mt-6">
                                        <div className="space-y-4">
                                            {bookings.map((booking) => (
                                                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{booking.user}</h3>
                                                        <p className="text-sm text-gray-600">{booking.business}</p>
                                                        <p className="text-xs text-gray-500">{booking.type} • {booking.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">{booking.amount}</p>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            booking.status === 'confirmed' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : booking.status === 'pending' 
                                                                    ? 'bg-yellow-100 text-yellow-800' 
                                                                    : booking.status === 'completed' 
                                                                        ? 'bg-blue-100 text-blue-800' 
                                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                    
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    
                    <div className="fixed bottom-6 right-6">
                        <button
                            onClick={downloadTemplate}
                            className="flex items-center px-4 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                            title="Download Excel Template"
                        >
                            <Download size={20} className="mr-2" />
                            Download Template
                        </button>
                    </div>
                </div>
            );
        };
        
        ReactDOM.render(<MarmarisAdminDashboard />, document.getElementById('root'));
    </script>
</body>
</html>