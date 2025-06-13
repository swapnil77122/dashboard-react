import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataTablePage from './pages/DataTablePage';
import About from './pages/About';
import ReportPage from './pages/ReportPage';
import TrendsInsightsPage from './pages/TrendsPage';
import SummaryInsightsPage from './pages/SummaryInsightsPage';


import { Menu } from 'lucide-react'; // Optional: use Heroicons or Lucide

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-800 text-white p-4 flex items-center gap-4 shadow">
          {/* Toggle Icon */}
          <button
            onClick={toggleSidebar}
            className="hover:bg-gray-700 p-2 rounded-md"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* App Title */}
          <h1 className="text-xl font-semibold tracking-wide">My Dashboard</h1>
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 bg-gray-800 text-white p-4">
              <h2 className="text-lg font-semibold mb-4">Pages</h2>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/" className="hover:underline">📈 Charts</Link>
                <Link to="/data" className="hover:underline">📊 Usage Analytics</Link>
                <Link to="/report" className="hover:underline">📝 Report Generator</Link>
                <Link to="/trends" className="hover:underline"> 📝Trends</Link>
                <Link to="/summary" className="hover:underline">📌 Smart Summary</Link>
                <Link to="/about" className="hover:underline">ℹ️ About</Link>
              </nav>
            </aside>
          )}

          {/* Main Page Section */}
          <main className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data" element={<DataTablePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/report" element={<ReportPage />} />
<Route path="/trends" element={<TrendsInsightsPage />} />
<Route path="/summary" element={<SummaryInsightsPage />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
