import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  RefreshCcw,
  Globe,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi (हिंदी)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "mr", name: "Marathi (मराठी)" },
];

const STRESS_KEYWORDS = {
  anxiety: ["anxious", "scared", "worried", "panic", "nervous"],
  depression: ["sad", "hopeless", "tired", "lonely", "cry"],
  academic: ["exam", "study", "fail", "grades", "homework"],
  sleep: ["sleep", "insomnia", "awake", "nightmare", "tired"],
  relationship: ["breakup", "fight", "parents", "friend", "alone"],
};

const RESPONSES = {
  en: {
    default: "I'm here for you. Tell me more about how you're feeling.",
    greeting:
      "Namaste! I'm your MindCare companion. How are you feeling today?",
    anxiety:
      "I hear that you're feeling anxious. Remember to take deep breaths. Would you like to try a grounding exercise?",
    depression:
      "It takes courage to share that. You're not alone. Have you been able to eat or sleep properly lately?",
    academic:
      "Academic pressure can be overwhelming. Remember, your worth is not defined by your grades. Shall we break down tasks?",
    sleep:
      "Sleep is so important for your mind. Have you tried our relaxation audio guides in the Wellness Hub?",
    relationship:
      "Relationships can be complicated. Ideally, talking to a counsellor might give you a safe space to vent.",
  },
  // Simplified logic for other languages for demo purposes - in production this would be robust
  hi: {
    default: "मैं यहाँ हूँ। मुझे बताएं कि आप कैसा महसूस कर रहे हैं।",
    greeting: "नमस्ते! मैं आपका मित्र हूँ। आज आप कैसा महसूस कर रहे हैं?",
  },
};

const ChatBot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (user) {
      const history = db.chats.getByUserId(user.id);
      if (history.length > 0) {
        setMessages(history);
      } else {
        // Initial greeting
        const greeting = {
          id: "init",
          text: RESPONSES[language]?.greeting || RESPONSES["en"].greeting,
          sender: "bot",
          timestamp: new Date().toISOString(),
        };
        setMessages([greeting]);
      }
    }
  }, [user, language]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();
    for (const [category, keywords] of Object.entries(STRESS_KEYWORDS)) {
      if (keywords.some((k) => lowerText.includes(k))) return category;
    }
    return "default";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
      user_id: user.id,
    };

    setMessages((prev) => [...prev, userMsg]);
    db.chats.create(userMsg);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const intent = detectIntent(userMsg.text);
      const langResponses = RESPONSES[language] || RESPONSES["en"];
      const responseText = langResponses[intent] || langResponses["default"];

      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date().toISOString(),
        user_id: user.id,
      };

      setMessages((prev) => [...prev, botMsg]);
      db.chats.create(botMsg);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">MindCare Assistant</h3>
            <p className="text-xs opacity-80">Always here to listen</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/10 border-none text-sm rounded focus:ring-0 cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="text-gray-800"
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span
                className={`text-[10px] block mt-1 ${msg.sender === "user" ? "text-purple-200" : "text-gray-400"}`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 rounded-tl-none">
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all outline-none text-gray-700"
          />
          <Button
            onClick={handleSend}
            className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 p-0 flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
