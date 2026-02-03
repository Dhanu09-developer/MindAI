import React from "react";
import { motion } from "framer-motion";
import { Calendar, MoreHorizontal, User } from "lucide-react";
import MoodChangeIndicator from "@/components/MoodChangeIndicator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const StudentProfileCard = ({
  student,
  moodHistory,
  priority,
  reason,
  onAction,
}) => {
  // Get latest mood
  const latestMood = moodHistory[0]?.mood || "N/A";
  const latestDate = moodHistory[0]?.timestamp
    ? format(new Date(moodHistory[0].timestamp), "MMM dd")
    : "Never";

  const priorityColors = {
    High: "bg-red-50 border-red-100 hover:border-red-200",
    Medium: "bg-yellow-50 border-yellow-100 hover:border-yellow-200",
    Low: "bg-green-50 border-green-100 hover:border-green-200",
  };

  const badgeColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const emoji =
    {
      great: "😄",
      okay: "😐",
      bad: "☹️",
      terrible: "😫",
    }[latestMood] || "❓";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-5 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group ${priorityColors[priority]}`}
      onClick={() => onAction("view", student)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-xl">{emoji}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              Student #{student.id.slice(0, 6)}
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${badgeColors[priority]}`}
              >
                {priority}
              </span>
            </h4>
            <p className="text-xs text-gray-500">Last check-in: {latestDate}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/60 p-2 rounded-lg backdrop-blur-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
            Trend
          </p>
          <MoodChangeIndicator moodHistory={moodHistory} />
        </div>
        <div className="bg-white/60 p-2 rounded-lg backdrop-blur-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
            Reason
          </p>
          <p
            className="text-xs font-medium text-gray-700 truncate"
            title={reason}
          >
            {reason}
          </p>
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 h-8 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onAction("view", student);
          }}
        >
          View Profile
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onAction("view", student);
          }}
        >
          Start Session
        </Button>
      </div>
    </motion.div>
  );
};

export default StudentProfileCard;
