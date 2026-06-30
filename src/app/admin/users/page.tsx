"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  Mail, 
  Building, 
  Shield, 
  Clock,
  Search,
  Filter,
  CheckCircle,
  XCircle
} from "lucide-react";
import { AdminService, type MockAccessRequest } from "@/services/admin";
import { ROLE_LABELS } from "@/lib/auth/roles";

export default function UsersAdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [requests, setRequests] = useState<MockAccessRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsersData() {
      try {
        const [usersRes, reqRes] = await Promise.all([
          AdminService.getAllUsers(),
          AdminService.getAccessRequests()
        ]);
        if (usersRes.data) setUsers(usersRes.data);
        if (reqRes.data) setRequests(reqRes.data);
      } catch (err) {
        console.error("Failed to load user management data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsersData();
  }, []);

  const handleActionRequest = async (id: string, status: "approved" | "rejected") => {
    try {
      await AdminService.updateAccessRequestStatus(id, status);
      // Re-load requests
      const reqRes = await AdminService.getAccessRequests();
      if (reqRes.data) {
        setRequests(reqRes.data);
      }
      
      // If approved, refresh users list to reflect new user if any
      const usersRes = await AdminService.getAllUsers();
      if (usersRes.data) setUsers(usersRes.data);
    } catch (err) {
      console.error("Failed to update access request:", err);
    }
  };

  const toggleUserStatus = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === "active" ? "suspended" : "active";
        return { ...u, status: newStatus };
      }
      return u;
    });
    setUsers(updated);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "dfs_admin":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      case "dfs_ops":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20";
      case "customer_admin":
        return "bg-yellow-950/40 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const filteredUsers = users.filter(u => {
    return (
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
          <Users className="h-8 w-8 text-yellow-500 animate-pulse" />
          <span>User Identity & Access Controls</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Approve customer portal requests, manage staff roles and permission flags, and audit registered accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (8 columns): Registered Users List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg text-white">Registered Users identity Console</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search user, company..."
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
                    <th className="px-6 py-4">Name / Contact</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Role Designation</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading user records...</td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((u, i) => (
                      <tr key={i} className="hover:bg-gray-800/10 transition-colors text-white">
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="block text-white font-bold">{u.full_name}</span>
                            <span className="block text-[10px] text-gray-500 font-medium">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{u.company_name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${getRoleBadgeColor(u.role)}`}>
                            {ROLE_LABELS[u.role as keyof typeof ROLE_LABELS] || u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${
                            u.status === "active" 
                              ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20" 
                              : "bg-red-950/40 text-red-400 border-red-500/20"
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                              u.status === "active" 
                                ? "bg-red-600/10 text-red-400 border-red-500/10 hover:bg-red-600 hover:text-white" 
                                : "bg-emerald-600/10 text-emerald-400 border-emerald-500/10 hover:bg-emerald-600 hover:text-white"
                            }`}
                          >
                            {u.status === "active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No users match your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side (4 columns): Access Requests queue */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>Access Request Pipeline</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold">
                {requests.filter(r => r.status === "pending").length} New
              </span>
            </div>

            <div className="p-6 space-y-4">
              {requests.map((req, idx) => (
                <div key={idx} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="block font-bold text-white text-xs">{req.fullName}</span>
                      <span className="block text-[10px] text-yellow-500 font-semibold">{req.companyName}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${
                      req.status === "pending" 
                        ? "bg-yellow-950/40 text-yellow-400 border-yellow-500/20" 
                        : req.status === "approved" 
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                          : "bg-red-950/40 text-red-400 border-red-500/20"
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="text-[10px] text-gray-400 font-medium space-y-0.5">
                    <span className="block">Position: {req.position}</span>
                    <span className="block">Contact: {req.phone}</span>
                    <span className="block font-mono text-[9px] text-gray-500 mt-1">{req.email}</span>
                  </div>

                  {req.status === "pending" && (
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => handleActionRequest(req.id, "approved")}
                        className="flex-1 flex items-center justify-center space-x-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleActionRequest(req.id, "rejected")}
                        className="flex-1 flex items-center justify-center space-x-1 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-bold text-[10px] border border-red-500/15 transition"
                      >
                        <UserX className="h-3.5 w-3.5" />
                        <span>Deny</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
