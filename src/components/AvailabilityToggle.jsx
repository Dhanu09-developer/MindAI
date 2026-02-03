import React, { useState, useEffect } from "react";
import { UserCheck, Clock, UserX } from "lucide-react";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

const AvailabilityToggle = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState("available");

  useEffect(() => {
    // In real app, fetch from DB
    // setStatus(user?.status || 'available');
  }, [user]);

  const toggleStatus = () => {
    const next =
      status === "available"
        ? "busy"
        : status === "busy"
          ? "offline"
          : "available";
    setStatus(next);
    if (user) db.users.update(user.id, { status: next });
  };

  const config = {
    available: {
      label: "Available",
      color: "bg-green-100 text-green-700",
      icon: UserCheck,
      dot: "bg-green-500",
    },
    busy: {
      label: "Busy",
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
      dot: "bg-yellow-500",
    },
    offline: {
      label: "Offline",
      color: "bg-gray-100 text-gray-700",
      icon: UserX,
      dot: "bg-gray-500",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <button
      onClick={toggleStatus}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${current.color} hover:opacity-80`}
    >
      <div className={`w-2 h-2 rounded-full ${current.dot} animate-pulse`} />
      <Icon className="w-4 h-4" />
      {current.label}
    </button>
  );
};

export default AvailabilityToggle;
