"use client";

import {
    Truck,
    Package,
    MapPinned,
    BarChart3,
    Leaf,
    Settings,
    Bell,
    Search,
    User,
    LayoutDashboard,
    ArrowUpRight,
    LogOut
} from "lucide-react";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthContext";

const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard },
    { title: "Fleet Management", icon: Truck },
    { title: "Cargo Operations", icon: Package },
    { title: "Live Tracking", icon: MapPinned },
    { title: "Reports & Analytics", icon: BarChart3 },
    { title: "Sustainability", icon: Leaf },
    { title: "Settings", icon: Settings },
];

const stats = [
    {
        title: "Fleet Units",
        value: "27",
        description: "Operational Vehicles",
        icon: Truck,
    },
    {
        title: "Cargo Capacity",
        value: "115 MT",
        description: "Current Capacity",
        icon: Package,
    },
    {
        title: "Tracking",
        value: "Active",
        description: "Real-Time Monitoring",
        icon: MapPinned,
    },
    {
        title: "Cross Border",
        value: "Online",
        description: "Regional Operations",
        icon: ArrowUpRight,
    },
];

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#1A102E] text-white flex">

                {/* ================= Sidebar ================= */}

                <aside className="w-72 border-r border-[#D4AF37]/20 bg-[#1A102E] flex flex-col justify-between">

                <div className="px-8 py-8 border-b border-[#D4AF37]/20">

                    <h1 className="text-3xl font-bold text-[#D4AF37]">
                        DFS GROUP
                    </h1>

                    <p className="text-sm text-white/60 mt-2">
                        Operations Control Centre
                    </p>

                </div>

                <div className="p-6">

                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
                        Navigation
                    </p>

                    <div className="space-y-2">

                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.title}
                                    className="w-full flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-white/5 hover:text-[#D4AF37] transition"
                                >
                                    <Icon size={20} />

                                    <span>{item.title}</span>
                                </button>
                            );
                        })}

                    </div>

                </div>

                <div className="mt-auto p-6">

                    <div className="rounded-xl border border-[#D4AF37]/20 bg-white/5 p-5">

                        <h3 className="font-semibold text-[#D4AF37]">
                            DFS Group
                        </h3>

                        <p className="text-sm text-white/60 mt-2">
                            Sustainable transport and logistics solutions throughout Botswana
                            and regional markets.
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-3 mt-4 rounded-xl px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition font-semibold"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>

                </div>

            </aside>

            {/* ================= Main ================= */}

            <main className="flex-1 p-8">

                {/* Header */}

                <header className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-4xl font-bold text-[#D4AF37]">
                            DFS Operations Control Centre
                        </h1>

                        <p className="text-white/60 mt-2">
                            Monitor fleet performance, cargo movement and logistics
                            operations in real time.
                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                            <Search size={20} />
                        </button>

                        <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                            <Bell size={20} />
                        </button>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">

                                <User />

                            </div>

                            <div>

                                <p className="font-semibold">
                                    {user?.name || "Client Partner"}
                                </p>

                                <p className="text-xs text-white/50">
                                    {user?.companyName || "DFS Group"}
                                </p>

                            </div>

                        </div>

                    </div>

                </header>

                {/* Statistics */}

                <section className="grid grid-cols-4 gap-6 mb-8">

                    {stats.map((stat) => {

                        const Icon = stat.icon;

                        return (

                            <div
                                key={stat.title}
                                className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6"
                            >

                                <div className="flex justify-between items-center mb-4">

                                    <Icon className="text-[#D4AF37]" />

                                    <span className="text-xs text-white/40">
                                        Live
                                    </span>

                                </div>

                                <h3 className="text-white/60 text-sm">
                                    {stat.title}
                                </h3>

                                <h2 className="text-3xl font-bold mt-2">
                                    {stat.value}
                                </h2>

                                <p className="text-sm text-white/40 mt-2">
                                    {stat.description}
                                </p>

                            </div>

                        );

                    })}

                </section>

                {/* ================= Main Grid ================= */}

                <section className="grid grid-cols-3 gap-6 mb-8">

                    {/* Cargo Operations */}

                    <div className="col-span-2 rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
                            Cargo Operations
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div className="rounded-xl bg-black/20 p-5 border border-white/10">

                                <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
                                    Bulk Cargo
                                </h3>

                                <ul className="space-y-3 text-white/70 text-sm">

                                    <li>• Local & Cross-Border Transport</li>

                                    <li>• 22.5m³ & 45m³ Side Tippers</li>

                                    <li>• Large Capacity Fleet</li>

                                    <li>• Real-Time Vehicle Tracking</li>

                                    <li>• Reduced Emissions Fleet</li>

                                </ul>

                            </div>

                            <div className="rounded-xl bg-black/20 p-5 border border-white/10">

                                <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
                                    Bagged Cargo
                                </h3>

                                <ul className="space-y-3 text-white/70 text-sm">

                                    <li>• Long Distance Transport</li>

                                    <li>• Flat Deck Link Units</li>

                                    <li>• Up to 36MT Loading</li>

                                    <li>• Cost Effective Logistics</li>

                                    <li>• Live Shipment Tracking</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                    {/* Fleet Breakdown */}

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-xl font-bold text-[#D4AF37] mb-6">
                            Fleet Breakdown
                        </h2>

                        <div className="space-y-5">

                            <div className="border-b border-white/10 pb-4">

                                <p className="font-semibold">
                                    Volvo FH 440
                                </p>

                                <p className="text-sm text-white/60">
                                    45m³ Side Tipper
                                </p>

                                <span className="text-[#D4AF37] font-bold">
                                    6 Units
                                </span>

                            </div>

                            <div className="border-b border-white/10 pb-4">

                                <p className="font-semibold">
                                    Scania R460
                                </p>

                                <p className="text-sm text-white/60">
                                    45m³ Side Tipper
                                </p>

                                <span className="text-[#D4AF37] font-bold">
                                    4 Units
                                </span>

                            </div>

                            <div className="border-b border-white/10 pb-4">

                                <p className="font-semibold">
                                    Volvo Fox 440
                                </p>

                                <p className="text-sm text-white/60">
                                    22.5m³ Side Tipper
                                </p>

                                <span className="text-[#D4AF37] font-bold">
                                    5 Units
                                </span>

                            </div>

                            <div>

                                <p className="font-semibold">
                                    Scania G460
                                </p>

                                <p className="text-sm text-white/60">
                                    Flat Deck Link Combination
                                </p>

                                <span className="text-[#D4AF37] font-bold">
                                    12 Units
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= Bottom Grid ================= */}

                <section className="grid grid-cols-3 gap-6 mb-8">

                    {/* Mission */}

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
                            Mission
                        </h2>

                        <p className="text-white/70 leading-7">

                            Revolutionising transportation by delivering
                            sustainable, technologically advanced logistics
                            solutions while enhancing mobility and reducing
                            environmental impact.

                        </p>

                    </div>

                    {/* Vision */}

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
                            Vision
                        </h2>

                        <p className="text-white/70 leading-7">

                            To become the world's foremost provider of
                            sustainable and innovative transport solutions,
                            setting new standards for efficiency,
                            reliability and customer satisfaction.

                        </p>

                    </div>

                    {/* Core Values */}

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
                            Core Values
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold">
                                Sustainability
                            </span>

                            <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold">
                                Innovation
                            </span>

                            <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold">
                                Customer First
                            </span>

                            <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold">
                                Integrity
                            </span>

                            <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold">
                                Collaboration
                            </span>

                        </div>

                    </div>

                </section>

                {/* ================= Quick Actions ================= */}

                <section className="grid grid-cols-4 gap-5 mb-8">

                    {[
                        "Register Vehicle",
                        "Create Shipment",
                        "Track Cargo",
                        "Generate Report",
                    ].map((action) => (

                        <button
                            key={action}
                            className="rounded-xl bg-[#D4AF37] text-black py-4 font-semibold hover:scale-105 transition"
                        >
                            {action}
                        </button>

                    ))}

                </section>

                {/* ================= Activity Feed ================= */}

                <section className="grid grid-cols-3 gap-6">

                    {/* Operations Feed */}

                    <div className="col-span-2 rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
                            Recent Operations
                        </h2>

                        <div className="space-y-5">

                            {[
                                {
                                    title: "Cross-border shipment dispatched",
                                    route: "Gaborone → Johannesburg",
                                    status: "Completed",
                                },
                                {
                                    title: "Vehicle maintenance completed",
                                    route: "Volvo FH 440",
                                    status: "Ready",
                                },
                                {
                                    title: "Bagged cargo loaded",
                                    route: "Francistown Distribution Hub",
                                    status: "In Progress",
                                },
                                {
                                    title: "Fleet inspection scheduled",
                                    route: "Scania G460 Fleet",
                                    status: "Pending",
                                },
                            ].map((activity, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b border-white/10 pb-4"
                                >

                                    <div>

                                        <h3 className="font-semibold">
                                            {activity.title}
                                        </h3>

                                        <p className="text-sm text-white/50">
                                            {activity.route}
                                        </p>

                                    </div>

                                    <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-black text-sm font-semibold">
                                        {activity.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Fleet Status */}

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6">

                        <h2 className="text-xl font-bold text-[#D4AF37] mb-6">
                            Fleet Status
                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">
                                <span>Operational</span>
                                <span className="text-green-400 font-semibold">
                                    24
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Maintenance</span>
                                <span className="text-yellow-400 font-semibold">
                                    2
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Unavailable</span>
                                <span className="text-red-400 font-semibold">
                                    1
                                </span>
                            </div>

                            <hr className="border-white/10" />

                            <div>

                                <p className="text-sm text-white/50 mb-2">
                                    Fleet Availability
                                </p>

                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

                                    <div className="w-[89%] h-full bg-[#D4AF37]" />

                                </div>

                                <p className="text-sm mt-3 text-[#D4AF37] font-semibold">
                                    89% Available
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* Footer */}

                <footer className="mt-12 border-t border-[#D4AF37]/20 pt-6 flex justify-between items-center text-sm text-white/40">

                    <p>
                        © 2026 DFS Group. Operations Control Centre.
                    </p>

                    <p>
                        Sustainable • Innovative • Reliable
                    </p>

                </footer>

            </main>

        </div>
        </ProtectedRoute>
    );
}