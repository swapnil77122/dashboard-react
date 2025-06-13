import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataTablePage from './pages/DataTablePage';
import About from './pages/About';
import ReportPage from './pages/ReportPage';
import TrendsInsightsPage from './pages/TrendsPage';
import SummaryInsightsPage from './pages/SummaryInsightsPage';
import { Menu } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-800 text-white p-4 flex items-center gap-4 shadow">
          <button
            onClick={toggleSidebar}
            className="hover:bg-gray-700 p-2 rounded-md"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold tracking-wide">My Dashboard</h1>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 bg-gray-800 text-white p-4">
              <nav className="flex flex-col gap-2 text-sm">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  📈 Charts
                </NavLink>
                <NavLink
                  to="/data"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  📊 Usage Analytics
                </NavLink>
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  📝 Report Generator
                </NavLink>
                <NavLink
                  to="/trends"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  📝 Trends
                </NavLink>
                <NavLink
                  to="/summary"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  📌 Smart Summary
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-blue-400 text-gray-900 font-semibold shadow'
                        : 'hover:bg-gray-700'
                    }`
                  }
                >
                  ℹ️ About
                </NavLink>
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
