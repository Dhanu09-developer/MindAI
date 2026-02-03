import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import {
  Users,
  AlertTriangle,
  Calendar,
  Clock,
  X,
  BarChart2,
} from "lucide-react";
import AvailabilityToggle from "@/components/AvailabilityToggle";
import EmergencyEscalation from "@/components/EmergencyEscalation";
import PriorityQueue from "@/components/PriorityQueue";
import SessionNotes from "@/components/SessionNotes";
import FollowUpReminder from "@/components/FollowUpReminder";
import ResourceRecommendations from "@/components/ResourceRecommendations";
import AIInsightSummary from "@/components/AIInsightSummary";
import { MoodTrendChart } from "@/components/MoodCharts";
import { motion, AnimatePresence } from "framer-motion";

const CounsellorDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentHistory, setSelectedStudentHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, appointments: 0 });

  useEffect(() => {
    // Mock stats update
    const students = db.users.getAll().filter((u) => u.role === "student");
    setStats({ total: students.length, appointments: 3 });
  }, []);

  const handleSelectStudent = (student, history) => {
    setSelectedStudent(student);
    setSelectedStudentHistory(history);
  };

  const closeStudentView = () => {
    setSelectedStudent(null);
    setSelectedStudentHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-lg">
                Counsellor Portal
              </h1>
              <p className="text-xs text-gray-500">
                Welcome, {user?.name || "Counsellor"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AvailabilityToggle />
            <EmergencyEscalation />
            <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-500"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedStudent ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {stats.total}
                    </p>
                    <p className="text-xs text-gray-500">Total Students</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {stats.appointments}
                    </p>
                    <p className="text-xs text-gray-500">Sessions Today</p>
                  </div>
                </div>
              </div>

              <PriorityQueue onSelectStudent={handleSelectStudent} />
            </motion.div>
          ) : (
            <motion.div
              key="student-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="h-full flex flex-col gap-6"
            >
              {/* Student Detail Header */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Student #{selectedStudent.id.slice(0, 6)}
                    <span className="text-sm font-normal text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                      Anonymous
                    </span>
                  </h2>
                  <div className="mt-4 flex gap-4">
                    <AIInsightSummary moodHistory={selectedStudentHistory} />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={closeStudentView}
                  className="hover:bg-gray-100 rounded-full p-2 h-10 w-10"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Mood Data & Reminders */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-purple-600" /> Mood
                      Trend (7 Days)
                    </h3>
                    <MoodTrendChart data={selectedStudentHistory} />
                  </div>
                  <FollowUpReminder studentId={selectedStudent.id} />
                </div>

                {/* Middle Column: Session Notes */}
                <div className="lg:col-span-1 h-full">
                  <SessionNotes studentId={selectedStudent.id} />
                </div>

                {/* Right Column: Resources & Actions */}
                <div className="space-y-6">
                  <ResourceRecommendations studentId={selectedStudent.id} />

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100 border-none">
                        <Calendar className="w-4 h-4 mr-2" /> Schedule Session
                      </Button>
                      <Button className="w-full justify-start bg-red-50 text-red-700 hover:bg-red-100 border-none">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Flag High
                        Risk
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CounsellorDashboard;
