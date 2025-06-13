import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Add unique year-based labels from 2015 to 2020
const fullData = [
  { name: 'Jan 2015', visitors: 400 },
  { name: 'Feb 2015', visitors: 300 },
  { name: 'Mar 2015', visitors: 500 },
  { name: 'Apr 2015', visitors: 600 },
  { name: 'May 2015', visitors: 550 },
  { name: 'Jun 2015', visitors: 700 },
];

export default function LineGraph({ selectedRange }) {
  const getFilteredData = () => {
    if (selectedRange === 'Q1') return fullData.slice(0, 3); // Jan–Mar
    if (selectedRange === 'Q2') return fullData.slice(3, 6); // Apr–Jun
    return fullData;
  };

  const data = getFilteredData();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Visitors', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
