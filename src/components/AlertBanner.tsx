
import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertLevel = "low" | "medium" | "high" | "severe";

type AlertBannerProps = {
  message: string;
  level: AlertLevel;
  isActive?: boolean;
};

export function AlertBanner({ message, level, isActive = true }: AlertBannerProps) {
  const [visible, setVisible] = useState(isActive);

  // Reset visibility when isActive changes
  useEffect(() => {
    setVisible(isActive);
  }, [isActive]);

  if (!visible) return null;

  const alertStyles: Record<AlertLevel, string> = {
    low: "bg-alert-low/10 text-alert-low border-alert-low/30",
    medium: "bg-alert-medium/10 text-alert-medium border-alert-medium/30 animate-pulse-warning",
    high: "bg-alert-high/10 text-alert-high border-alert-high/30 animate-pulse-warning",
    severe: "bg-alert-severe/20 text-alert-severe border-alert-severe/30 animate-pulse-warning",
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 z-50 flex max-w-md -translate-x-1/2 items-center gap-2 rounded-lg border px-4 py-2 shadow-lg animate-slide-in md:top-6",
        alertStyles[level]
      )}
    >
      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="rounded-full p-1 hover:bg-black/10"
        aria-label="Dismiss alert"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
