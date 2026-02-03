import React from "react";
import { motion } from "framer-motion";
import { Shield, Activity, Network, BarChart2 } from "lucide-react";
import ProblemSolutionPair from "./ProblemSolutionPair";

const ProblemSolution = () => {
  const problems = [
    {
      problem: "Fear of judgment preventing open conversation",
      solution: "Complete anonymity with AI & peer support",
      icon: Shield,
    },
    {
      problem: "Delayed intervention for at-risk students",
      solution: "Real-time mood tracking & auto-alerts",
      icon: Activity,
    },
    {
      problem: "Fragmented mental health resources",
      solution: "Unified platform for all wellness needs",
      icon: Network,
    },
    {
      problem: "Lack of actionable emotional insights",
      solution: "Data-driven patterns & personalized care",
      icon: BarChart2,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-900/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight">
            Bridging the gap to{" "}
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              better care.
            </span>
          </h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto font-light leading-relaxed">
            We identify the barriers to student well-being and dismantle them
            with thoughtful, accessible technology.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {problems.map((item, index) => (
            <ProblemSolutionPair
              key={index}
              problem={item.problem}
              solution={item.solution}
              icon={item.icon}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
