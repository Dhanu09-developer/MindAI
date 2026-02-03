import React, { useState, useEffect } from "react";
import { Save, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const SessionNotes = ({ studentId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Load existing notes for this student
    if (user && studentId) {
      const notes = db.notes.getByStudentId(studentId);
      if (notes.length > 0) {
        // Sort by latest
        const latest = notes.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        )[0];
        setNote(latest.content);
        setLastSaved(latest.timestamp);
      } else {
        setNote("");
        setLastSaved(null);
      }
    }
  }, [user, studentId]);

  const handleSave = () => {
    if (!note.trim()) return;

    db.notes.create({
      counsellor_id: user.id,
      student_id: studentId,
      content: note,
    });

    setLastSaved(new Date().toISOString());
    toast({
      title: "Notes Saved",
      description: "Session notes securely stored.",
    });
  };

  // Simple debounce for auto-save could be implemented here

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          <span className="bg-yellow-100 p-1 rounded text-yellow-700">🔒</span>
          Confidential Notes
        </h3>
        <div className="text-xs text-gray-400">
          {lastSaved
            ? `Saved ${format(new Date(lastSaved), "h:mm a")}`
            : "Not saved"}
        </div>
      </div>
      <div className="p-4 flex-1">
        <textarea
          className="w-full h-48 md:h-64 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm text-gray-700 leading-relaxed"
          placeholder="Type session notes here... (Only visible to you)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={2000}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {note.length}/2000 chars
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNote("")}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 gap-2"
            >
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;
