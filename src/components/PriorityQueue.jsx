import React, { useState, useEffect } from "react";
import { db } from "@/lib/db";
import StudentProfileCard from "@/components/StudentProfileCard";
import { Loader2 } from "lucide-react";

const PriorityQueue = ({ onSelectStudent }) => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch students
    const students = db.users.getAll().filter((u) => u.role === "student");
    const allMoods = db.moods.getAll();

    // 2. Calculate priority for each
    const processed = students.map((student) => {
      const history = allMoods
        .filter((m) => m.user_id === student.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      let priority = "Low";
      let reason = "Stable mood";

      if (history.length > 0) {
        const recent = history.slice(0, 5);
        const badCount = recent.filter(
          (m) => m.mood === "bad" || m.mood === "terrible",
        ).length;

        if (badCount >= 3) {
          priority = "High";
          reason = "Persistent low mood";
        } else if (badCount >= 1) {
          priority = "Medium";
          reason = "Recent low mood reported";
        }
      } else {
        reason = "New student / No data";
      }

      return { student, history, priority, reason };
    });

    // 3. Sort by priority
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    processed.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );

    setQueue(processed);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Student Priority Queue
        </h2>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md font-bold">
            {queue.filter((i) => i.priority === "High").length} High
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md font-bold">
            {queue.filter((i) => i.priority === "Medium").length} Med
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queue.map((item) => (
          <StudentProfileCard
            key={item.student.id}
            student={item.student}
            moodHistory={item.history}
            priority={item.priority}
            reason={item.reason}
            onAction={() => onSelectStudent(item.student, item.history)}
          />
        ))}
        {queue.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityQueue;
