import { useState } from "react";
import toast from "react-hot-toast";
import { services as initialServices } from "../data/services";

const AdminDashboard = () => {
  // --- STATE ---
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem("services");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    localStorage.setItem("services", JSON.stringify(initialServices));
    return initialServices;
  });

  const [users] = useState(() => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  });

  const [bookings] = useState(() => {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    image: "",
  });
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    image: "",
  });

  // --- ACTIONS ---
  const saveServices = (updatedList) => {
    setServices(updatedList);
    localStorage.setItem("services", JSON.stringify(updatedList));
  };

  const addService = (e) => {
    e.preventDefault();
    if (
      !newService.name ||
      !newService.price ||
      !newService.duration ||
      !newService.image
    ) {
      toast.error("Required fields missing");
      return;
    }
    const updated = [...services, { ...newService, id: Date.now() }];
    saveServices(updated);
    setNewService({
      name: "",
      price: "",
      description: "",
      duration: "",
      image: "",
    });
    toast.success("Service added");
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditForm({ ...s });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updated = services.map((s) =>
      s.id === editingId ? { ...editForm } : s,
    );
    saveServices(updated);
    setEditingId(null);
    toast.success("Update successful");
  };

  const deleteService = (id) => {
    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
    toast.error("Service removed");
  };

  return (
    <div className="min-h-screen bg-white text-black py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* HEADER */}
        <header className="border-b border-gray-100 pb-8">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
            Admin Console
          </h1>
          <p className="text-gray-400 mt-2 font-medium italic">
            Monarch Barbershop Management
          </p>
        </header>

        {/* 1. RECENT APPOINTMENTS (Read-Only) */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Recent Appointments
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              {bookings.length} Total
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.length > 0 ? (
              bookings
                .slice()
                .reverse()
                .map((b) => (
                  <div
                    key={b.id}
                    className="relative p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:border-gray-200"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter bg-amber-50 text-amber-600 border border-amber-100">
                        Pending
                      </span>
                    </div>
                    <div className="mb-6">
                      <p className="text-[10px] font-bold text-[#f7b801] uppercase tracking-[0.15em] mb-1">
                        {b.date} @ {b.time}
                      </p>
                      <h3 className="font-black text-xl uppercase leading-none truncate">
                        {b.service}
                      </h3>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-sm font-bold text-black">
                        {b.userName}
                      </p>
                      <p className="text-[10px] text-gray-400 italic truncate font-serif">
                        {b.userEmail}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 text-center text-gray-400 italic">
                No active bookings found.
              </div>
            )}
          </div>
        </section>

        {/* 2. SERVICES INVENTORY (With Labeled Form) */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">
            Services Inventory
          </h2>

          {!editingId && (
            <form
              onSubmit={addService}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Service Name
                  </label>
                  <input
                    className="p-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-black transition shadow-sm"
                    placeholder="e.g. Classic Haircut"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Price (KES)
                  </label>
                  <input
                    className="p-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-black transition shadow-sm"
                    placeholder="2500"
                    type="number"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Duration
                  </label>
                  <input
                    className="p-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-black transition shadow-sm"
                    placeholder="45 mins"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({ ...newService, duration: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Image URL
                  </label>
                  <input
                    className="p-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-black transition shadow-sm"
                    placeholder="https://..."
                    value={newService.image}
                    onChange={(e) =>
                      setNewService({ ...newService, image: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Description
                  </label>
                  <textarea
                    className="p-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-black transition shadow-sm h-24 resize-none"
                    placeholder="Brief details about the service..."
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="md:col-span-2 bg-black text-white py-5 rounded-xl font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-gray-900 transition mt-2 shadow-lg">
                  Create New Service
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="group p-6 border border-gray-100 rounded-2xl transition-all hover:border-black"
              >
                {editingId === s.id ? (
                  <form
                    onSubmit={saveEdit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <input
                      className="p-3 border rounded-lg"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                    <input
                      className="p-3 border rounded-lg"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                    />
                    <textarea
                      className="p-3 border rounded-lg md:col-span-2"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-black text-white px-8 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-400 font-bold text-[10px] uppercase underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-6">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-20 h-20 rounded-xl object-cover transition-all"
                      />
                      <div>
                        <h4 className="font-black text-xl uppercase">
                          {s.name}
                        </h4>
                        <p className="text-gray-500 text-sm font-medium">
                          {s.duration} Mins — KES {s.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(s)}
                        className="text-[10px] font-bold uppercase tracking-widest hover:text-[#f7b801]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. REGISTERED CLIENTS */}
        <section className="pb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Registered Clients
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              {users.length} Members
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="p-6">Client Name</th>
                  <th className="p-6">Email Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr
                      key={u.email}
                      className="hover:bg-gray-50/50 transition"
                    >
                      <td className="p-6 font-bold text-sm uppercase tracking-tight">
                        {u.name}
                      </td>
                      <td className="p-6 text-sm text-gray-400 italic font-serif">
                        {u.email}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="p-10 text-center text-gray-400 italic"
                    >
                      No registered members yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
