import { useState } from 'react';
import metricsData from '../data/metricsData.json';

export default function SummaryInsightsPage() {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthMap = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec'
  };

  const shortMonth = monthMap[selectedMonth];

  const filtered = metricsData.filter(row => row.month === shortMonth);

  const totalSales = filtered.reduce((sum, row) => sum + row.sales, 0);
  const totalVisitors = filtered.reduce((sum, row) => sum + row.visitors, 0);
  const totalRevenue = filtered.reduce((sum, row) => sum + row.revenue, 0);
  const avgRevenue = filtered.length ? Math.round(totalRevenue / filtered.length) : 0;
  const revenuePerVisitor = totalVisitors ? (totalRevenue / totalVisitors).toFixed(2) : 0;

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6"> Monthly Summary</h1>

      <label className="block mb-4">
        <span className="font-medium">Select Month:</span>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthNames.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </label>

      <div className="space-y-3 text-gray-700">
        <p><strong>Total Entries:</strong> {filtered.length}</p>
        <p><strong>Total Sales:</strong> {totalSales.toLocaleString()}</p>
        <p><strong>Total Visitors:</strong> {totalVisitors.toLocaleString()}</p>
        <p><strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
        <p><strong>Average Revenue:</strong> ${avgRevenue.toLocaleString()}</p>
        <p><strong>Revenue per Visitor:</strong> ${revenuePerVisitor}</p>
      </div>
    </div>
  );
}
