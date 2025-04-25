import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { DisasterType } from "./DisasterTypeFilter";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // You'll need to replace this with your Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
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
      const el = document.createElement('div');
      el.className = `marker-${location.risk}`;
      
      const marker = new mapboxgl.Marker({
        element: el,
        color: getRiskColor(location.risk)
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<h3>${location.name}</h3>
               <p>${location.type} Risk Level: ${location.risk}</p>`
            )
        )
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
        .mapboxgl-marker {
          cursor: pointer;
        }
        .marker-low { background-color: #3b82f6; }
        .marker-medium { background-color: #f59e0b; }
        .marker-high { background-color: #ef4444; }
        .marker-severe { background-color: #7f1d1d; }
      `}</style>
    </div>
  );
}
