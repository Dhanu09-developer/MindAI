import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  TrendingUp,
  UserCheck,
  Users,
  BookOpen,
  Wifi,
} from "lucide-react";
import IconCard from "./IconCard";

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Regional AI Chatbot",
      description:
        "Support in 6+ Indian languages, ensuring every student feels heard and understood.",
    },
    {
      icon: TrendingUp,
      title: "Mood Insights",
      description:
        "Visual tracking of emotional patterns to help identify triggers and improvements.",
    },
    {
      icon: UserCheck,
      title: "Private Booking",
      description:
        "Secure, confidential sessions with verified counsellors at your convenience.",
    },
    {
      icon: Users,
      title: "Peer Community",
      description:
        "Safe, moderated spaces to share experiences without fear of judgment.",
    },
    {
      icon: BookOpen,
      title: "Wellness Hub",
      description:
        "Curated library of meditation guides, stress management tips, and more.",
    },
    {
      icon: Wifi,
      title: "Offline Access",
      description:
        "Core features work seamlessly even with low or no internet connectivity.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-slate-900/50 to-slate-900 relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight px-2">
            Holistic support for{" "}
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              every need.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Thoughtfully designed tools to nurture mental resilience and
            emotional growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
          {features.map((feature, index) => (
            <IconCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
