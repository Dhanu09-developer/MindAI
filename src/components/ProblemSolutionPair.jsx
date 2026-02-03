import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProblemSolutionPair = ({ problem, solution, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative"
    >
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Problem Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-300">
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-300 mb-2">
                Challenge
              </h3>
              <p className="text-lg font-medium text-white leading-snug">
                {problem}
              </p>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="hidden md:flex justify-center text-purple-500/50">
          <ArrowRight className="w-8 h-8 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <div className="md:hidden flex justify-center text-purple-500/50 -my-3 z-10 relative">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </div>

        {/* Solution Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-300">
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-green-300 mb-2">
                Solution
              </h3>
              <p className="text-lg font-medium text-white leading-snug">
                {solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemSolutionPair;
