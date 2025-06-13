import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import metricsData from '../data/metricsData.json';

const metrics = ['sales', 'visitors', 'revenue'];

export default function TrendsInsightsPage() {
  const [selectedMetric, setSelectedMetric] = useState('sales');

  const getMax = (metric) => metricsData.reduce((max, row) => row[metric] > max ? row[metric] : max, 0);
  const getMin = (metric) => metricsData.reduce((min, row) => row[metric] < min ? row[metric] : min, Infinity);

  const handleExportPDF = async () => {
    const input = document.getElementById('chart-container');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 120);
    pdf.save('trends_insights.pdf');
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">📊 Trends & Insights</h1>

      <div className="flex gap-4 items-center mb-6">
        <label className="font-medium">Select Metric:</label>
        <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)} className="border p-2 rounded">
          {metrics.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
        </select>
        <button onClick={handleExportPDF} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          📥 Export Chart as PDF
        </button>
      </div>

      <div id="chart-container" className="bg-gray-50 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">📈 {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Over Months</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metricsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" strokeWidth={2} />
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
