import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>
          MindCare AI - First Multilingual Mental Health Platform for Students
          in India
        </title>
        <meta
          name="description"
          content="Confidential, accessible, offline-ready AI mental health support for students. Features multilingual chatbot, mood tracking, counsellor booking, and peer forums."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <ProblemSolution />
        <Features />
        <Impact />
        <Footer />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to content
        </a>
      </div>
    </>
  );
};

export default HomePage;
