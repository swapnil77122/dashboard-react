import { useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import metricsData from '../data/metricsData.json';

export default function ReportPage() {
  const months = [
    { label: 'January', value: 'Jan' },
    { label: 'February', value: 'Feb' },
    { label: 'March', value: 'Mar' },
    { label: 'April', value: 'Apr' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'Jun' },
    { label: 'July', value: 'Jul' },
    { label: 'August', value: 'Aug' },
    { label: 'September', value: 'Sep' },
    { label: 'October', value: 'Oct' },
    { label: 'November', value: 'Nov' },
    { label: 'December', value: 'Dec' }
  ];

  const [selectedMonth, setSelectedMonth] = useState('Jan');

  const filteredData = useMemo(() => {
    return metricsData.filter(row => row.month === selectedMonth);
  }, [selectedMonth]);

  const totalRevenue = filteredData.reduce((acc, row) => acc + row.revenue, 0);
  const totalSales = filteredData.reduce((acc, row) => acc + row.sales, 0);
  const avgVisitors = filteredData.length
    ? Math.round(filteredData.reduce((acc, row) => acc + row.visitors, 0) / filteredData.length)
    : 0;

  const exportPDF = () => {
    const doc = new jsPDF();
    const selectedLabel = months.find(m => m.value === selectedMonth)?.label || selectedMonth;
    doc.text(`📊 Report (${selectedLabel})`, 14, 16);

    // Filter all same-month data to count how many years to add
    const sameMonthData = metricsData.filter(r => r.month === selectedMonth);

    autoTable(doc, {
      startY: 22,
      head: [['Month', 'Sales', 'Visitors', 'Revenue']],
      body: sameMonthData.map((row, index) => {
        const year = 2010 + index;
        return [
          `${row.month} ${year}`,
          `$${row.sales.toLocaleString()}`,
          row.visitors.toLocaleString(),
          `$${row.revenue.toLocaleString()}`
        ];
      })
    });

    const finalY = doc.lastAutoTable?.finalY || 40;
    doc.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 14, finalY + 10);
    doc.text(`Total Sales: $${totalSales.toLocaleString()}`, 14, finalY + 18);
    doc.text(`Avg. Visitors: ${avgVisitors.toLocaleString()}`, 14, finalY + 26);

    doc.save(`report-${selectedMonth}.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">📄 Report Generator</h1>

      <div className="flex gap-4 mb-4">
        <label className="flex flex-col">
          Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
          >
            {months.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-end"
        >
          📥 Export PDF
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <p><strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
        <p><strong>Total Sales:</strong> ${totalSales.toLocaleString()}</p>
        <p><strong>Average Visitors:</strong> {avgVisitors.toLocaleString()}</p>
      </div>
    </div>
  );
}
