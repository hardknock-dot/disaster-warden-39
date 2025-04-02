
import { Shield } from "lucide-react";

const resources = [
  {
    title: "Emergency Preparedness Guide",
    description: "Learn how to prepare for various types of disasters and emergencies.",
    link: "#",
  },
  {
    title: "Evacuation Planning",
    description: "Create evacuation plans for your family and community.",
    link: "#",
  },
  {
    title: "Disaster Kit Checklist",
    description: "Essential items to include in your emergency disaster kit.",
    link: "#",
  },
  {
    title: "Government Resources",
    description: "Official government resources for disaster response and recovery.",
    link: "#",
  },
  {
    title: "Community Response Training",
    description: "Training programs for community disaster response teams.",
    link: "#",
  },
  {
    title: "Emergency Contacts",
    description: "Important emergency contacts and services.",
    link: "#",
  },
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">
          Emergency preparedness and disaster response resources
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div 
            key={index} 
            className="dashboard-card flex flex-col"
          >
            <div className="mb-4">
              <Shield className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {resource.description}
              </p>
            </div>
            <div className="mt-auto pt-2">
              <a 
                href={resource.link} 
                className="text-sm font-medium text-primary hover:underline"
              >
                View Resource →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
