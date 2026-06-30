"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, FileCheck, FileText, Sparkles } from "lucide-react";
import settings from "@/data/settings.json";

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form Fields
  // Step 1: Customer details
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [country, setCountry] = useState("Botswana");

  // Step 2: Shipment details
  const [cargoType, setCargoType] = useState("Bulk Cargo");
  const [cargoDescription, setCargoDescription] = useState("");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [estimatedVolume, setEstimatedVolume] = useState("");
  const [numLoads, setNumLoads] = useState("1");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [deliveryDeadline, setDeliveryDeadline] = useState("");
  const [crossBorder, setCrossBorder] = useState(true);
  const [customsSupport, setCustomsSupport] = useState(true);

  // Step 3: Equipment & Handling
  const [equipmentType, setEquipmentType] = useState("tipper"); // tipper or flat-deck
  const [specialHandling, setSpecialHandling] = useState("none");
  const [loadingOffloadingSupport, setLoadingOffloadingSupport] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Step 4: Supporting Documents (Mock filenames)
  const [manifestFile, setManifestFile] = useState<string>("");
  const [packingListFile, setPackingListFile] = useState<string>("");

  // Step 5: Confirmation state
  const [consent, setConsent] = useState(false);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReference, setSubmissionReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!fullName.trim()) newErrors.fullName = "Full name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
      if (!phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!cargoDescription.trim()) newErrors.cargoDescription = "Cargo description is required";
      if (!estimatedWeight.trim()) newErrors.estimatedWeight = "Estimated weight is required";
      if (!origin.trim()) newErrors.origin = "Origin address is required";
      if (!destination.trim()) newErrors.destination = "Destination address is required";
      if (!collectionDate) newErrors.collectionDate = "Collection date is required";
    }

    if (step === 5) {
      if (!consent) newErrors.consent = "You must consent to data processing under POPIA / Botswana Data Protection principles";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "manifest" | "packing") => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      if (type === "manifest") setManifestFile(fileName);
      if (type === "packing") setPackingListFile(fileName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    // Simulate RFQ generation
    setTimeout(() => {
      setIsSubmitting(false);
      const ref = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionReference(ref);
      setCurrentStep(6); // Success screen

      // Save to localStorage for Admin / Customer preview access
      const rfqs = JSON.parse(localStorage.getItem("dfs_rfqs") || "[]");
      rfqs.push({
        reference: ref,
        customer: { fullName, companyName, email, phone, contactMethod, country },
        shipment: { cargoType, cargoDescription, estimatedWeight, estimatedVolume, numLoads, origin, destination, collectionDate, deliveryDeadline, crossBorder, customsSupport },
        equipment: { equipmentType, specialHandling, loadingOffloadingSupport, additionalNotes },
        documents: { manifestFile, packingListFile },
        status: "Pending Review",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("dfs_rfqs", JSON.stringify(rfqs));
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-primary-deep text-white py-12 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Request a Logistics Quotation</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Step-by-step cross-border transit pricing</p>
        </div>
      </section>

      <section className="py-12 bg-light-bg flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step Indicator (Only if not success state) */}
          {currentStep <= 5 && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <span>Step {currentStep} of 5</span>
                <span>
                  {currentStep === 1 && "Customer Details"}
                  {currentStep === 2 && "Shipment Information"}
                  {currentStep === 3 && "Equipment & Handling"}
                  {currentStep === 4 && "Supporting Documents"}
                  {currentStep === 5 && "Review & Confirmation"}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-accent-gold h-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 sm:p-8">
            
            {/* STEP 1: CUSTOMER DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary-deep">Step 1: Contact & Company Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Contact Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.fullName && <span className="text-[10px] text-red-500 font-semibold">{errors.fullName}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Mining Ltd"
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@acme.com"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Phone Number *</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +267 74 191 781"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Preferred Contact Method</label>
                    <select
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp Message</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Customer Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary-deep text-white hover:bg-primary-light rounded font-bold text-sm shadow-sm"
                  >
                    <span>Next: Shipment Info</span>
                    <ArrowRight className="h-4 w-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPMENT DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary-deep">Step 2: Cargo & Route Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Cargo Category</label>
                    <select
                      value={cargoType}
                      onChange={(e) => setCargoType(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="Bulk Cargo">Bulk Minerals / Dry Bulk</option>
                      <option value="Bagged Cargo">Bagged Materials / FMCG</option>
                      <option value="Special Project">Special / Out of Gauge</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Weight *</label>
                    <input
                      type="text"
                      value={estimatedWeight}
                      onChange={(e) => setEstimatedWeight(e.target.value)}
                      placeholder="e.g. 36 MT"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.estimatedWeight ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.estimatedWeight && <span className="text-[10px] text-red-500 font-semibold">{errors.estimatedWeight}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Loads Count</label>
                    <input
                      type="number"
                      min={1}
                      value={numLoads}
                      onChange={(e) => setNumLoads(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Cargo Description *</label>
                  <input
                    type="text"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    placeholder="e.g. Palletized agricultural fertilizer bags"
                    className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                      errors.cargoDescription ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.cargoDescription && <span className="text-[10px] text-red-500 font-semibold">{errors.cargoDescription}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Origin Address *</label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g. Johannesburg Depot, SA"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.origin ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.origin && <span className="text-[10px] text-red-500 font-semibold">{errors.origin}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Destination Address *</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Mine Site, Gaborone, Botswana"
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.destination ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.destination && <span className="text-[10px] text-red-500 font-semibold">{errors.destination}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Collection Date *</label>
                    <input
                      type="date"
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      className={`w-full bg-light-bg border rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none ${
                        errors.collectionDate ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.collectionDate && <span className="text-[10px] text-red-500 font-semibold">{errors.collectionDate}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Delivery Deadline</label>
                    <input
                      type="date"
                      value={deliveryDeadline}
                      onChange={(e) => setDeliveryDeadline(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-6 bg-light-bg p-4 rounded-lg">
                  <label className="flex items-center space-x-2 text-xs font-bold text-charcoal select-none">
                    <input
                      type="checkbox"
                      checked={crossBorder}
                      onChange={(e) => setCrossBorder(e.target.checked)}
                      className="rounded border-gray-300 text-accent-gold focus:ring-accent-gold"
                    />
                    <span>Requires Cross-Border Transit</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 text-xs font-bold text-charcoal select-none">
                    <input
                      type="checkbox"
                      checked={customsSupport}
                      onChange={(e) => setCustomsSupport(e.target.checked)}
                      className="rounded border-gray-300 text-accent-gold focus:ring-accent-gold"
                    />
                    <span>Requires Customs Clearing Support</span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded text-sm font-semibold text-charcoal transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary-deep text-white hover:bg-primary-light rounded font-bold text-sm shadow-sm"
                  >
                    <span>Next: Equipment Details</span>
                    <ArrowRight className="h-4 w-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EQUIPMENT & HANDLING */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary-deep">Step 3: Trailer & Handling Preferences</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Trailer Choice</label>
                    <select
                      value={equipmentType}
                      onChange={(e) => setEquipmentType(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="tipper">Side-Tipper Link Trailer (Bulk Commodities)</option>
                      <option value="flat-deck">Flat-Deck Link Combinations (Bagged & Palletized)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">Special Cargo Handling</label>
                    <select
                      value={specialHandling}
                      onChange={(e) => setSpecialHandling(e.target.value)}
                      className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    >
                      <option value="none">Standard Road Securement</option>
                      <option value="heavy-tarp">Double Tarping / Moisture Sensitive</option>
                      <option value="escort">Requires Convoy / Out of Gauge</option>
                    </select>
                  </div>
                </div>

                <div className="bg-light-bg p-4 rounded-lg space-y-2">
                  <label className="flex items-center space-x-2 text-xs font-bold text-charcoal select-none">
                    <input
                      type="checkbox"
                      checked={loadingOffloadingSupport}
                      onChange={(e) => setLoadingOffloadingSupport(e.target.checked)}
                      className="rounded border-gray-300 text-accent-gold focus:ring-accent-gold"
                    />
                    <span>Request loading and offloading equipment support at terminals</span>
                  </label>
                  <p className="text-[10px] text-gray-500 pl-6 leading-normal">
                    Check this if your loading point does not have operational cranes or tipper loading bays.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Additional Cargo Notes</label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Specify any details on packaging, stack limits, or access gate restrictions..."
                    className="w-full bg-light-bg border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded text-sm font-semibold text-charcoal transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary-deep text-white hover:bg-primary-light rounded font-bold text-sm shadow-sm"
                  >
                    <span>Next: Documents</span>
                    <ArrowRight className="h-4 w-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUPPORTING DOCUMENTS */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-primary-deep">Step 4: Documents Upload (Mockup)</h3>
                  <p className="text-xs text-gray-500 leading-normal">
                    Upload packing lists or customs declarations. Files will be temporarily cached locally in the demonstration session. Do not upload sensitive confidential records.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Manifest / Cargo list */}
                  <div className="border border-dashed border-gray-200 rounded-lg p-5 text-center space-y-4">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                    <div className="space-y-1">
                      <span className="block text-xs font-bold text-primary-deep">Cargo Manifest / Weight Details</span>
                      <span className="block text-[10px] text-gray-400">PDF, JPG up to 10MB</span>
                    </div>
                    <label className="inline-block px-4 py-2 bg-light-bg hover:bg-gray-100 text-charcoal text-xs font-semibold rounded cursor-pointer border border-gray-200 transition-colors">
                      Choose Manifest
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "manifest")}
                      />
                    </label>
                    {manifestFile && (
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{manifestFile}</span>
                      </div>
                    )}
                  </div>

                  {/* Packing List */}
                  <div className="border border-dashed border-gray-200 rounded-lg p-5 text-center space-y-4">
                    <FileCheck className="h-8 w-8 text-gray-400 mx-auto" />
                    <div className="space-y-1">
                      <span className="block text-xs font-bold text-primary-deep">Packing List / HS Code List</span>
                      <span className="block text-[10px] text-gray-400">PDF, CSV up to 10MB</span>
                    </div>
                    <label className="inline-block px-4 py-2 bg-light-bg hover:bg-gray-100 text-charcoal text-xs font-semibold rounded cursor-pointer border border-gray-200 transition-colors">
                      Choose Packing List
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "packing")}
                      />
                    </label>
                    {packingListFile && (
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{packingListFile}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded text-sm font-semibold text-charcoal transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary-deep text-white hover:bg-primary-light rounded font-bold text-sm shadow-sm"
                  >
                    <span>Next: Review Quote</span>
                    <ArrowRight className="h-4 w-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & CONFIRMATION */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary-deep">Step 5: Review & Submit</h3>

                <div className="border border-gray-100 rounded-lg p-5 bg-light-bg text-xs space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">CUSTOMER</span>
                      <span className="font-semibold text-charcoal">{fullName} ({companyName || "No Company"})</span>
                      <span className="block text-gray-500">{email} // {phone}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">CARGO & WEIGHT</span>
                      <span className="font-semibold text-charcoal">{cargoType}</span>
                      <span className="block text-gray-500">{cargoDescription} ({estimatedWeight})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-3">
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">ORIGIN & DESTINATION</span>
                      <span className="font-semibold text-charcoal">{origin}</span>
                      <span className="block text-gray-500">→ {destination}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">TRAILER TYPE</span>
                      <span className="font-semibold text-charcoal uppercase">{equipmentType === "tipper" ? "Side-Tipper Link" : "Flat-Deck Link"}</span>
                      <span className="block text-gray-500">Special securement: {specialHandling}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-3">
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">CORRIDOR CHECKS</span>
                      <span className="font-semibold text-charcoal">
                        Cross-Border: {crossBorder ? "Yes" : "No"} // Customs: {customsSupport ? "Yes" : "No"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 uppercase font-bold text-[9px]">UPLOADED FILE PLUGS</span>
                      <span className="font-semibold text-charcoal">
                        Manifest: {manifestFile || "None"} | Packing List: {packingListFile || "None"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-2 text-xs font-bold text-charcoal select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className={`rounded border-gray-300 text-accent-gold focus:ring-accent-gold mt-0.5 ${
                        errors.consent ? "border-red-500" : ""
                      }`}
                    />
                    <span>
                      I authorize DFS Group to process the submitted shipment, contact, and document files under the Botswana Data Protection and POPIA privacy guidelines. *
                    </span>
                  </label>
                  {errors.consent && <span className="text-[10px] text-red-500 block font-semibold">{errors.consent}</span>}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded text-sm font-semibold text-charcoal transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary-deep hover:bg-primary-light text-white rounded font-bold text-sm shadow-md transition-colors disabled:bg-gray-300"
                  >
                    <span>{isSubmitting ? "Submitting RFQ..." : "Confirm & Submit RFQ"}</span>
                    <Sparkles className="h-4 w-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: SUCCESS SCREEN */}
            {currentStep === 6 && (
              <div className="text-center space-y-6 py-4 animate-fade-in-up">
                <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary-deep">Quotation Request Submitted</h3>
                  <p className="text-sm text-gray-500 max-w-lg mx-auto">
                    Your request has been filed in the SADC corridor queue. Our logistics dispatchers are checking truck availability.
                  </p>
                </div>

                <div className="bg-light-bg border border-gray-100 rounded-lg p-5 max-w-sm mx-auto text-center">
                  <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Quote Reference Code</span>
                  <span className="text-xl font-mono font-extrabold text-primary-deep">{submissionReference}</span>
                </div>

                <div className="bg-amber-50 border-l-4 border-accent-gold p-4 rounded max-w-lg mx-auto text-left text-xs space-y-1">
                  <span className="font-bold text-primary-deep uppercase">Next Integration Steps:</span>
                  <p className="text-charcoal/80">
                    A mock confirmation is saved in your browser session. You can copy this code and search for it in our <Link href="/track" className="underline text-primary-deep font-bold hover:text-accent-gold">Shipment Tracker Demo</Link> or log in to the <Link href="/portal-preview" className="underline text-primary-deep font-bold hover:text-accent-gold">Customer Portal Preview</Link> to inspect it.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setManifestFile("");
                      setPackingListFile("");
                      setConsent(false);
                    }}
                    className="px-6 py-2.5 bg-primary-deep text-white hover:bg-primary-light rounded text-xs font-bold transition-colors"
                  >
                    Create Another Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
