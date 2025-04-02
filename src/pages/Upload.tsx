
import { useState } from "react";
import { DisasterTypeFilter, DisasterType } from "@/components/DisasterTypeFilter";
import { GraphUpload } from "@/components/GraphUpload";

export default function Upload() {
  const [selectedDisasterTypes, setSelectedDisasterTypes] = useState<DisasterType[]>([]);

  const handleDisasterTypeChange = (types: DisasterType[]) => {
    setSelectedDisasterTypes(types);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Disaster Graph</h1>
        <p className="text-muted-foreground">
          Share your own disaster data analysis and visualizations
        </p>
      </div>

      <DisasterTypeFilter onChange={handleDisasterTypeChange} />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <GraphUpload />
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-medium mb-3">Graph Upload Guidelines</h3>
            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Ensure your graph accurately represents disaster data related to India</li>
              <li>Include clear labels for all axes and data points</li>
              <li>Cite your data sources in the description for verification</li>
              <li>Use appropriate color coding that matches our system (optional)</li>
              <li>Focus on one disaster type per graph for clarity</li>
              <li>Images must be less than 10MB in size</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-medium mb-3">What Happens Next?</h3>
            <p className="text-muted-foreground">
              After submission, your graph will be reviewed by our data team. 
              If approved, it will appear in the community visualizations section 
              of our analytics dashboard. We may reach out if we need more 
              information about your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
