import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RoleCard = ({
  role,
  icon: Icon,
  title,
  description,
  color,
  onClick,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, y: -10 }}
    onClick={() => onClick(role)}
    className="cursor-pointer relative overflow-hidden bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/50 w-full max-w-sm mx-auto"
  >
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${color} transition-opacity duration-500`}
    />

    <div className="relative z-10 flex flex-col items-center text-center">
      <div
        className={`p-4 rounded-full bg-gradient-to-br ${color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        {description}
      </p>
      <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-gray-800 transition-colors">
        Enter Dashboard <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </motion.div>
);

const RoleSelectionScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
        <Link
          to="/landing"
          className="text-xs sm:text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
        >
          View Landing Page
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12 max-w-2xl px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
          Welcome to MindCare AI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Select your role to access your personalized dashboard.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full max-w-md sm:max-w-2xl lg:max-w-6xl lg:grid-cols-3">
        <RoleCard
          role="student"
          icon={GraduationCap}
          title="Student"
          description="Track your mood, access resources, and get AI support."
          color="from-blue-500 to-cyan-400"
          onClick={handleRoleSelect}
          delay={0.1}
        />
        <RoleCard
          role="counsellor"
          icon={HeartHandshake}
          title="Counsellor"
          description="Manage appointments and view anonymous student insights."
          color="from-purple-500 to-pink-400"
          onClick={handleRoleSelect}
          delay={0.2}
        />
        <RoleCard
          role="admin"
          icon={ShieldCheck}
          title="Administrator"
          description="Monitor platform health, metrics, and user engagement."
          color="from-indigo-500 to-purple-600"
          onClick={handleRoleSelect}
          delay={0.3}
        />
      </div>
    </div>
  );
};

export default RoleSelectionScreen;
