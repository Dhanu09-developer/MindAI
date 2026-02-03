import React from "react";
import { ShieldCheck, FileText, Lock, EyeOff } from "lucide-react";

const SecurityCompliance = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
          Security & Compliance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex gap-4 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl backdrop-blur-sm border border-green-500/30 shadow-[0_8px_32px_rgba(34,197,94,0.1)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.2)] transition-all duration-300">
            <ShieldCheck className="w-12 h-12 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">
                NDHM Compliant
              </h3>
              <p className="text-green-200">
                Designed according to National Digital Health Mission standards.
                Ensuring interoperability and secure health data exchange
                protocols.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl backdrop-blur-sm border border-blue-500/30 shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-all duration-300">
            <Lock className="w-12 h-12 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">
                End-to-End Encryption
              </h3>
              <p className="text-blue-200">
                All personal data, chat logs, and journal entries are encrypted
                on your device before being synced. Only you hold the keys to
                your private thoughts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl backdrop-blur-sm border border-purple-500/30 shadow-[0_8px_32px_rgba(168,85,247,0.1)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all duration-300">
            <EyeOff className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Total Anonymity
              </h3>
              <p className="text-purple-200">
                We use randomized identifiers. Counsellors see your data without
                PII (Personally Identifiable Information) unless you explicitly
                share it.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl backdrop-blur-sm border border-orange-500/30 shadow-[0_8px_32px_rgba(249,115,22,0.1)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-300">
            <FileText className="w-12 h-12 text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Data Retention Policy
              </h3>
              <p className="text-orange-200">
                You own your data. Export or delete your entire account history
                at any time with a single click. Inactive accounts are
                automatically purged after 2 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
