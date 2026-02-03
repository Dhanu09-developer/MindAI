import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Heart,
  Users,
  Brain,
} from "lucide-react";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import TechArchitecture from "@/components/TechArchitecture";
import SecurityCompliance from "@/components/SecurityCompliance";
import FeasibilityViability from "@/components/FeasibilityViability";
import Footer from "@/components/Footer";

const LandingPage = () => {
  const menuItems = [
    { id: "home", label: "Overview", icon: Sparkles },
    { id: "features", label: "Features", icon: Zap },
    { id: "tech", label: "Tech Stack", icon: BarChart3 },
    { id: "security", label: "Security", icon: Shield },
    { id: "impact", label: "Impact", icon: Heart },
    { id: "viability", label: "Viability", icon: Users },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>MindCare AI - First Multilingual Mental Health Platform</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Sticky Header/Taskbar */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/20 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              {/* Logo Icon */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-slate-900 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                  <Brain size={16} className="text-purple-300 sm:hidden" />
                  <Brain
                    size={24}
                    className="text-purple-300 hidden sm:block"
                  />
                </div>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                MindCare
              </span>
            </motion.div>

            {/* Navigation Pills - Mobile Friendly */}
            <nav className="hidden sm:flex items-center gap-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:bg-purple-500/20 text-purple-200 hover:text-purple-100 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} className="inline mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.slice(0, 3)}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <select
                onChange={(e) => scrollToSection(e.target.value)}
                className="bg-purple-500/20 text-purple-200 border border-purple-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Menu
                </option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Main Content - All Sections Displayed Continuously */}
        <main>
          {/* Overview/Home Section */}
          <section id="home" className="min-h-screen">
            <Hero />
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="min-h-screen bg-gradient-to-br from-slate-900/50 via-slate-900 to-slate-900 py-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <Features />
                <div className="mt-20">
                  <ProblemSolution />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technology Architecture Section */}
          <section
            id="tech"
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 py-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <TechArchitecture />
              </motion.div>
            </div>
          </section>

          {/* Security & Compliance Section */}
          <section
            id="security"
            className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900/50 py-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <SecurityCompliance />
              </motion.div>
            </div>
          </section>

          {/* Impact Section */}
          <section
            id="impact"
            className="min-h-screen bg-gradient-to-br from-slate-900/50 to-slate-900 py-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <Impact />
              </motion.div>
            </div>
          </section>

          {/* Viability Section */}
          <section
            id="viability"
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950 py-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <FeasibilityViability />
              </motion.div>
            </div>
          </section>

          {/* Footer Section */}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
