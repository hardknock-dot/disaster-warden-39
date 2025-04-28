
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
        message="Severe flood risk detected in Assam region" 
        level="high" 
      />
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">India Disaster Prediction Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor real-time disaster risks and alerts across India
          </p>
        </div>

        <DisasterTypeFilter onChange={handleDisasterTypeChange} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard 
            title="Active Alerts"
            value={14}
            trend={{ value: 5, isPositive: false }}
            icon={<CloudRain className="h-5 w-5" />}
            alertLevel="medium"
          />
          <StatusCard 
            title="High Risk Zones"
            value={4}
            trend={{ value: 33, isPositive: false }}
            icon={<Flame className="h-5 w-5" />}
            alertLevel="high"
          />
          <StatusCard 
            title="Monitored Areas"
            value={28}
            description="Active monitoring across all states and UTs"
            icon={<Wind className="h-5 w-5" />}
          />
          <StatusCard 
            title="Prediction Accuracy"
            value="87.91%"
            trend={{ value: 1.8, isPositive: true }}
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
