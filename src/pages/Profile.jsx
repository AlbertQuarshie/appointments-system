import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();


  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [userBookings] = useState(() => {
    if (!user) return [];
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const filtered = allBookings.filter(b => b.userEmail === user.email);
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  useEffect(() => {
  
    if (!user) {
      toast.error("Please login to view your profile");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-black py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="border-b border-gray-100 pb-8 mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">My Profile</h1>
            <p className="text-gray-500 mt-2">Welcome back, {user.name}</p>
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Member Since</span>
            <span className="text-sm font-medium">April 2026</span>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Full Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Email Address</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Account Type</p>
            <p className="font-semibold capitalize">{user.role || "Client"}</p>
          </div>
        </div>


        <h2 className="text-2xl font-bold mb-6 tracking-tight">Your Appointments</h2>
        
        {userBookings.length > 0 ? (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-bold text-lg">{booking.service}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>{booking.date}</span>
                    <span>•</span>
                    <span>{booking.time}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    booking.status === 'Completed' 
                    ? 'bg-black text-white' 
                    : 'bg-green-50 text-green-700'
                  }`}>
                    {booking.status || "Confirmed"}
                  </span>
                  <button className="text-sm font-bold text-gray-400 hover:text-black transition">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 mb-4">You haven't booked any sessions yet.</p>
            <button 
              onClick={() => navigate("/booking")}
              className="bg-black text-white px-6 py-2 rounded-md font-bold text-sm"
            >
              Book Your First Cut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;