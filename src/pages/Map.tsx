
import { useState } from "react";
import { DisasterTypeFilter, DisasterType } from "@/components/DisasterTypeFilter";
import { DisasterMap } from "@/components/DisasterMap";

export default function Map() {
  const [selectedDisasterTypes, setSelectedDisasterTypes] = useState<DisasterType[]>([]);

  const handleDisasterTypeChange = (types: DisasterType[]) => {
    setSelectedDisasterTypes(types);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">India Disaster Risk Map</h1>
        <p className="text-muted-foreground">
          View disaster risk zones across India and current alerts
        </p>
      </div>

      <DisasterTypeFilter onChange={handleDisasterTypeChange} />

      <div className="h-[calc(100vh-12rem)]">
        <DisasterMap selectedTypes={selectedDisasterTypes} className="h-full" />
      </div>
    </div>
  );
}
