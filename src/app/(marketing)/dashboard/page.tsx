export default function DashboardPage() {
    return (
        <div className="min-h-screen flex bg-[#1A102E] text-white">

            {/* Sidebar */}
            <aside className="w-64 p-5 border-r border-white/10">
                <h2 className="text-xl font-bold text-[#D4AF37] mb-8">
                    DFS Group
                </h2>

                <nav className="space-y-4 text-white/80 text-sm">
                    <div className="hover:text-[#D4AF37] cursor-pointer">Overview</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Fleet Overview</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Cargo Operations</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Tracking System</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Routes & Cross-Border</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Sustainability</div>
                    <div className="hover:text-[#D4AF37] cursor-pointer">Reports</div>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6">

                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-[#D4AF37]">
                        DFS Operations Control Centre
                    </h1>
                    <p className="text-white/60 text-sm">
                        Managing logistics, fleet, and cargo operations across Botswana & regional routes
                    </p>
                </header>

                {/* Stats */}
                <section className="grid grid-cols-4 gap-4 mb-6">

                    <div className="bg-black/20 border border-white/10 p-4 rounded-lg">
                        <p className="text-white/60 text-xs">Active Fleet Units</p>
                        <p className="text-lg font-bold text-[#D4AF37]">15 Vehicles</p>
                    </div>

                    <div className="bg-black/20 border border-white/10 p-4 rounded-lg">
                        <p className="text-white/60 text-xs">Cargo Capacity</p>
                        <p className="text-lg font-bold text-[#D4AF37]">~115 MT</p>
                    </div>

                    <div className="bg-black/20 border border-white/10 p-4 rounded-lg">
                        <p className="text-white/60 text-xs">Cross-Border Trips</p>
                        <p className="text-lg font-bold text-[#D4AF37]">Real-time</p>
                    </div>

                    <div className="bg-black/20 border border-white/10 p-4 rounded-lg">
                        <p className="text-white/60 text-xs">Tracking System</p>
                        <p className="text-lg font-bold text-[#D4AF37]">Active</p>
                    </div>

                </section>

                {/* Middle */}
                <section className="grid grid-cols-3 gap-4 mb-6">

                    <div className="col-span-2 bg-black/20 border border-white/10 p-4 rounded-lg h-64">
                        <h3 className="text-[#D4AF37] font-semibold mb-2">
                            Cargo Operations Overview
                        </h3>
                        <p className="text-white/70 text-sm">
                            Bulk Cargo + Bagged Cargo transport across local and cross-border routes.
                            Focus on efficiency, real-time tracking, and reduced emissions.
                        </p>
                    </div>

                    <div className="bg-black/20 border border-white/10 p-4 rounded-lg h-64">
                        <h3 className="text-[#D4AF37] font-semibold mb-2">
                            Fleet Breakdown
                        </h3>

                        <p className="text-sm text-white/70">
                            Volvo FH 440 (45m³) — 6 units
                        </p>
                        <p className="text-sm text-white/70">
                            Scania R460 — 4 units
                        </p>
                        <p className="text-sm text-white/70">
                            Volvo Fox 440 — 5 units
                        </p>
                    </div>

                </section>

                {/* Bottom */}
                <section className="bg-black/20 border border-white/10 p-4 rounded-lg">
                    <h3 className="text-[#D4AF37] font-semibold mb-2">
                        Operations Activity Feed
                    </h3>
                    <p className="text-white/60 text-sm">
                        Live updates from fleet movement, cargo dispatch, and tracking systems will appear here.
                    </p>
                </section>

            </main>
        </div>
    );
}