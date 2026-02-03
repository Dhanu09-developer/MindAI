import React from "react";
import { BookOpen, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const RESOURCES = [
  { id: "1", title: "Box Breathing Guide", category: "Anxiety", type: "PDF" },
  { id: "2", title: "Sleep Hygiene 101", category: "Sleep", type: "Article" },
  { id: "3", title: "Exam Stress Buster", category: "Academic", type: "Audio" },
  {
    id: "4",
    title: "Mindfulness Basics",
    category: "Meditation",
    type: "Video",
  },
];

const ResourceRecommendations = ({ studentId }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSend = (resource) => {
    db.sentResources.create({
      counsellor_id: user.id,
      student_id: studentId,
      resource_id: resource.id,
      resource_title: resource.title,
    });
    toast({
      title: "Resource Sent",
      description: `${resource.title} shared with student.`,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-full">
      <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-600" />
        Recommended Resources
      </h3>

      <div className="space-y-3">
        {RESOURCES.map((res) => (
          <div
            key={res.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{res.title}</p>
              <span className="text-[10px] uppercase tracking-wide text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
                {res.category}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleSend(res)}
              className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceRecommendations;
