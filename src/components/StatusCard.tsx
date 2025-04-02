
import { cn } from "@/lib/utils";

type AlertLevel = "low" | "medium" | "high" | "severe";

type StatusCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  alertLevel?: AlertLevel;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export function StatusCard({
  title,
  value,
  description,
  icon,
  alertLevel,
  trend,
  className,
}: StatusCardProps) {
  const alertStyles: Record<AlertLevel, string> = {
    low: "border-alert-low/30",
    medium: "border-alert-medium/30",
    high: "border-alert-high/30", 
    severe: "border-alert-severe/30",
  };

  return (
    <div
      className={cn(
        "dashboard-card",
        alertLevel && alertStyles[alertLevel],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {description && (
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      )}
      {alertLevel && (
        <div className="mt-3">
          <span
            className={cn(
              "alert-badge",
              `alert-badge-${alertLevel}`
            )}
          >
            {alertLevel.charAt(0).toUpperCase() + alertLevel.slice(1)} Risk
          </span>
        </div>
      )}
    </div>
  );
}
