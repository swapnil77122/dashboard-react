import { useState } from 'react';

// Generate unique month-year entries from 2010 to 2020
const generateFullData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullData = [];

  let salesBase = 100;
  let visitorsBase = 500;
  let revenueBase = 1000;

  for (let year = 2010; year <= 2020; year++) {
    for (let i = 0; i < 12; i++) {
      fullData.push({
        month: `${months[i]} ${year}`,
        sales: salesBase + Math.floor(Math.random() * 100),
        visitors: visitorsBase + Math.floor(Math.random() * 300),
        revenue: revenueBase + Math.floor(Math.random() * 500),
      });
    }
  }

  return fullData;
};

export default function TableComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 5;
  const data = generateFullData();

  const filteredData = data.filter((row) =>
    row.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleDownloadCSV = () => {
    const header = ['Month', 'Sales', 'Visitors', 'Revenue'];
    const rows = filteredData.map(row => [
      row.month,
      row.sales,
      row.visitors,
      row.revenue
    ]);

    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'metrics_data.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800"> Monthly Metrics (2010–2020)</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search Month..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded text-sm"
          />
          <button
            onClick={handleDownloadCSV}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬇️ Download CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 border-b">📅 Month</th>
              <th className="px-6 py-3 border-b text-right">💰 Sales</th>
              <th className="px-6 py-3 border-b text-right">👥 Visitors</th>
              <th className="px-6 py-3 border-b text-right">📈 Revenue</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                  <td className="px-6 py-4 border-b font-medium">{row.month}</td>
                  <td className="px-6 py-4 border-b text-right">${row.sales.toLocaleString()}</td>
                  <td className="px-6 py-4 border-b text-right">{row.visitors}</td>
                  <td className="px-6 py-4 border-b text-right">${row.revenue.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 px-2 pt-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
