
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type DisasterType = 
  | "earthquake" 
  | "flood" 
  | "hurricane" 
  | "wildfire" 
  | "tsunami" 
  | "drought";

const disasterTypes: { id: DisasterType; label: string }[] = [
  { id: "earthquake", label: "Earthquake" },
  { id: "flood", label: "Flood" },
  { id: "hurricane", label: "Hurricane" },
  { id: "wildfire", label: "Wildfire" },
  { id: "tsunami", label: "Tsunami" },
  { id: "drought", label: "Drought" },
];

type DisasterTypeFilterProps = {
  onChange?: (selectedTypes: DisasterType[]) => void;
  className?: string;
};

export function DisasterTypeFilter({ onChange, className }: DisasterTypeFilterProps) {
  const [selectedTypes, setSelectedTypes] = useState<DisasterType[]>([]);

  const toggleType = (type: DisasterType) => {
    const newSelection = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newSelection);
    onChange?.(newSelection);
  };

  const isSelected = (type: DisasterType) => selectedTypes.includes(type);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {disasterTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => toggleType(type.id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
            isSelected(type.id)
              ? `bg-disaster-${type.id}/10 border-disaster-${type.id}/30 text-disaster-${type.id}`
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {isSelected(type.id) && <Check className="h-3.5 w-3.5" />}
          {type.label}
        </button>
      ))}
    </div>
  );
}
