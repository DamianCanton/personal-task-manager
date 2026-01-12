import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../common/Card';

export default function CategoryChart({ data }) {
  return (
    <Card variant="filled" padding="large" className="mb-6">
      <h3 className="text-base font-medium text-primary-text mb-4 ml-1">
        Distribución por Categoría
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={56}
              outerRadius={80}
              dataKey="value"
              paddingAngle={4}
              stroke="none"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1E1E1E',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ color: '#E1E1E1', marginBottom: '0.25rem' }}
              itemStyle={{ color: '#A1A1A1' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-primary-muted">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
