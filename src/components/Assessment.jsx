import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed",
  "Thoughts that you would be better off dead, or of hurting yourself",
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

const Assessment = ({ type = "phq9", onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const questions = type === "phq9" ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
  const title =
    type === "phq9" ? "Mood Check (PHQ-9)" : "Anxiety Check (GAD-7)";

  const handleResponse = (value) => {
    const newResponses = { ...responses, [currentQuestion]: value };
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishAssessment(newResponses);
    }
  };

  const finishAssessment = (finalResponses) => {
    const totalScore = Object.values(finalResponses).reduce((a, b) => a + b, 0);
    setScore(totalScore);
    setCompleted(true);

    db.assessments.create({
      user_id: user.id,
      type: type,
      responses: finalResponses,
      score: totalScore,
    });

    toast({
      title: "Assessment Saved",
      description: "Your results have been securely recorded.",
    });
  };

  const getResultFeedback = (score) => {
    if (score < 5)
      return {
        text: "Scores suggest minimal symptoms. Keep taking care of yourself!",
        color: "text-green-600",
      };
    if (score < 10)
      return {
        text: "Mild symptoms detected. Consider tracking your mood more often.",
        color: "text-blue-600",
      };
    if (score < 15)
      return {
        text: "Moderate symptoms. Talking to a counsellor might be helpful.",
        color: "text-orange-600",
      };
    return {
      text: "Moderately severe to severe symptoms. We strongly recommend reaching out for support.",
      color: "text-red-600",
    };
  };

  if (completed) {
    const feedback = getResultFeedback(score);
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check-in Complete
          </h2>
          <p className="text-4xl font-bold text-purple-600 mb-4">
            {score}{" "}
            <span className="text-sm text-gray-400 font-normal">
              / {questions.length * 3}
            </span>
          </p>
          <p className={`text-lg font-medium ${feedback.color} mb-6`}>
            {feedback.text}
          </p>
        </motion.div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          {score >= 10 && (
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Talk to a Counsellor
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-2 bg-gray-100 h-2 rounded-full">
        <motion.div
          className="bg-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="py-8"
      >
        <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-8">
          {questions[currentQuestion]}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleResponse(idx)}
              className="p-4 rounded-lg border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all text-sm font-medium"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Assessment;
