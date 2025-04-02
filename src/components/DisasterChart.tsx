
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { DisasterType } from './DisasterTypeFilter';

// Sample data for the chart
const sampleData = [
  { name: 'Jan', earthquake: 4, flood: 2, hurricane: 0, wildfire: 1, tsunami: 0, drought: 3 },
  { name: 'Feb', earthquake: 3, flood: 1, hurricane: 0, wildfire: 0, tsunami: 1, drought: 4 },
  { name: 'Mar', earthquake: 5, flood: 3, hurricane: 0, wildfire: 2, tsunami: 0, drought: 5 },
  { name: 'Apr', earthquake: 2, flood: 5, hurricane: 0, wildfire: 3, tsunami: 0, drought: 4 },
  { name: 'May', earthquake: 3, flood: 6, hurricane: 1, wildfire: 5, tsunami: 0, drought: 3 },
  { name: 'Jun', earthquake: 1, flood: 4, hurricane: 2, wildfire: 7, tsunami: 0, drought: 5 },
  { name: 'Jul', earthquake: 2, flood: 3, hurricane: 4, wildfire: 9, tsunami: 0, drought: 7 },
  { name: 'Aug', earthquake: 3, flood: 2, hurricane: 7, wildfire: 8, tsunami: 1, drought: 8 },
  { name: 'Sep', earthquake: 4, flood: 3, hurricane: 5, wildfire: 6, tsunami: 0, drought: 6 },
  { name: 'Oct', earthquake: 3, flood: 4, hurricane: 2, wildfire: 4, tsunami: 0, drought: 5 },
  { name: 'Nov', earthquake: 5, flood: 5, hurricane: 1, wildfire: 2, tsunami: 1, drought: 4 },
  { name: 'Dec', earthquake: 6, flood: 3, hurricane: 0, wildfire: 1, tsunami: 0, drought: 3 },
];

const disasterColors: Record<DisasterType, string> = {
  earthquake: '#8b5cf6', // Purple
  flood: '#3b82f6',      // Blue
  hurricane: '#f59e0b',  // Amber
  wildfire: '#ef4444',   // Red
  tsunami: '#06b6d4',    // Cyan
  drought: '#d97706',    // Orange
};

type DisasterChartProps = {
  selectedTypes?: DisasterType[];
  className?: string;
  title?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-2 rounded-md shadow-md border text-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 mt-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ background: entry.color }}
            />
            <span className="capitalize">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export function DisasterChart({ selectedTypes = [], className, title }: DisasterChartProps) {
  // Filter the chart data based on selected disaster types
  const filteredTypes = selectedTypes.length > 0 
    ? selectedTypes 
    : (Object.keys(disasterColors) as DisasterType[]);

  return (
    <div className={`dashboard-card h-80 ${className}`}>
      {title && <h3 className="font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={sampleData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {filteredTypes.map((type) => (
            <Bar 
              key={type}
              dataKey={type}
              fill={disasterColors[type]} 
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
