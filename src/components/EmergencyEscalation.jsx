import React from "react";
import { ShieldAlert, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HELPLINES = [
  { name: "NIMHANS", number: "080-26995000" },
  { name: "MANODARPAN", number: "8448440632" },
  { name: "iCall", number: "9152987821" },
  { name: "AASRA", number: "9999 666 555" },
];

const EmergencyEscalation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 gap-2"
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="hidden md:inline">Emergency Protocol</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-t-8 border-red-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 text-xl">
            <ShieldAlert className="w-6 h-6" />
            Crisis Intervention Protocol
          </DialogTitle>
          <DialogDescription>
            Use this for students showing signs of immediate risk or severe
            distress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800 text-sm">
            <strong>Immediate Action:</strong> If the student is in immediate
            danger, contact local emergency services immediately.
          </div>

          <div className="grid grid-cols-1 gap-3">
            {HELPLINES.map((line) => (
              <div
                key={line.name}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <span className="font-bold text-gray-700">{line.name}</span>
                <a
                  href={`tel:${line.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-red-200 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  {line.number}
                </a>
              </div>
            ))}
          </div>

          <Button className="w-full mt-2" variant="outline">
            Download Crisis Contact Card (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyEscalation;
