import React from "react";
import { Sparkles } from "lucide-react";

const AIInsightSummary = ({ moodHistory }) => {
  // Mock AI Logic
  const getInsight = () => {
    if (!moodHistory || moodHistory.length === 0)
      return { text: "No data available for analysis.", confidence: "Low" };

    const sorted = [...moodHistory].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );
    const recent = sorted.slice(0, 5);
    const badCount = recent.filter(
      (m) => m.mood === "bad" || m.mood === "terrible",
    ).length;

    if (badCount >= 3)
      return {
        text: "Pattern of persistent low mood detected this week.",
        confidence: "High",
      };
    if (badCount === 0)
      return {
        text: "Consistently positive mood reported recently.",
        confidence: "High",
      };

    return {
      text: "Mood fluctuations appear normal for this period.",
      confidence: "Medium",
    };
  };

  const insight = getInsight();
  const confidenceColor =
    insight.confidence === "High"
      ? "text-green-600"
      : insight.confidence === "Medium"
        ? "text-yellow-600"
        : "text-gray-500";

  return (
    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-gray-800 font-medium">{insight.text}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">AI Confidence:</span>
          <span className={`text-xs font-bold ${confidenceColor}`}>
            {insight.confidence}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightSummary;
