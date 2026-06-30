"use client";

import { useState } from "react";
import { 
  Building, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Globe, 
  Truck, 
  Package,
  Calendar
} from "lucide-react";

interface MockCompany {
  id: string;
  name: string;
  status: "active" | "pending" | "suspended";
  services: ("trucking" | "clearing" | "express")[];
  registeredAt: string;
  contactPerson: string;
  email: string;
}

const INITIAL_COMPANIES: MockCompany[] = [
  {
    id: "comp-001",
    name: "Mmamashia Mining (Pty) Ltd",
    status: "active",
    services: ["trucking", "clearing"],
    registeredAt: "2026-01-15T08:00:00Z",
    contactPerson: "Kago Mosimanyana",
    email: "kago@mmamashiamining.co.bw"
  },
  {
    id: "comp-002",
    name: "Kalahari Traders",
    status: "active",
    services: ["clearing", "express"],
    registeredAt: "2026-03-22T10:30:00Z",
    contactPerson: "Neo Mokgweetsi",
    email: "neo@kalaharitraders.co.bw"
  },
  {
    id: "comp-003",
    name: "Gaborone Distributors",
    status: "pending",
    services: ["trucking"],
    registeredAt: "2026-06-29T14:00:00Z",
    contactPerson: "Thabo Lesedi",
    email: "t.lesedi@gabdistributors.co.bw"
  },
  {
    id: "comp-004",
    name: "Limpopo Freight Services",
    status: "suspended",
    services: ["trucking", "clearing", "express"],
    registeredAt: "2025-11-05T09:15:00Z",
    contactPerson: "Sarah Jenkins",
    email: "s.jenkins@limpopofreight.co.za"
  }
];

export default function CompaniesAdminDashboard() {
  const [companies, setCompanies] = useState<MockCompany[]>(INITIAL_COMPANIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    contactPerson: "",
    email: "",
    services: [] as ("trucking" | "clearing" | "express")[]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-yellow-950/40 text-yellow-400 border-yellow-500/20";
      case "suspended":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = companies.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === "active" ? "suspended" : "active";
        return { ...c, status: nextStatus as any };
      }
      return c;
    });
    setCompanies(updated);
  };

  const handleServiceToggle = (service: "trucking" | "clearing" | "express") => {
    const current = [...newCompany.services];
    if (current.includes(service)) {
      setNewCompany({
        ...newCompany,
        services: current.filter(s => s !== service)
      });
    } else {
      setNewCompany({
        ...newCompany,
        services: [...current, service]
      });
    }
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MockCompany = {
      id: `comp-${Date.now()}`,
      name: newCompany.name,
      contactPerson: newCompany.contactPerson,
      email: newCompany.email,
      status: "active",
      services: newCompany.services,
      registeredAt: new Date().toISOString()
    };
    setCompanies([created, ...companies]);
    setShowAddModal(false);
    setNewCompany({ name: "", contactPerson: "", email: "", services: [] });
  };

  const filteredCompanies = companies.filter(c => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
            <Building className="h-8 w-8 text-yellow-500 animate-pulse" />
            <span>Company Management Console</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Register new corporate clients, manage operational accounts, and toggle service subscriptions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl text-sm transition shadow-lg shadow-yellow-500/10 w-full sm:w-auto"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>Register Client Company</span>
        </button>
      </div>

      {/* Companies Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-white">Registered Client Directory</h3>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search companies, contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-400">
            <thead className="bg-gray-950 text-gray-500 uppercase tracking-widest text-[10px] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">Company Details</th>
                <th className="px-6 py-4">Contact Representative</th>
                <th className="px-6 py-4">Subscribed Services</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredCompanies.map((c, i) => (
                <tr key={i} className="hover:bg-gray-800/10 transition-colors text-white">
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <span className="block text-white font-bold text-sm">{c.name}</span>
                      <span className="block text-[10px] text-gray-500 font-medium">Joined: {new Date(c.registeredAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <span className="block text-gray-200">{c.contactPerson}</span>
                      <span className="block text-[10px] text-gray-500 font-medium">{c.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5">
                      {c.services.includes("trucking") && (
                        <span className="p-1 rounded bg-blue-500/10 text-blue-400" title="Trucking Subscribed">
                          <Truck className="h-4 w-4" />
                        </span>
                      )}
                      {c.services.includes("clearing") && (
                        <span className="p-1 rounded bg-purple-500/10 text-purple-400" title="Clearing Subscribed">
                          <Globe className="h-4 w-4" />
                        </span>
                      )}
                      {c.services.includes("express") && (
                        <span className="p-1 rounded bg-amber-500/10 text-amber-400" title="Express Subscribed">
                          <Package className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {c.status !== "pending" && (
                      <button
                        onClick={() => handleToggleStatus(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                          c.status === "active" 
                            ? "bg-red-600/10 text-red-400 border-red-500/10 hover:bg-red-600 hover:text-white" 
                            : "bg-emerald-600/10 text-emerald-400 border-emerald-500/10 hover:bg-emerald-600 hover:text-white"
                        }`}
                      >
                        {c.status === "active" ? "Suspend Account" : "Activate Account"}
                      </button>
                    )}
                    {c.status === "pending" && (
                      <button
                        onClick={() => {
                          const updated = companies.map(comp => comp.id === c.id ? { ...comp, status: "active" as const } : comp);
                          setCompanies(updated);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition"
                      >
                        Approve Client
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <Building className="h-5 w-5 text-yellow-500" />
                <span>Register Client Company</span>
              </h4>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="e.g. Gaborone Freight Corp"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={newCompany.contactPerson}
                    onChange={(e) => setNewCompany({ ...newCompany, contactPerson: e.target.value })}
                    placeholder="Representative Name"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    placeholder="rep@company.com"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px] mb-2">Subscribe Services</label>
                <div className="flex gap-4">
                  {[
                    { key: "trucking", label: "Trucking", icon: Truck },
                    { key: "clearing", label: "Customs & Clearing", icon: Globe },
                    { key: "express", label: "Express & Parcels", icon: Package }
                  ].map((s) => {
                    const isSelected = newCompany.services.includes(s.key as any);
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => handleServiceToggle(s.key as any)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl border text-xs font-bold transition ${
                          isSelected 
                            ? "bg-yellow-500 text-black border-yellow-500" 
                            : "bg-gray-950 text-gray-400 border-gray-800 hover:text-white"
                        }`}
                      >
                        <s.icon className="h-4 w-4" />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition shadow-lg shadow-yellow-500/10 text-sm"
              >
                Register corporate client
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
