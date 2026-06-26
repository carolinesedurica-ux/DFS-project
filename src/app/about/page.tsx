import { Shield, Target, Compass, Award, Users, FileCheck } from "lucide-react";
import settings from "@/data/settings.json";

export const metadata = {
  title: "About Us | DFS Group",
  description: "Learn about the background, mission, values, leadership, and regional expansion roadmap of DFS Group, a transport and logistics leader based in Gaborone, Botswana."
};

export default function About() {
  const leadership = [
    {
      name: "Tichaona Nyadzoka",
      role: "Chief Executive Officer (CEO)",
      bio: "Tichaona NYADZOKA leads the strategic growth and fleet operations of DFS Group. With over a decade of executive experience across Southern African trade corridors, he focuses on optimizing fleet logistics, border documentation efficiency, and regional supply chain partnerships.",
      credentials: "Specialist in Transportation and Operations Management"
    },
    {
      name: "Humphrey Chawafambira",
      role: "Chief Commercial Officer (CCO)",
      bio: "Humphrey CHAWAFAMBIRA oversees commercial expansion, customer relations, and technology integration at DFS. He specializes in building strategic mining and manufacturing logistics accounts, advocating for sustainable vehicle integrations and digital client visibility systems.",
      credentials: "Specialist in Business Development and Transport Innovation"
    },
    {
      name: "Admire Teta",
      role: "Chief Financial Officer (CFO)",
      bio: "Admire TETA directs the financial strategy, capital allocation, and compliance frameworks for DFS Group. He leads financial restructuring, risk management, cross-border tariff structures, and capital investments in modern cargo fleet equipment.",
      credentials: "Specialist in Corporate Finance and Logistics Strategy"
    }
  ];

  const values = [
    {
      title: "Sustainability",
      description: "Reducing environmental footprint through optimized route plans, fuel-efficient fleet specs, and planned alternative fuels.",
      icon: LeafIcon
    },
    {
      title: "Innovation",
      description: "Designing the future DFS-OS digital system to centralize and automate shipping documentation, tracking, and border clearances.",
      icon: Target
    },
    {
      title: "Integrity",
      description: "Ensuring complete transparency in cargo weights, driver logs, border compliance, and pricing structures.",
      icon: Shield
    },
    {
      title: "Collaboration",
      description: "Working in close partnerships with customs authorities, border agents, and our client's logistics managers.",
      icon: Users
    },
    {
      title: "Customer First",
      description: "Providing responsive regional phone assistance, clear loading timelines, and customized contract fleet options.",
      icon: Compass
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About DFS Group</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Transforming Southern African Transport Logistics since {settings.company.foundedYear}</p>
        </div>
      </section>

      {/* History & Background */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Our Corporate History</h2>
            <p className="text-gray-600 leading-relaxed text-md">
              DFS Group was founded in 2019 in Gaborone, Botswana, to address the growing regional demand for highly reliable, professional, and compliant transport corridors. Seeing the operational challenges of cross-border logistics in Southern Africa—such as delayed border processing, manual document routing, and fragmented updates—DFS was established to provide an integrated answer.
            </p>
            <p className="text-gray-600 leading-relaxed text-md">
              By combining modern road transport equipment with experienced clearing coordination directly at major border gates, DFS Group supports businesses moving vital industrial inputs, mining minerals, and agricultural cargo between Botswana, South Africa, Zambia, and Zimbabwe.
            </p>
          </div>
          <div className="lg:col-span-5 bg-light-bg border border-gray-100 rounded-xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-primary-deep border-b border-gray-200 pb-2">Operational Foundation</h3>
            <ul className="space-y-3.5 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-accent-gold flex-shrink-0"></span>
                <span><strong>Headquarters:</strong> Gaborone, Botswana</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-accent-gold flex-shrink-0"></span>
                <span><strong>Operational Corridors:</strong> SADC SADC North & South lanes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-accent-gold flex-shrink-0"></span>
                <span><strong>Registered Fleet Capacity:</strong> Side-tipper & Flat-deck combinations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-20 bg-light-bg border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border border-gray-100 p-8 rounded-xl space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-primary-deep/5 flex items-center justify-center text-primary-deep">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-deep">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {settings.company.name} aims to become a leading global provider of sustainable and innovative transport solutions, setting new standards for efficiency, reliability, and customer satisfaction across SADC and broader corridors.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-xl space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-primary-deep/5 flex items-center justify-center text-primary-deep">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-deep">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To transform transportation and logistics by delivering seamless, environmentally responsible, and technologically advanced solutions that improve mobility, reduce environmental impact, and provide exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Our Core Values</h2>
            <p className="text-gray-500 text-sm">The operational principles that guide our drivers, planners, and managers every day.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="bg-light-bg border border-gray-50 p-6 rounded-lg text-center space-y-4">
                  <div className="h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center mx-auto">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-primary-deep">{v.title}</h4>
                  <p className="text-xs text-gray-500 leading-normal">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 sm:py-20 bg-light-bg border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Leadership Team</h2>
            <p className="text-gray-500 text-sm">Seasoned professionals directing DFS corporate operations, commercial partnerships, and financial strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary-deep">{member.name}</h3>
                    <p className="text-xs text-accent-gold font-bold uppercase tracking-wider">{member.role}</p>
                    <span className="block text-[10px] text-gray-400 font-semibold italic mt-1">{member.credentials}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance, Ethics & Compliance */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-lg bg-primary-deep/5 flex items-center justify-center text-primary-deep">
              <FileCheck className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Ethics, Governance & Compliance</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              DFS Group is committed to the highest standards of corporate governance, business ethics, and transparency. In a sector where compliance controls are critical to border rotations, we implement rigorous auditing and reporting pathways.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              All operations comply with the Botswana Data Protection Act, South African POPIA rules, and regional customs regulations. We enforce a zero-tolerance policy towards anti-corruption, bribery, or illegal broker practices.
            </p>
          </div>

          <div className="bg-light-bg rounded-xl p-6 sm:p-8 space-y-4 border border-gray-100">
            <h3 className="text-md font-bold text-primary-deep">Our Compliance Framework</h3>
            <ul className="space-y-4 text-xs text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="h-5 w-5 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <div>
                  <strong>Regulatory Conformity:</strong> Strict adherence to SADC cross-border licensing regulations, transport permits, and vehicle axle load configurations.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-5 w-5 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <div>
                  <strong>Risk Assessment and Safety Audits:</strong> Ongoing route reviews, border post dwell-time analyses, and equipment inspections to safeguard customer cargo.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-5 w-5 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <div>
                  <strong>Staff Training and Development:</strong> Ongoing driver safety courses, customs documentation compliance workshops, and cybersecurity training.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline Leaf Icon for Sustainability Value
function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a7 7 0 0 1-8 10Z" />
      <path d="M9.8 6.1C10.5 8.5 12 11.5 16 13.5" />
    </svg>
  );
}
