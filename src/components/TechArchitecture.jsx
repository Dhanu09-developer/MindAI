import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  Smartphone,
  Lock,
  RefreshCw,
  Server,
} from "lucide-react";

const TechArchitecture = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-900/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
          Technical Architecture
        </h2>

        <div className="relative max-w-5xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/30 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            {/* Frontend Layer */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl backdrop-blur-sm border border-blue-500/30 shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] text-center transition-all duration-300"
            >
              <div className="mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                <Smartphone className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="font-bold text-white mb-2">Client Layer</h3>
              <p className="text-sm text-blue-200">
                React PWA • Offline Cache • End-to-End Encryption
              </p>
            </motion.div>

            {/* Middle Layer (Arrows) */}
            <div className="hidden md:flex justify-center">
              <RefreshCw className="w-12 h-12 text-purple-400 animate-spin-slow" />
            </div>

            {/* Backend Layer */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl backdrop-blur-sm border border-purple-500/30 shadow-[0_8px_32px_rgba(168,85,247,0.1)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] text-center transition-all duration-300"
            >
              <div className="mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                <Cloud className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="font-bold text-white mb-2">Cloud Services</h3>
              <p className="text-sm text-purple-200">
                Supabase Auth • Real-time DB • AI Microservices
              </p>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-start-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl backdrop-blur-sm border border-green-500/30 shadow-[0_8px_32px_rgba(34,197,94,0.1)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.2)] text-center transition-all duration-300">
              <div className="mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                <Lock className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="font-bold text-white mb-2">Security Layer</h3>
              <p className="text-sm text-green-200">
                AES-256 Encryption • Anonymization • NDHM Compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechArchitecture;
