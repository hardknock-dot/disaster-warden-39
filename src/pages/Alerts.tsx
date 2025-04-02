
import { useState } from "react";
import { DisasterTypeFilter, DisasterType } from "@/components/DisasterTypeFilter";
import { RecentAlerts } from "@/components/RecentAlerts";

export default function Alerts() {
  const [selectedDisasterTypes, setSelectedDisasterTypes] = useState<DisasterType[]>([]);

  const handleDisasterTypeChange = (types: DisasterType[]) => {
    setSelectedDisasterTypes(types);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alert Center</h1>
        <p className="text-muted-foreground">
          View and manage all active disaster alerts
        </p>
      </div>

      <DisasterTypeFilter onChange={handleDisasterTypeChange} />

      <div className="grid gap-6">
        <RecentAlerts selectedTypes={selectedDisasterTypes} />
      </div>
    </div>
  );
}
