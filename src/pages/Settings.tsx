
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and notifications
        </p>
      </div>

      <div className="dashboard-card">
        <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">In-app Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts within the application</p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={setNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive disaster alerts via email</p>
            </div>
            <Switch 
              id="email-alerts" 
              checked={emailAlerts} 
              onCheckedChange={setEmailAlerts} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-alerts">SMS Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via text message</p>
            </div>
            <Switch 
              id="sms-alerts" 
              checked={smsAlerts} 
              onCheckedChange={setSmsAlerts} 
            />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="text-lg font-medium mb-4">Application Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
            </div>
            <Switch 
              id="auto-refresh" 
              checked={autoRefresh} 
              onCheckedChange={setAutoRefresh} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <Switch 
              id="dark-mode" 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
