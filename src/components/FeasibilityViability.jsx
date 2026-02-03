import React from "react";
import { TrendingUp, Users, DollarSign, Globe } from "lucide-react";

const FeasibilityViability = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-900/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
          Feasibility & Scalability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-all duration-300">
            <Globe className="w-10 h-10 mx-auto text-blue-400 mb-4" />
            <h3 className="font-bold text-white mb-2">Unified Reach</h3>
            <p className="text-sm text-blue-200">
              Web & PWA capabilities ensure access on low-end devices without
              app store friction.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 shadow-[0_8px_32px_rgba(34,197,94,0.1)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.2)] transition-all duration-300">
            <DollarSign className="w-10 h-10 mx-auto text-green-400 mb-4" />
            <h3 className="font-bold text-white mb-2">Zero Licensing</h3>
            <p className="text-sm text-green-200">
              Built on open-source stack (React, Node, Postgres), eliminating
              costly enterprise licenses.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 shadow-[0_8px_32px_rgba(168,85,247,0.1)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all duration-300">
            <Users className="w-10 h-10 mx-auto text-purple-400 mb-4" />
            <h3 className="font-bold text-white mb-2">High Adoption</h3>
            <p className="text-sm text-purple-200">
              Anonymity and regional languages drive 3x higher engagement than
              traditional portals.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-500/30 shadow-[0_8px_32px_rgba(249,115,22,0.1)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-300">
            <TrendingUp className="w-10 h-10 mx-auto text-orange-400 mb-4" />
            <h3 className="font-bold text-white mb-2">Scalable</h3>
            <p className="text-sm text-orange-200">
              Serverless architecture scales automatically to handle 10k+
              concurrent student users.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-6 text-white">
            Estimated Cost Breakdown (First Year)
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2">
              <span className="text-purple-200">
                Development & Infrastructure Setup
              </span>
              <span className="font-mono font-bold text-purple-300">
                ₹ 5,00,000
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2">
              <span className="text-purple-200">
                Cloud Hosting & Database (Scalable)
              </span>
              <span className="font-mono font-bold text-purple-300">
                ₹ 1,20,000
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2">
              <span className="text-purple-200">
                Maintenance & Security Audits
              </span>
              <span className="font-mono font-bold text-purple-300">
                ₹ 80,000
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 text-lg font-bold text-purple-400">
              <span>Total Estimated Investment</span>
              <span>₹ 7,00,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeasibilityViability;
