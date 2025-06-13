import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import metricsData from '../data/metricsData.json';

const metrics = ['sales', 'visitors', 'revenue'];

export default function TrendsInsightsPage() {
  const [selectedMetric, setSelectedMetric] = useState('sales');

  const formattedData = useMemo(() => {
    return metricsData.map((entry, index) => {
      const baseYear = 2013;
      const year = baseYear + Math.floor(index / 12);
      return {
        ...entry,
        year,
        label: `${entry.month} ${year}`
      };
    });
  }, []);

  const getMax = (metric) => Math.max(...formattedData.map(row => row[metric]));
  const getMin = (metric) => Math.min(...formattedData.map(row => row[metric]));

  const handleExportPDF = async () => {
    const input = document.getElementById('chart-container');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    pdf.text(`Trend: ${selectedMetric.toUpperCase()}`, 14, 12);
    pdf.addImage(imgData, 'PNG', 10, 18, 190, 100);

    // Build one table with year rows and monthly rows
    const bodyRows = [];
    let currentYear = null;

    formattedData.forEach(row => {
      if (row.year !== currentYear) {
        currentYear = row.year;
        bodyRows.push([
          { content: `Year: ${currentYear}`, colSpan: 2, styles: { fontStyle: 'bold', textColor: [0, 0, 0], fillColor: [230, 230, 230] } }
        ]);
      }
      bodyRows.push([
        row.month,
        row[selectedMetric].toLocaleString()
      ]);
    });

    autoTable(pdf, {
      startY: 130,
      head: [[
        { content: 'Month', styles: { fillColor: [0, 123, 255], textColor: 255 } },
        { content: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1), styles: { fillColor: [0, 123, 255], textColor: 255 } }
      ]],
      body: bodyRows,
      theme: 'grid',
      styles: { fontSize: 10 }
    });

    pdf.save('trends_report.pdf');
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">📊 Trends & Insights</h1>

      <div className="flex gap-4 items-center mb-6">
        <label className="font-medium">Select Metric:</label>
        <select
          value={selectedMetric}
          onChange={e => setSelectedMetric(e.target.value)}
          className="border p-2 rounded"
        >
          {metrics.map(m => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={handleExportPDF}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📥 Export PDF
        </button>
      </div>

      {/* Chart Section */}
      <div id="chart-container" className="bg-gray-50 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">
          📈 {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#007bff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-gray-600">
          <p>📌 Max {selectedMetric}: {getMax(selectedMetric).toLocaleString()}</p>
          <p>📉 Min {selectedMetric}: {getMin(selectedMetric).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
