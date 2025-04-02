
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

// Sample data for recent alerts
const sampleAlerts: Alert[] = [
  {
    id: "alert1",
    title: "Flood Warning",
    location: "New Orleans, LA",
    timestamp: "2023-10-15T08:30:00",
    level: "high",
    type: "flood",
  },
  {
    id: "alert2",
    title: "Wildfire Alert",
    location: "Los Angeles, CA",
    timestamp: "2023-10-14T14:45:00",
    level: "severe",
    type: "wildfire",
  },
  {
    id: "alert3",
    title: "Hurricane Watch",
    location: "Miami, FL",
    timestamp: "2023-10-13T11:15:00",
    level: "medium",
    type: "hurricane",
  },
  {
    id: "alert4",
    title: "Earthquake Advisory",
    location: "San Francisco, CA",
    timestamp: "2023-10-12T09:20:00",
    level: "low",
    type: "earthquake",
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
