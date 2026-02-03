import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  TrendingUp,
  Phone,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Hero = () => {
  const { toast } = useToast();

  const handleCTAClick = (action) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} will be available in the next update.`,
      className: "bg-slate-900 border-purple-600 text-white",
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900/50" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              AI-Powered Mental Health
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight sm:leading-[1.1] tracking-tight px-2"
          >
            Mental wellness that feels like{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              home.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-purple-300 mb-8 sm:mb-12 font-light leading-relaxed max-w-2xl mx-auto px-4"
          >
            The first multilingual, offline-ready AI platform designed to
            listen, support, and guide students across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4 justify-center items-center px-4"
          >
            <Button
              onClick={() => handleCTAClick("Talk to AI")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-medium shadow-lg shadow-purple-600/50 hover:shadow-xl hover:shadow-purple-600/70 hover:-translate-y-1 transition-all duration-300 w-full max-w-xs sm:max-w-none min-w-[200px] border-0"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to AI
            </Button>

            <Button
              onClick={() => handleCTAClick("Track Mood")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 rounded-xl px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-medium backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 w-full max-w-xs sm:max-w-none min-w-[200px]"
            >
              <TrendingUp className="w-5 h-5 mr-2 text-blue-300" />
              Track Mood
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-2 text-purple-400 font-medium"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Emergency support available 24/7</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
