"use client";

import { useState } from "react";
import { Package, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ExpressBookPage() {
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    destination: "",
    weight: "",
    serviceType: "Next Day Express"
  });

  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `DFS-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    // Reset form
    setFormData({
      sender: "",
      receiver: "",
      destination: "",
      weight: "",
      serviceType: "Next Day Express"
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary-royal" />
          <span>Book Express Consignment Collection</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Request local next-day or standard delivery collections across major Botswana hubs.
        </p>
      </div>

      <div className="max-w-2xl bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
        {bookingRef ? (
          <div className="text-center py-10 space-y-4">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Collection Successfully Scheduled!</h3>
              <p className="text-xs text-gray-500 font-medium">
                Our courier will collect the package from your specified origin.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-sm mx-auto font-mono text-sm">
              <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Consignment Number</span>
              <strong className="text-primary-royal text-base font-black mt-1 block">{bookingRef}</strong>
            </div>
            <button 
              onClick={() => setBookingRef(null)}
              className="px-6 py-2.5 bg-primary-royal hover:bg-primary-deep text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              Book Another Collection
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Sender Company / Name</label>
                <input
                  type="text"
                  required
                  value={formData.sender}
                  onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                  placeholder="e.g. Lobatse Clay Works"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Receiver Name</label>
                <input
                  type="text"
                  required
                  value={formData.receiver}
                  onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                  placeholder="e.g. Apex Builders Gaborone"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Destination Address</label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. Gaborone, Botswana"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Weight (kg)</label>
                <input
                  type="text"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g. 4.5 kg"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Service Tier</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep focus:outline-none focus:border-primary-royal transition-colors"
              >
                <option value="Next Day Express">Next Day Express</option>
                <option value="Standard Delivery">Standard Delivery</option>
                <option value="Priority Document">Priority Document</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl transition shadow-lg text-sm flex items-center justify-center space-x-2"
            >
              <span>Schedule Courier Pickup</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
