import { useState } from 'react';
import BarGraph from '../components/charts/BarChart';
import LineGraph from '../components/charts/LineChart';
import AreaGraph from '../components/charts/AreaChart';
import PieGraph from '../components/charts/PieChart';

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState('all');

  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Interactive Dashboard</h1>
        <select
          className="border p-2 rounded bg-white shadow-sm"
          value={selectedRange}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="Q1">Q1 (Jan–Mar)</option>
          <option value="Q2">Q2 (Apr–Jun)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Sales (Bar Chart)</h2>
          <BarGraph selectedRange={selectedRange} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Product Distribution (Pie Chart)</h2>
          <PieGraph selectedRange={selectedRange} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Website Visitors (Line Chart)</h2>
          <LineGraph selectedRange={selectedRange} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Revenue Trends (Area Chart)</h2>
          <AreaGraph selectedRange={selectedRange} />
        </div>
      </div>
    </div>
  );
}
