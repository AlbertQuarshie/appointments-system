import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
 const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

 useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedInUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="border-b-2 border-b-yellow-500 bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight">
        Monarch Barbers
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium">
        <Link to="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link to="/services" className="hover:text-gray-300 transition">
          Services
        </Link>
        <Link
          to="/booking"
          className="hover:text-gray-300 transition border border-white px-3 py-1 rounded"
        >
          Book Now
        </Link>

        {/* Auth-based Links */}
        {user ? (
          <>
            <Link to="/profile" className="hover:text-gray-300 transition">
              My Profile
            </Link>
            
            {/* Show Admin link only if role is admin */}
            {user.role === "admin" && (
              <Link to="/admin" className="text-yellow-500 hover:text-yellow-400 font-bold transition">
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 font-bold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300 font-bold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;