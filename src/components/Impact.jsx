import React from "react";
import { motion } from "framer-motion";
import MetricCard from "./MetricCard";

const Impact = () => {
  const metrics = [
    { value: "35", label: "Faster access", suffix: "%" },
    { value: "75", label: "Early detection", suffix: "%" },
    { value: "10", label: "Response speed", suffix: "x" },
    { value: "90", label: "Cost reduction", suffix: "%" },
  ];

  return (
    <section
      id="impact"
      className="py-24 bg-gradient-to-b from-slate-900/50 to-slate-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent mb-6 tracking-tight">
            Real impact,{" "}
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              measured.
            </span>
          </h2>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto font-light">
            Our technology isn't just innovative—it creates tangible
            improvements in student well-being outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              suffix={metric.suffix}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
