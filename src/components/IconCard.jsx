import React from "react";
import { motion } from "framer-motion";

const IconCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-3xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all duration-300"
    >
      <div className="flex flex-col items-start gap-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-purple-500/30">
          <Icon className="w-8 h-8 text-purple-300 group-hover:text-blue-300 stroke-[1.5] transition-colors duration-300" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-purple-200/80 leading-relaxed text-base font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IconCard;
