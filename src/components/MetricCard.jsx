import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const MetricCard = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      // Slower animation for elegance (1.5s)
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-[#F8F7F5]/60 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[200px]"
    >
      <motion.div
        className="text-5xl md:text-6xl font-medium text-[#3A3A3A] mb-4 tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {count}
        <span className="text-[#D4A5A0]">{suffix}</span>
      </motion.div>
      <p className="text-[#8B8680] font-medium tracking-wide uppercase text-sm">
        {label}
      </p>
    </motion.div>
  );
};

export default MetricCard;
