import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile,
  MessageCircle,
  Users,
  Calendar as CalIcon,
  Heart,
  Phone,
  Home,
  LogOut,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { db } from "@/lib/mysql-db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useOffline } from "@/hooks/useOffline";
import { Button } from "@/components/ui/button";
import { MoodTrendChart, MoodDistributionChart } from "@/components/MoodCharts";
import Assessment from "@/components/Assessment";
import ChatBot from "@/components/ChatBot";
import PeerForum from "@/components/PeerForum";
import CounsellorBooking from "@/components/CounsellorBooking";
import WellnessHub from "@/components/WellnessHub";
import CrisisSupport from "@/components/CrisisSupport";
import { format } from "date-fns";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isOffline = useOffline();
  const [activeTab, setActiveTab] = useState("home");
  const [moodHistory, setMoodHistory] = useState([]);
  const [showAssessment, setShowAssessment] = useState(false);

  // Reuse existing mood logic...
  useEffect(() => {
    if (user) {
      const history = db.moods.getByUserId(user.id);
      setMoodHistory(
        history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
      );
    }
  }, [user, activeTab]);

  const handleMoodCheckIn = (mood) => {
    const newMood = db.moods.create({ user_id: user.id, mood });
    setMoodHistory([newMood, ...moodHistory]);
    toast({ title: "Mood Logged", description: "Thanks for checking in!" });
  };

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "chat", label: "AI Companion", icon: MessageCircle },
    { id: "forum", label: "Peer Support", icon: Users },
    { id: "booking", label: "Counsellors", icon: CalIcon },
    { id: "wellness", label: "Wellness Hub", icon: Heart },
    {
      id: "crisis",
      label: "Helplines",
      icon: Phone,
      className: "text-red-500 hover:bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="bg-white w-full md:w-64 border-r border-gray-100 flex-shrink-0 md:h-screen sticky top-0 z-40">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindCare AI
          </span>
          <div
            className={`w-3 h-3 rounded-full ${isOffline ? "bg-red-500" : "bg-green-500"}`}
            title={isOffline ? "Offline" : "Online"}
          />
        </div>
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto hidden md:block">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-purple-100 text-purple-700 font-bold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              } ${item.className || ""}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto p-2 border-b gap-2 scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                activeTab === item.id
                  ? "bg-purple-600 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 hidden md:block">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && (
              <div className="space-y-8 max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Hello, Student
                    </h1>
                    <p className="text-gray-500">Here's your daily summary.</p>
                  </div>
                </header>

                {/* Simplified Home Dashboard reused from previous implementation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4">
                      How are you feeling?
                    </h2>
                    <div className="flex justify-between gap-2">
                      {["great", "okay", "bad", "terrible"].map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMoodCheckIn(m)}
                          className="flex-1 p-4 rounded-lg bg-gray-50 hover:bg-purple-50 hover:text-purple-600 transition-colors capitalize border border-transparent hover:border-purple-200"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </section>
                  <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4">
                      Mood Trends
                    </h2>
                    <MoodTrendChart data={moodHistory} />
                  </section>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => setActiveTab("chat")}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-8 h-8 mb-4" />
                    <h3 className="font-bold text-lg">Talk to AI</h3>
                    <p className="text-white/80 text-sm">
                      Vent anonymously 24/7
                    </p>
                  </div>
                  <div
                    onClick={() => setActiveTab("booking")}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-purple-300 transition-colors"
                  >
                    <CalIcon className="w-8 h-8 mb-4 text-blue-500" />
                    <h3 className="font-bold text-lg text-gray-800">
                      Book Session
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Connect with experts
                    </p>
                  </div>
                  <div
                    onClick={() => setActiveTab("wellness")}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-green-300 transition-colors"
                  >
                    <Heart className="w-8 h-8 mb-4 text-green-500" />
                    <h3 className="font-bold text-lg text-gray-800">Relax</h3>
                    <p className="text-gray-500 text-sm">Meditation & Tools</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "chat" && <ChatBot />}
            {activeTab === "forum" && <PeerForum />}
            {activeTab === "booking" && <CounsellorBooking />}
            {activeTab === "wellness" && <WellnessHub />}
            {activeTab === "crisis" && <CrisisSupport />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudentDashboard;
