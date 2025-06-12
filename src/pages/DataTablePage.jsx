import data from '../data/metricsData.json';
import TableComponent from '../components/TableComponent';

export default function DataTablePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Metrics Table</h1>
      <TableComponent data={data} />
    </div>
  );
}
