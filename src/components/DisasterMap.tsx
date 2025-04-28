
import { useState, useEffect, useRef } from "react";
import { DisasterType } from "./DisasterTypeFilter";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import indiaLocations from "./india_disaster_maplocations.json"; // <-- Your JSON file

type MapLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  risk: "low" | "medium" | "high" | "severe";
  type: DisasterType;
};

type DisasterMapProps = {
  selectedTypes?: DisasterType[];
  className?: string;
};

export function DisasterMap({ selectedTypes = [], className }: DisasterMapProps) {
  const [locations, setLocations] = useState<MapLocation[]>(indiaLocations as MapLocation[]);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Fix for Leaflet icon issue
    // This addresses the common issue with Leaflet markers not showing up correctly
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = defaultIcon;

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
