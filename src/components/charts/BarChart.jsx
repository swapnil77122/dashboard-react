import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

const fullData = [
  { name: 'Jan', sales: 120 },
  { name: 'Feb', sales: 90 },
  { name: 'Mar', sales: 150 },
  { name: 'Apr', sales: 170 },
  { name: 'May', sales: 130 },
  { name: 'Jun', sales: 190 },
  { name: 'Jan', sales: 120 },
  { name: 'Feb', sales: 90 },
  { name: 'Mar', sales: 190 },
  { name: 'Apr', sales: 150 },
  { name: 'May', sales: 120 },
  { name: 'Jun', sales: 110 },
];

export default function BarGraph({ selectedRange }) {
  const getFilteredData = () => {
    if (selectedRange === 'Q1') return fullData.slice(0, 3);
    if (selectedRange === 'Q2') return fullData.slice(3, 6);
    return fullData;
  };

  const data = getFilteredData();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          {/* Legend removed */}
          <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="sales" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
