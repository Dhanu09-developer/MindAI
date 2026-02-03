import React from "react";
import { Play, Book, Headphones, Download } from "lucide-react";

const RESOURCES = [
  {
    id: 1,
    title: "5-Minute Anxiety Relief",
    type: "audio",
    category: "Meditation",
    duration: "5 min",
    icon: Headphones,
  },
  {
    id: 2,
    title: "Deep Sleep Guide",
    type: "pdf",
    category: "Sleep",
    duration: "10 pages",
    icon: Book,
  },
  {
    id: 3,
    title: "Exam Stress Buster",
    type: "video",
    category: "Study Tips",
    duration: "12 min",
    icon: Play,
  },
  {
    id: 4,
    title: "Box Breathing Technique",
    type: "audio",
    category: "Breathing",
    duration: "3 min",
    icon: Headphones,
  },
  {
    id: 5,
    title: "Healthy Eating for Students",
    type: "pdf",
    category: "Nutrition",
    duration: "5 pages",
    icon: Book,
  },
  {
    id: 6,
    title: "Morning Yoga Routine",
    type: "video",
    category: "Exercise",
    duration: "15 min",
    icon: Play,
  },
];

const WellnessHub = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Wellness & Resource Hub
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((resource) => (
          <div
            key={resource.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <resource.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-500">
                {resource.category}
              </span>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {resource.duration} • {resource.type.toUpperCase()}
            </p>

            <button className="w-full flex items-center justify-center gap-2 border border-purple-200 text-purple-700 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              <Download className="w-4 h-4" /> Download / View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessHub;
