import { useState } from "react";
import toast from "react-hot-toast";
import { services as initialServices } from "../data/services";

const AdminDashboard = () => {
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem("services");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    localStorage.setItem("services", JSON.stringify(initialServices));
    return initialServices;
  });

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  });

  // 1. Added 'image' to the state
  const [newService, setNewService] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    duration: "",
    image: "" 
  });

  const addService = (e) => {
    e.preventDefault();

    if (!newService.name || !newService.price || !newService.description || !newService.duration || !newService.image) {
      toast.error("All fields, including image URL, are required");
      return;
    }

    const updated = [...services, { ...newService, id: Date.now() }];
    setServices(updated);
    localStorage.setItem("services", JSON.stringify(updated));
    
    setNewService({ name: "", price: "", description: "", duration: "", image: "" });
    toast.success(`${newService.name} added with image!`);
  };

  const deleteService = (id) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem("services", JSON.stringify(updated));
    toast.error("Service removed");
  };

  const deleteUser = (email) => {
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    toast.error("Account deactivated");
  };

  return (
    <div className="min-h-screen bg-white text-black py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Admin Console</h1>
          <p className="text-gray-500 mt-2 italic">Monarch Barbershop Management</p>
        </div>


        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Services Inventory</h2>
            <p className="text-xs font-bold text-gray-400 uppercase">{services.length} Active Services</p>
          </div>

          <form onSubmit={addService} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="p-4 bg-white border border-gray-200 rounded-lg focus:border-black outline-none transition"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
              <input
                className="p-4 bg-white border border-gray-200 rounded-lg focus:border-black outline-none transition"
                placeholder="Price (KES)"
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
              <input
                className="p-4 bg-white border border-gray-200 rounded-lg focus:border-black outline-none transition"
                placeholder="Duration (e.g., 30 mins)"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
              />
    
              <input
                className="p-4 bg-white border border-gray-200 rounded-lg focus:border-black outline-none transition"
                placeholder="Image URL"
                value={newService.image}
                onChange={(e) => setNewService({ ...newService, image: e.target.value })}
              />
              <input
                className="p-4 md:col-span-2 bg-white border border-gray-200 rounded-lg focus:border-black outline-none transition"
                placeholder="Brief Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </div>
            <button className="w-full mt-4 bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition uppercase text-xs tracking-widest">
              Add Service
            </button>
          </form>

          <div className="grid grid-cols-1 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-gray-100 rounded-2xl hover:border-black transition-all"
              >
                <div className="flex items-start md:items-center gap-6">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-lg uppercase">{s.name}</p>
                      <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase text-gray-500">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm max-w-md line-clamp-2">{s.description}</p>
                    <p className="text-black font-bold">KES {s.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteService(s.id)}
                  className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 text-red-500 text-xs font-bold uppercase tracking-widest transition-opacity hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>


        <section>
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Client List</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="p-6">Member Name</th>
                  <th className="p-6">Email Address</th>
                  <th className="p-6 text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.email} className="hover:bg-gray-50/50 transition">
                    <td className="p-6 font-bold text-sm">{u.name}</td>
                    <td className="p-6 text-sm text-gray-500 italic">{u.email}</td>
                    <td className="p-6 text-right">
                      {u.email !== "admin@monarch.com" && (
                        <button
                          onClick={() => deleteUser(u.email)}
                          className="text-red-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-widest transition"
                        >
                          Revoke Access
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;