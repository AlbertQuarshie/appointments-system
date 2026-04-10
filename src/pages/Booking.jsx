import { useState } from "react";
// 1. Rename this import to 'initialServices' to avoid naming conflicts
import { services as initialServices } from "../data/services"; 
import toast from "react-hot-toast";

const Booking = () => {
  // 2. Add this state to manage services from LocalStorage
  const [allServices] = useState(() => {
    const saved = localStorage.getItem("services");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    return initialServices; // Fallback to your file if storage is empty
  });

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const MAX_CAPACITY = 5;

  const getBookingCount = (date, time) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    return allBookings.filter((b) => b.date === date && b.time === time).length;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      toast.error("Please login to book an appointment");
      return;
    }

    const currentCount = getBookingCount(selectedDate, selectedTime);

    if (currentCount >= MAX_CAPACITY) {
      toast.error("This time slot is now full. Please choose another time.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      status: "Pending",
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    toast.success(`Success! Your appointment for ${selectedService.name} is set.`);
    setSelectedTime("");
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Book Your Appointment</h1>
      <p className="text-gray-500 mb-10">Select your preferred service and time at Monarch Barbers.</p>

      <form onSubmit={handleBooking} className="space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-gray-400">01. Select Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3. CHANGE 'services.map' to 'allServices.map' here */}
            {allServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-4 border-2 cursor-pointer transition rounded-lg ${
                  selectedService?.id === service.id ? "border-[#f7b801] bg-gray-50" : "border-gray-100"
                }`}
              >
                <div className="flex justify-between font-bold">
                  <span>{service.name}</span>
                  <span>KES {service.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{service.duration} mins</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Date & Time logic remains the same... */}
        {selectedService && (
          <section className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-gray-400">02. Pick Date</h2>
              <input
                type="date"
                className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-black"
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-gray-400">03. Pick Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 text-sm border-2 rounded-md transition ${
                      selectedTime === time ? "bg-black text-white border-[#f7b801]" : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {selectedService && selectedDate && selectedTime && (
          <div className="pt-8 border-t border-gray-100">
            <button
              type="submit"
              className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-md font-bold hover:bg-gray-800 transition shadow-xl"
            >
              Confirm Appointment
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Booking;