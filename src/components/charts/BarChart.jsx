import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

const fullData = [
  { name: 'Jan ', sales: 120 },
  { name: 'Feb ', sales: 90 },
  { name: 'Mar ', sales: 150 },
  { name: 'Apr ', sales: 170 },
  { name: 'May ', sales: 130 },
  { name: 'Jun ', sales: 190 },
  { name: 'Jul', sales: 120 },
  { name: 'Aug ', sales: 90 },
  { name: 'Sep ', sales: 190 },
  { name: 'Oct ', sales: 150 },
  { name: 'Nov ', sales: 120 },
  { name: 'Dec', sales: 110 },
];

export default function BarGraph({ selectedRange }) {
  const getFilteredData = () => {
    if (selectedRange === 'Q1') return fullData.slice(0, 3);
    if (selectedRange === 'Q2') return fullData.slice(3, 6);
    return fullData;
  };

  const data = getFilteredData();

  // 🆕 Add year labels only for display
  const dataWithYear = data.map((entry, index) => ({
    ...entry,
    nameDisplay: index < 6 ? `${entry.name.trim()} 2020` : `${entry.name.trim()} 2021`
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataWithYear}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="nameDisplay"
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 12 }}
          /><XAxis
  dataKey="nameDisplay"
  label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
  tick={{ fontSize: 12, angle: -40, dy: 10 }}
/>

          <YAxis label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Sales']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="sales" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
