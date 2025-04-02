
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

// Sample data for the map
const sampleLocations: MapLocation[] = [
  {
    id: "loc1",
    name: "San Francisco",
    lat: 37.7749,
    lng: -122.4194,
    risk: "medium",
    type: "earthquake",
  },
  {
    id: "loc2",
    name: "Miami",
    lat: 25.7617,
    lng: -80.1918,
    risk: "high",
    type: "hurricane",
  },
  {
    id: "loc3",
    name: "Los Angeles",
    lat: 34.0522,
    lng: -118.2437,
    risk: "medium",
    type: "wildfire",
  },
  {
    id: "loc4",
    name: "New Orleans",
    lat: 29.9511,
    lng: -90.0715,
    risk: "high",
    type: "flood",
  },
  {
    id: "loc5",
    name: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    risk: "severe",
    type: "tsunami",
  },
  {
    id: "loc6",
    name: "Phoenix",
    lat: 33.4484,
    lng: -112.0740,
    risk: "medium",
    type: "drought",
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
