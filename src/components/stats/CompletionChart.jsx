import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Card from '../common/Card';

const COLORS = {
  high: '#a8c7fa',
  medium: '#ffe0b2',
  low: '#f2b8b5',
};

export default function CompletionChart({ data }) {
  const getBarColor = (val) => {
    if (val >= 80) return COLORS.high;
    if (val >= 50) return COLORS.medium;
    return COLORS.low;
  };

  return (
    <Card variant="filled" padding="large" className="mb-6">
      <h3 className="text-base font-medium text-md-on-surface-dark mb-4 ml-1">
        Progreso Semanal
      </h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#c4c7c5' }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2b2930',
                boxShadow: '0 4px 8px 3px rgba(0,0,0,0.15)',
              }}
              labelStyle={{ color: '#e6e1e5', marginBottom: '0.25rem' }}
              itemStyle={{ color: '#c4c7c5' }}
            />
            <Bar
              dataKey="completion"
              radius={[6, 6, 6, 6]}
              barSize={28}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.completion)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
