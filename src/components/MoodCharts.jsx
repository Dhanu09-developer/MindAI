import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subDays } from "date-fns";

const COLORS = {
  great: "#4ade80", // green-400
  okay: "#60a5fa", // blue-400
  bad: "#fb923c", // orange-400
  terrible: "#f87171", // red-400
};

export const MoodTrendChart = ({ data }) => {
  // Process data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), 6 - i);
    return format(d, "MMM dd");
  });

  const chartData = last7Days.map((day) => {
    // Find check-in for this day
    const checkin = data.find(
      (d) => format(new Date(d.timestamp), "MMM dd") === day,
    );
    let score = 0; // 0 for no data
    if (checkin) {
      switch (checkin.mood) {
        case "great":
          score = 4;
          break;
        case "okay":
          score = 3;
          break;
        case "bad":
          score = 2;
          break;
        case "terrible":
          score = 1;
          break;
        default:
          score = 0;
      }
    }
    return { date: day, score };
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide domain={[0, 4]} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar dataKey="score" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.score === 4
                    ? COLORS.great
                    : entry.score === 3
                      ? COLORS.okay
                      : entry.score === 2
                        ? COLORS.bad
                        : entry.score === 1
                          ? COLORS.terrible
                          : "#e5e7eb"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MoodDistributionChart = ({ data }) => {
  const counts = data.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(counts).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: counts[key],
    color: COLORS[key],
  }));

  if (chartData.length === 0)
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        No data yet
      </div>
    );

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
