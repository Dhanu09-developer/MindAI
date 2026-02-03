import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Impact", id: "impact" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#F8F7F5]/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.button
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="bg-[#9CAF88]/10 p-2 rounded-full group-hover:bg-[#9CAF88]/20 transition-colors">
              <Heart className="w-6 h-6 text-[#9CAF88]" fill="currentColor" />
            </div>
            <span className="text-xl font-medium tracking-tight text-[#3A3A3A]">
              MindCare AI
            </span>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#8B8680] hover:text-[#9CAF88] font-medium transition-colors duration-300 text-base"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("hero")}
              className="bg-[#9CAF88] hover:bg-[#8B9D83] text-white rounded-2xl px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden text-[#3A3A3A] p-2 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#F8F7F5]/95 backdrop-blur-xl absolute top-full left-0 right-0 border-t border-gray-100 shadow-lg"
            >
              <div className="flex flex-col gap-2 p-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-[#3A3A3A] hover:text-[#9CAF88] font-medium py-3 px-4 rounded-xl hover:bg-white/50 text-left transition-all"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <Button
                    onClick={() => scrollToSection("hero")}
                    className="w-full bg-[#9CAF88] hover:bg-[#8B9D83] text-white rounded-xl py-6 text-lg shadow-md"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
