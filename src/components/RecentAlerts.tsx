
import { AlertTriangle } from "lucide-react";
import { DisasterType } from "./DisasterTypeFilter";

type Alert = {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  level: "low" | "medium" | "high" | "severe";
  type: DisasterType;
};

// Sample data for recent alerts in India
const sampleAlerts: Alert[] = [
  {
    id: "alert1",
    title: "Flood Warning",
    location: "Assam",
    timestamp: "2023-10-15T08:30:00",
    level: "severe",
    type: "flood",
  },
  {
    id: "alert2",
    title: "Cyclone Alert",
    location: "Odisha Coast",
    timestamp: "2023-10-14T14:45:00",
    level: "high",
    type: "cyclone",
  },
  {
    id: "alert3",
    title: "Landslide Warning",
    location: "Himachal Pradesh",
    timestamp: "2023-10-13T11:15:00",
    level: "medium",
    type: "landslide",
  },
  {
    id: "alert4",
    title: "Earthquake Advisory",
    location: "Gujarat",
    timestamp: "2023-10-12T09:20:00",
    level: "low",
    type: "earthquake",
  },
  {
    id: "alert5",
    title: "Heatwave Advisory",
    location: "Rajasthan",
    timestamp: "2023-10-11T16:00:00",
    level: "medium",
    type: "heatwave",
  },
  {
    id: "alert6",
    title: "Drought Warning",
    location: "Maharashtra",
    timestamp: "2023-10-10T12:00:00",
    level: "high",
    type: "drought",
  },
  {
    id: "alert7",
    title: "Flood Advisory",
    location: "Kerala",
    timestamp: "2023-10-09T10:30:00",
    level: "low",
    type: "flood",
  },
  {
    id: "alert8",
    title: "Cyclone Warning",
    location: "Tamil Nadu Coast",
    timestamp: "2023-10-08T15:45:00",
    level: "severe",
    type: "cyclone",
  },
  {
    id: "alert9",
    title: "Landslide Advisory",
    location: "Uttarakhand",
    timestamp: "2023-10-07T13:00:00",
    level: "medium",
    type: "landslide",
  },
];

type RecentAlertsProps = {
  selectedTypes?: DisasterType[];
  className?: string;
};

export function RecentAlerts({ selectedTypes = [], className }: RecentAlertsProps) {
  // Filter alerts based on selected disaster types
  const filteredAlerts = selectedTypes.length === 0
    ? sampleAlerts
    : sampleAlerts.filter((alert) => selectedTypes.includes(alert.type));

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className={`dashboard-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Recent Alerts</h3>
        <span className="text-xs text-muted-foreground">
          {filteredAlerts.length} alerts
        </span>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
          <AlertTriangle className="h-8 w-8 mb-2 opacity-30" />
          <p className="text-sm">No alerts for selected disaster types</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredAlerts.map((alert) => (
            <li key={alert.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`alert-badge alert-badge-${alert.level}`}
                    >
                      {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
                    </span>
                    <h4 className="font-medium">{alert.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(alert.timestamp)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
