
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { DisasterType } from "./DisasterTypeFilter";

type MapLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  risk: "low" | "medium" | "high" | "severe";
  type: DisasterType;
};

// India-specific location data
const sampleLocations: MapLocation[] = [
  {
    id: "loc1",
    name: "Mumbai, Maharashtra",
    lat: 19.0760,
    lng: 72.8777,
    risk: "high",
    type: "flood",
  },
  {
    id: "loc2",
    name: "Chennai, Tamil Nadu",
    lat: 13.0827,
    lng: 80.2707,
    risk: "medium",
    type: "cyclone",
  },
  {
    id: "loc3",
    name: "Uttarakhand",
    lat: 30.0668,
    lng: 79.0193,
    risk: "high",
    type: "landslide",
  },
  {
    id: "loc4",
    name: "Gujarat Coast",
    lat: 22.2587,
    lng: 71.1924,
    risk: "severe",
    type: "cyclone",
  },
  {
    id: "loc5",
    name: "Delhi NCR",
    lat: 28.6139,
    lng: 77.2090,
    risk: "medium",
    type: "heatwave",
  },
  {
    id: "loc6",
    name: "Bihar",
    lat: 25.0961,
    lng: 85.3131,
    risk: "high",
    type: "flood",
  },
  {
    id: "loc7",
    name: "Assam",
    lat: 26.2006,
    lng: 92.9376,
    risk: "severe",
    type: "flood",
  },
  {
    id: "loc8",
    name: "Kashmir",
    lat: 34.0837,
    lng: 74.7973,
    risk: "medium",
    type: "earthquake",
  },
];

type DisasterMapProps = {
  selectedTypes?: DisasterType[];
  className?: string;
};

export function DisasterMap({ selectedTypes = [], className }: DisasterMapProps) {
  const [locations, setLocations] = useState<MapLocation[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Filter locations based on selected disaster types
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setLocations(sampleLocations);
    } else {
      setLocations(
        sampleLocations.filter((loc) => selectedTypes.includes(loc.type))
      );
    }
  }, [selectedTypes]);

  // This is a placeholder for a real map implementation
  // In a real app, you would use a library like Google Maps, Mapbox, or Leaflet
  return (
    <div className={`relative h-96 overflow-hidden bg-gray-100 map-container ${className}`}>
      <div className="absolute inset-0 p-4">
        {/* Map placeholder */}
        <div className="h-full w-full bg-blue-50 rounded-md flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-muted-foreground mb-2">Interactive Map</p>
            <p className="text-xs text-muted-foreground">
              Showing {locations.length} disaster risk locations
              {selectedTypes.length > 0 && ` for selected disaster types`}
            </p>
          </div>
        </div>

        {/* Map pins */}
        {locations.map((location) => (
          <button
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 hover:z-10`}
            style={{
              // This positioning is just for demonstration
              // In a real map, you would convert lat/lng to pixel coordinates
              left: `${((location.lng + 180) / 360) * 100}%`,
              top: `${((90 - location.lat) / 180) * 100}%`,
            }}
            onClick={() => setSelectedLocation(location)}
          >
            <MapPin
              className={`h-6 w-6 text-alert-${location.risk} filter drop-shadow hover:scale-125 transition-transform`}
            />
          </button>
        ))}

        {/* Location info popup */}
        {selectedLocation && (
          <div
            className="absolute bg-white p-3 rounded-md shadow-lg z-20 max-w-xs"
            style={{
              left: `${((selectedLocation.lng + 180) / 360) * 100}%`,
              top: `${((90 - selectedLocation.lat) / 180) * 100 - 12}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{selectedLocation.name}</h3>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)} Risk
            </p>
            <div className="mt-1">
              <span
                className={`alert-badge alert-badge-${selectedLocation.risk}`}
              >
                {selectedLocation.risk.charAt(0).toUpperCase() + selectedLocation.risk.slice(1)} Risk
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
