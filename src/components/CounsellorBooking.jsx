import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { format, addDays } from "date-fns";

const COUNSELLORS = [
  {
    id: 1,
    name: "Dr. Sarah Khan",
    spec: "Anxiety & Depression",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    name: "Mr. Rajesh Verma",
    spec: "Academic Stress",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    name: "Ms. Anita Desai",
    spec: "Relationships",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

const CounsellorBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleBook = () => {
    if (!selectedCounsellor || !selectedTime) return;

    db.bookings.create({
      user_id: user.id,
      counsellor_id: selectedCounsellor.id,
      counsellor_name: selectedCounsellor.name,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      type: "Video Call",
    });

    toast({
      title: "Booking Confirmed! 🎉",
      description: `Appointment with ${selectedCounsellor.name} on ${format(selectedDate, "MMM dd")} at ${selectedTime}.`,
    });
    setSelectedCounsellor(null);
  };

  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"];

  return (
    <div className="space-y-8">
      {!selectedCounsellor ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Find a Counsellor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNSELLORS.map((c) => (
              <div
                key={c.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-lg text-gray-800">{c.name}</h3>
                <p className="text-purple-600 text-sm font-medium mb-2">
                  {c.spec}
                </p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-600 text-sm">
                    {c.rating} (50+ reviews)
                  </span>
                </div>
                <Button
                  onClick={() => setSelectedCounsellor(c)}
                  className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  Book Session
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <button
              onClick={() => setSelectedCounsellor(null)}
              className="text-sm text-gray-500 hover:underline"
            >
              Back
            </button>
            <h2 className="text-xl font-bold">
              Book with {selectedCounsellor.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((offset) => {
                  const date = addDays(new Date(), offset);
                  const isSelected =
                    format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd");
                  return (
                    <button
                      key={offset}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2 rounded-lg text-center text-sm border ${isSelected ? "bg-purple-600 text-white border-purple-600" : "hover:bg-gray-50"}`}
                    >
                      <div className="font-bold">{format(date, "dd")}</div>
                      <div className="text-xs opacity-80">
                        {format(date, "MMM")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm border ${selectedTime === time ? "bg-purple-600 text-white border-purple-600" : "hover:bg-gray-50"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleBook}
            disabled={!selectedTime}
            className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
          >
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default CounsellorBooking;
