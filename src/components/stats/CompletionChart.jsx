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
  high: '#34d399',
  medium: '#fb7185',
  low: '#f87171',
};

export default function CompletionChart({ data }) {
  const getBarColor = (val) => {
    if (val >= 80) return COLORS.high;
    if (val >= 50) return COLORS.medium;
    return COLORS.low;
  };

  return (
    <Card variant="filled" padding="large" className="mb-6">
      <h3 className="text-base font-medium text-primary-text mb-4 ml-1">
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
              tick={{ fontSize: 12, fill: '#A1A1A1' }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1E1E1E',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ color: '#E1E1E1', marginBottom: '0.25rem' }}
              itemStyle={{ color: '#A1A1A1' }}
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
