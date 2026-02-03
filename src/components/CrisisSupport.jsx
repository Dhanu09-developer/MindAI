import React from "react";
import { Phone, AlertTriangle, ShieldAlert } from "lucide-react";

const HELPLINES = [
  {
    name: "NIMHANS",
    number: "080-26995000",
    desc: "Mental Health & Neuroscience Support",
  },
  {
    name: "MANODARPAN",
    number: "8448440632",
    desc: "Ministry of Education Initiative",
  },
  { name: "iCall", number: "9152987821", desc: "Psychological Support (TISS)" },
  { name: "AASRA", number: "9820466726", desc: "24/7 Suicide Prevention" },
  {
    name: "Vandrevala Foundation",
    number: "9999 666 555",
    desc: "Crisis Mediation",
  },
];

const CrisisSupport = () => {
  return (
    <div className="space-y-8">
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex items-start gap-4">
        <div className="bg-red-100 p-3 rounded-full">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Immediate Crisis Support
          </h2>
          <p className="text-red-800">
            If you or someone you know is in immediate danger or feeling
            suicidal, please do not hesitate. Help is available, and you are not
            alone.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HELPLINES.map((helpline, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {helpline.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">{helpline.desc}</p>
              <p className="font-mono text-lg font-bold text-gray-800">
                {helpline.number}
              </p>
            </div>
            <a
              href={`tel:${helpline.number.replace(/\s/g, "")}`}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrisisSupport;
