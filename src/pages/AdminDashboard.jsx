import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, Database, Server } from "lucide-react";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <ShieldCheck className="text-indigo-600 w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800">Admin Console</span>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">System Status</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              System Health
            </h3>
            <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
              <Activity className="w-5 h-5" />
              Operational
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Total Users
            </h3>
            <div className="font-bold text-2xl text-gray-800">1,245</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Daily Check-ins
            </h3>
            <div className="font-bold text-2xl text-gray-800">843</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Database Status
            </h3>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <Database className="w-5 h-5" />
              Synced
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Recent Activity Logs</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Server className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    New user registration (Student)
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  2024-02-03 10:{30 + i}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
