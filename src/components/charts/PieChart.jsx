import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const fullData = [
  { name: 'Product A', value: 400, month: 'Jan' },
  { name: 'Product B', value: 300, month: 'Feb' },
  { name: 'Product C', value: 300, month: 'Mar' },
  { name: 'Product D', value: 200, month: 'Apr' },
  { name: 'Product E', value: 250, month: 'May' },
  { name: 'Product F', value: 350, month: 'Jun' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#e11d48'];

export default function PieGraph({ selectedRange }) {
  const getFilteredData = () => {
    if (selectedRange === 'Q1') return fullData.filter(d => ['Jan', 'Feb', 'Mar'].includes(d.month));
    if (selectedRange === 'Q2') return fullData.filter(d => ['Apr', 'May', 'Jun'].includes(d.month));
    return fullData;
  };

  const data = getFilteredData();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
