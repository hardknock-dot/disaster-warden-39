
import { useState } from "react";
import { BarChart3, CloudRain, Flame, Wind } from "lucide-react";
import { AlertBanner } from "@/components/AlertBanner";
import { StatusCard } from "@/components/StatusCard";
import { DisasterTypeFilter, DisasterType } from "@/components/DisasterTypeFilter";
import { DisasterMap } from "@/components/DisasterMap";
import { DisasterChart } from "@/components/DisasterChart";
import { RecentAlerts } from "@/components/RecentAlerts";

export default function Dashboard() {
  const [selectedDisasterTypes, setSelectedDisasterTypes] = useState<DisasterType[]>([]);

  const handleDisasterTypeChange = (types: DisasterType[]) => {
    setSelectedDisasterTypes(types);
  };

  return (
    <div className="space-y-6">
      <AlertBanner 
        message="Severe wildfire risk detected in Los Angeles County" 
        level="high" 
      />
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Disaster Prediction Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor real-time disaster risks and alerts
          </p>
        </div>

        <DisasterTypeFilter onChange={handleDisasterTypeChange} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard 
            title="Active Alerts"
            value={12}
            trend={{ value: 8, isPositive: false }}
            icon={<CloudRain className="h-5 w-5" />}
            alertLevel="medium"
          />
          <StatusCard 
            title="High Risk Zones"
            value={3}
            trend={{ value: 25, isPositive: false }}
            icon={<Flame className="h-5 w-5" />}
            alertLevel="high"
          />
          <StatusCard 
            title="Monitored Areas"
            value={156}
            description="Active monitoring across 12 countries"
            icon={<Wind className="h-5 w-5" />}
          />
          <StatusCard 
            title="Prediction Accuracy"
            value="94.2%"
            trend={{ value: 2, isPositive: true }}
            icon={<BarChart3 className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <DisasterMap 
            selectedTypes={selectedDisasterTypes}
            className="lg:col-span-2"
          />
          <RecentAlerts selectedTypes={selectedDisasterTypes} />
        </div>

        <DisasterChart 
          selectedTypes={selectedDisasterTypes}
          title="Historical Disaster Trends (12 Months)" 
        />
      </div>
    </div>
  );
}
