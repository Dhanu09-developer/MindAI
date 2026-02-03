import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "You're back online! 🌐",
        description: "Syncing your offline data now...",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      // Simulate sync delay
      setTimeout(() => {
        toast({
          title: "Sync Complete ✅",
          description: "All your changes have been saved.",
        });
      }, 1500);
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "You are offline 📡",
        description:
          "Don't worry, MindCare works offline! Your data will sync when you reconnect.",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast]);

  return isOffline;
};
