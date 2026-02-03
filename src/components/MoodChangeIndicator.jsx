import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { differenceInDays, subDays } from "date-fns";

const MoodChangeIndicator = ({ moodHistory }) => {
  if (!moodHistory || moodHistory.length < 2) {
    return (
      <div className="flex items-center gap-1 text-gray-400 text-sm">
        <Minus className="w-4 h-4" />
        <span>Stable</span>
      </div>
    );
  }

  // Helper to convert mood to number
  const getScore = (mood) => {
    switch (mood) {
      case "great":
        return 4;
      case "okay":
        return 3;
      case "bad":
        return 2;
      case "terrible":
        return 1;
      default:
        return 0;
    }
  };

  // Sort history by date descending
  const sorted = [...moodHistory].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );

  // Get last 7 days data
  const today = new Date();
  const recent = sorted.filter(
    (m) => differenceInDays(today, new Date(m.timestamp)) <= 7,
  );

  if (recent.length < 2) {
    return (
      <div className="flex items-center gap-1 text-gray-400 text-sm">
        <Minus className="w-4 h-4" />
        <span>Stable (No Data)</span>
      </div>
    );
  }

  // Calculate trends: Compare first half of week vs second half or just current vs avg
  const currentAvg =
    recent
      .slice(0, Math.ceil(recent.length / 2))
      .reduce((acc, curr) => acc + getScore(curr.mood), 0) /
    Math.ceil(recent.length / 2);
  const prevAvg =
    recent
      .slice(Math.ceil(recent.length / 2))
      .reduce((acc, curr) => acc + getScore(curr.mood), 0) /
    Math.floor(recent.length / 2);

  const diff = currentAvg - prevAvg;
  const percentChange =
    prevAvg !== 0 ? Math.round((Math.abs(diff) / prevAvg) * 100) : 0;

  if (diff > 0.5) {
    return (
      <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
        <TrendingUp className="w-4 h-4" />
        <span>{percentChange}% Improving</span>
      </div>
    );
  } else if (diff < -0.5) {
    return (
      <div className="flex items-center gap-1 text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
        <TrendingDown className="w-4 h-4" />
        <span>{percentChange}% Decline</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded-full">
        <Minus className="w-4 h-4" />
        <span>Stable</span>
      </div>
    );
  }
};

export default MoodChangeIndicator;
