import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { DisasterType } from './DisasterTypeFilter';

// Sample data for Indian disaster trends
const sampleData = [
  {'name': 'Jan', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Feb', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Mar', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Apr', 'earthquake': 1, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'May', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Jun', 'earthquake': 0, 'flood': 2, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Jul', 'earthquake': 0, 'flood': 2, 'cyclone': 0, 'landslide': 1, 'drought': 0, 'heatwave': 0},
  {'name': 'Aug', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 1, 'drought': 0, 'heatwave': 0},
  {'name': 'Sep', 'earthquake': 0, 'flood': 1, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Oct', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Nov', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
  {'name': 'Dec', 'earthquake': 0, 'flood': 0, 'cyclone': 0, 'landslide': 0, 'drought': 0, 'heatwave': 0},
];

const disasterColors: Record<DisasterType, string> = {
  earthquake: '#8b5cf6', // Purple
  flood: '#3b82f6',      // Blue
  cyclone: '#f59e0b',    // Amber
  landslide: '#84cc16',  // Lime
  drought: '#d97706',    // Orange
  heatwave: '#ef4444',   // Red
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
