
import { useState } from "react";
import { DisasterTypeFilter, DisasterType } from "@/components/DisasterTypeFilter";
import { DisasterChart } from "@/components/DisasterChart";

export default function Analytics() {
  const [selectedDisasterTypes, setSelectedDisasterTypes] = useState<DisasterType[]>([]);

  const handleDisasterTypeChange = (types: DisasterType[]) => {
    setSelectedDisasterTypes(types);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View historical trends and prediction analytics
        </p>
      </div>

      <DisasterTypeFilter onChange={handleDisasterTypeChange} />

      <div className="grid gap-6">
        <DisasterChart 
          selectedTypes={selectedDisasterTypes}
          title="Historical Disaster Trends (12 Months)" 
          className="h-96"
        />
      </div>
    </div>
  );
}
