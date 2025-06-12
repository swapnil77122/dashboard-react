import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const fullData = [
  { name: 'Jan', revenue: 1200 },
  { name: 'Feb', revenue: 1400 },
  { name: 'Mar', revenue: 1000 },
  { name: 'Apr', revenue: 1600 },
  { name: 'May', revenue: 1800 },
  { name: 'Jun', revenue: 1500 },
   { name: 'Jan', revenue: 1100 },
  { name: 'Feb', revenue: 1700 },
  { name: 'Mar', revenue: 1600 },
  { name: 'Apr', revenue: 1400 },
  { name: 'May', revenue: 1600 },
  { name: 'Jun', revenue: 1400 },
];

export default function AreaGraph({ selectedRange }) {
  const getFilteredData = () => {
    if (selectedRange === 'Q1') return fullData.slice(0, 3);
    if (selectedRange === 'Q2') return fullData.slice(3, 6);
    return fullData;
  };

  const data = getFilteredData();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
