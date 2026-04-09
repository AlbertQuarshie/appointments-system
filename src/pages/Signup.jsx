import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
  if (existingUsers.some(u => u.email === formData.email)) {
      toast.error("This email is already registered."); // Error toast
      return;
    }

    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
   toast.success(`Welcome to the fold, ${formData.name}!`);
   setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border border-gray-100 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold tracking-tighter uppercase text-center mb-10">Join Monarch</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg mt-4">
            Create Account
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Already a member? <Link to="/login" className="text-black font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;