import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { addDays, format, isPast } from "date-fns";

const FollowUpReminder = ({ studentId }) => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (user) {
      const all = db.reminders.getAll();
      // Filter for this student and this counsellor
      const relevant = all.filter(
        (r) =>
          r.student_id === studentId &&
          r.counsellor_id === user.id &&
          !r.completed,
      );
      setReminders(relevant);
    }
  }, [user, studentId]);

  const addReminder = (days) => {
    const due = addDays(new Date(), days);
    const newRem = db.reminders.create({
      counsellor_id: user.id,
      student_id: studentId,
      due_date: due.toISOString(),
      notes: `Follow up in ${days} days`,
    });
    setReminders([...reminders, newRem]);
  };

  const completeReminder = (id) => {
    db.reminders.update(id, { completed: true });
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
        <Bell className="w-4 h-4 text-purple-600" />
        Follow-up Reminders
      </h3>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[3, 7, 14].map((day) => (
          <button
            key={day}
            onClick={() => addReminder(day)}
            className="whitespace-nowrap px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-100 transition-colors border border-purple-100"
          >
            + {day} Days
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {reminders.length === 0 && (
          <p className="text-sm text-gray-400 italic">No pending reminders.</p>
        )}
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${isPast(new Date(rem.due_date)) ? "bg-red-500" : "bg-green-500"}`}
              />
              <div>
                <p className="text-xs font-bold text-gray-700">
                  {format(new Date(rem.due_date), "MMM dd")}
                </p>
                <p className="text-[10px] text-gray-500">{rem.notes}</p>
              </div>
            </div>
            <button
              onClick={() => completeReminder(rem.id)}
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpReminder;
