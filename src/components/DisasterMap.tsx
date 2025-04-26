import { useState, useEffect, useRef } from "react";
import { DisasterType } from "./DisasterTypeFilter";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current).setView([20.5937, 78.9629], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when locations or selected types change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter locations based on selected types
    const filteredLocations = selectedTypes.length > 0
      ? locations.filter(loc => selectedTypes.includes(loc.type))
      : locations;

    // Add new markers
    filteredLocations.forEach(location => {
      const markerIcon = L.divIcon({
        className: `marker-${location.risk}`,
        html: `<div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${getRiskColor(location.risk)}"></div>`,
        iconSize: [12, 12]
      });

      const marker = L.marker([location.lat, location.lng], { icon: markerIcon })
        .bindPopup(`
          <h3>${location.name}</h3>
          <p>${location.type} Risk Level: ${location.risk}</p>
        `)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [locations, selectedTypes]);

  const getRiskColor = (risk: "low" | "medium" | "high" | "severe") => {
    switch (risk) {
      case "low": return "#3b82f6";
      case "medium": return "#f59e0b";
      case "high": return "#ef4444";
      case "severe": return "#7f1d1d";
      default: return "#3b82f6";
    }
  };

  return (
    <div className={`relative h-96 ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <style>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
        }
        .marker-low, .marker-medium, .marker-high, .marker-severe {
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
