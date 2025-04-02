
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}
