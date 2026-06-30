"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import settings from "@/data/settings.json";

export default function Contact() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-gray-500 font-semibold">Loading contact form...</div>}>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedHub = searchParams.get("hub") || "gaborone";

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedHub, setSelectedHub] = useState(preselectedHub);
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Save to localStorage for demo
      const submissions = JSON.parse(localStorage.getItem("dfs_enquiries") || "[]");
      submissions.push({
        id: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        companyName,
        email,
        phone,
        selectedHub,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("dfs_enquiries", JSON.stringify(submissions));

      // Reset Form fields
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact DFS Group</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Get in Touch with Our Regional Logistics Desks</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary-deep tracking-tight">Headquarters Information</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                DFS Group is based in Gaborone, coordinating operations via our Mmamashia headquarters. Use the contact details below or fill out the enquiry form.
              </p>
            </div>

            <div className="bg-light-bg rounded-xl border border-gray-100 p-6 space-y-6">
              <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider border-b border-gray-200 pb-2">Direct Directory</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Address:</strong> {settings.company.headquarters.address}, {settings.company.headquarters.city}, {settings.company.headquarters.country}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                  <a href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`} className="hover:text-primary-deep transition-colors font-medium">
                    {settings.company.phone1} (Operations dispatch)
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                  <a href={`tel:${settings.company.phone2.replace(/\s+/g, "")}`} className="hover:text-primary-deep transition-colors font-medium">
                    {settings.company.phone2} (Direct HQ Desk)
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                  <a href={`mailto:${settings.company.email}`} className="hover:text-primary-deep transition-colors font-medium">
                    {settings.company.email}
                  </a>
                </li>
                <li className="flex items-start space-x-3 border-t border-gray-200 pt-4">
                  <Clock className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Office Operating Hours:</strong>
                    <span className="block text-xs text-gray-500 mt-0.5">Monday – Friday: 08:00 – 17:00</span>
                    <span className="block text-xs text-gray-500">Saturday: 08:00 – 13:00</span>
                    <span className="block text-xs text-amber-600 font-medium mt-1">24/7 Operations Desk active for in-transit tracking support.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center space-y-4 max-w-lg mx-auto">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-primary-deep">Enquiry Submitted Successfully</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Thank you for contacting DFS Group. Your message has been routed to our {selectedHub.toUpperCase()} dispatch desk. A customer representative will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-primary-deep text-white hover:bg-primary-light rounded text-xs font-semibold"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-primary-deep">General Enquiry Form</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.fullName && <span className="text-[10px] text-red-500 block font-semibold">{errors.fullName}</span>}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Mining Corp"
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@company.com"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 block font-semibold">{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +267 74 191 781"
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Office Hub */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Route Office / Hub</label>
                    <select
                      value={selectedHub}
                      onChange={(e) => setSelectedHub(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="gaborone">Gaborone Hub (Botswana)</option>
                      <option value="johannesburg">Johannesburg Hub (South Africa)</option>
                      <option value="lusaka">Lusaka Hub (Zambia)</option>
                      <option value="harare">Harare Hub (Zimbabwe)</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Enquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="general">General Corporate Info</option>
                      <option value="rate">Rate & Tariff Enquiries</option>
                      <option value="customs">Customs Clearing Support</option>
                      <option value="vendor">Vendor/Supplier Registration</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your enquiry details..."
                    className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    }`}
                  ></textarea>
                  {errors.message && <span className="text-[10px] text-red-500 block font-semibold">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center space-x-2 px-6 py-3 w-full bg-primary-deep hover:bg-primary-light text-white rounded text-sm font-bold shadow-sm transition-colors disabled:bg-gray-300"
                >
                  <Send className="h-4 w-4 text-accent-gold" />
                  <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
