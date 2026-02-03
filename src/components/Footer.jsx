import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-slate-900/50 to-slate-900 text-white py-20 border-t border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <Heart
                className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                fill="currentColor"
              />
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MindCare AI
              </span>
            </motion.div>
            <p className="text-purple-300 leading-relaxed text-sm">
              Empowering students with accessible, confidential, and
              culturally-sensitive mental health support technology.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-6">
              Platform
            </h3>
            <ul className="space-y-4">
              {["Features", "Impact", "About", "Login"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-purple-300 hover:text-purple-100 transition-colors duration-300 text-sm font-medium"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-purple-300">
              <li className="flex items-center gap-3 hover:text-purple-100 transition-colors">
                <Mail className="w-4 h-4" />
                <span>help@mindcareai.org</span>
              </li>
              <li className="flex items-center gap-3 hover:text-purple-100 transition-colors">
                <Phone className="w-4 h-4" />
                <span>1800-CARE-123</span>
              </li>
              <li className="flex items-center gap-3 hover:text-purple-100 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-6">
              Connect
            </h3>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -4 }}
                  className="bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20 hover:border-white/40 text-purple-300 hover:text-purple-100 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-purple-300">
          <p>
            &copy; {new Date().getFullYear()} MindCare AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-100 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
