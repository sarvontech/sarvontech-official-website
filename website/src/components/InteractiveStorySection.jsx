import React, { useState, useEffect } from 'react';
import { 
  MapPin, Stethoscope, Clock, CheckCircle2, User, Phone, 
  ArrowRight, RotateCcw, ChevronLeft, Sparkles, Send, ShieldCheck, 
  Check, ArrowDown, Building2, Bell, Zap, Laptop, Search, ChevronRight,
  Calendar, Star, Layers, Globe, Radio
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function InteractiveStorySection() {
  // Active Journey Stage Index (0: DISCOVER, 1: CHOOSE, 2: BOOK, 3: SYNC, 4: CONFIRM)
  const [activeStage, setActiveStage] = useState(0);
  
  // Sub-states within stage 0 (Map Search)
  const [searchQuery, setSearchQuery] = useState('hospitals near me');
  const [selectedClinicId, setSelectedClinicId] = useState('citycare');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [isDataFlowing, setIsDataFlowing] = useState(false);

  const stages = [
    { id: 'discover', num: '01', name: 'DISCOVER', title: 'Find a Healthcare Provider Nearby', subtitle: 'Search nearby clinics & inspect real-time availability' },
    { id: 'choose', num: '02', name: 'CHOOSE', title: 'Choose Doctor & Time Slot', subtitle: 'Select specialist, consultation type, and open time slot' },
    { id: 'book', num: '03', name: 'BOOK', title: 'Book Your Appointment', subtitle: 'Fill in patient details with instant slot reservation' },
    { id: 'sync', num: '04', name: 'SYNC', title: 'Real-Time System Synchronization', subtitle: 'Appointment dispatches directly to the clinic admin dashboard' },
    { id: 'confirm', num: '05', name: 'CONFIRM', title: 'Appointment Confirmed', subtitle: 'Patient receives instant confirmation and WhatsApp reminders' }
  ];

  const clinics = [
    { id: 'sunrise', num: '1', name: 'Sunrise Hospital', area: 'Baner', distance: '1.2 km', rating: '4.6', doctor: 'Dr. Vikram Malhotra', specialty: 'Cardiologist', slots: ['10:00 AM', '10:30 AM', '11:15 AM'], x: 38, y: 22 },
    { id: 'citycare', num: '2', name: 'CityCare Clinic', area: 'Aundh', distance: '2.3 km', rating: '4.8', doctor: 'Dr. Ananya Sharma', specialty: 'General Physician', slots: ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'], x: 58, y: 45 },
    { id: 'lifeline', num: '3', name: 'Lifeline Hospital', area: 'Pimple Saudagar', distance: '3.1 km', rating: '4.5', doctor: 'Dr. Rahul Mehta', specialty: 'Orthopedic Specialist', slots: ['02:00 PM', '02:45 PM', '03:30 PM'], x: 28, y: 55 },
    { id: 'medplus', num: '4', name: 'MedPlus Hospital', area: 'Hinjewadi', distance: '4.4 km', rating: '4.7', doctor: 'Dr. Priya Deshmukh', specialty: 'Pediatric Consultant', slots: ['04:15 PM', '05:00 PM', '05:45 PM'], x: 20, y: 72 },
    { id: 'wellcare', num: '5', name: 'WellCare Hospital', area: 'Kothrud', distance: '4.8 km', rating: '4.4', doctor: 'Dr. Amit Verma', specialty: 'Neurology Specialist', slots: ['06:00 PM', '06:30 PM', '07:15 PM'], x: 74, y: 78 }
  ];

  const activeClinic = clinics.find(c => c.id === selectedClinicId) || clinics[1];

  // Auto-typing simulation with substring slicing (guarantees zero missing characters like 'h')
  useEffect(() => {
    if (activeStage === 0) {
      setSearchQuery('');
      const text = 'hospitals near me';
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setSearchQuery(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 60);
      return () => clearInterval(timer);
    }
  }, [activeStage]);

  // Handle stage 03 submit to stage 04 data stream
  const handleBookingSubmit = () => {
    setActiveStage(3); // Move to SYNC
    setIsDataFlowing(true);
    setTimeout(() => {
      setIsDataFlowing(false);
    }, 1500);
  };

  const handleReset = () => {
    setActiveStage(0);
    setSelectedClinicId('citycare');
    setSelectedSlot('11:30 AM');
    setIsDataFlowing(false);
  };

  return (
    <section id="interactive-story" className="py-20 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative overflow-hidden transition-colors duration-200">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--color-brand-light)] blur-[200px] rounded-full pointer-events-none opacity-50" />

      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)] font-semibold inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-lime)]" />
            <span>INTERACTIVE PRODUCT JOURNEY</span>
          </span>
          <h2 className="text-2xl sm:text-[2.5rem] font-extrabold text-[var(--color-text-primary)] tracking-tight">
            See the System in Action.
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base">
            From searching for a doctor to a confirmed appointment — experience the connected digital platform.
          </p>
        </div>

        {/* CONNECTED JOURNEY STAGE NODES (NAVIGATION) */}
        <div className="py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto relative overflow-x-auto pb-2 scrollbar-none">
            {/* Connecting Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[var(--color-border)] -z-0" />
            
            {stages.map((st, idx) => {
              const isActive = activeStage === idx;
              const isPast = activeStage > idx;

              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(idx)}
                  className={`relative z-10 flex flex-col items-center gap-1.5 group cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-extrabold text-xs transition-all border shadow-md ${
                    isActive 
                      ? 'bg-[var(--color-brand)] text-white border-[var(--color-accent-lime)] shadow-[var(--color-brand-light)] scale-105 ring-4 ring-[var(--color-brand-light)]' 
                      : isPast 
                      ? 'bg-[var(--color-brand-light)] text-[var(--color-brand)] border-[var(--color-brand)]' 
                      : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)]'
                  }`}>
                    {isPast ? <Check className="w-4 h-4 text-[var(--color-brand)]" /> : st.num}
                  </div>
                  <span className={`text-[11px] font-mono tracking-wider font-bold whitespace-nowrap transition-colors ${
                    isActive ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    {st.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SPATIAL STAGE DISPLAY VIEWPORT */}
        <div className="glass-card rounded-3xl border border-[var(--color-border)] shadow-2xl overflow-hidden relative min-h-[560px] flex flex-col justify-between">
          
          {/* Top Bar: Active Stage Title & Toolbar */}
          <div className="p-4 sm:p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-md flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[var(--color-brand)] uppercase tracking-wider bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-bold">
                STAGE {stages[activeStage].num} — {stages[activeStage].name}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mt-1">
                {stages[activeStage].title}
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {activeStage > 0 && (
                <button
                  onClick={() => setActiveStage(prev => prev - 1)}
                  className="px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
              )}
              {activeStage < 4 && (
                <button
                  onClick={() => setActiveStage(prev => prev + 1)}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer"
                title="Reset Journey Demo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MAIN STAGE CONTENT AREA */}
          <div className="p-4 sm:p-8 flex-grow flex flex-col justify-center">
            
            {/* STAGE 01: DISCOVER (SEARCH & INTERACTIVE MAP) */}
            {activeStage === 0 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Search Bar Simulation */}
                <div className="max-w-md mx-auto relative">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-brand)] shadow-lg">
                    <Search className="w-4 h-4 text-[var(--color-brand)] flex-shrink-0" />
                    <span className="text-xs font-mono text-[var(--color-text-primary)] font-bold">
                      {searchQuery}
                      <span className="animate-pulse text-[var(--color-brand)] font-extrabold">|</span>
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-[var(--color-accent-mint)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded font-semibold">
                      5 Results
                    </span>
                  </div>
                </div>

                {/* Split View: Clinic List (Left) + map.png (Right) */}
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Nearby Clinics List with 5px Container Padding */}
                  <div className="lg:col-span-5 space-y-2 max-h-[355px] overflow-y-auto p-[5px] scrollbar-thin">
                    {clinics.map((c) => {
                      const isSelected = selectedClinicId === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedClinicId(c.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] shadow-md scale-[1.01]'
                              : 'glass-card border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                              isSelected ? 'bg-red-600 text-white shadow' : 'bg-red-100 text-red-700 dark:bg-red-950/40'
                            }`}>
                              {c.num}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">{c.name}</h4>
                              <p className="text-[11px] text-[var(--color-text-secondary)]">{c.area} • {c.distance}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{c.rating}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Local map.png Background Container */}
                  <div className="lg:col-span-7 relative h-[355px] rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-inner group">
                    <img 
                      src="/assets/images/projects/map.png" 
                      alt="City Map View" 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Subtle Overlay Tint */}
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none" />

                    {/* YOU ARE HERE Marker */}
                    <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 z-20">
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-75" />
                        <div className="w-5 h-5 rounded-full bg-[var(--color-brand)] border-2 border-white flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)]" />
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-extrabold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-cyan-400/50 shadow-md">
                        YOU ARE HERE
                      </span>
                    </div>

                    {/* RED HEALTHCARE MAP LOCATION PINS WITH GROW/SHRINK ANIMATION */}
                    {clinics.map((c, idx) => {
                      const isSel = selectedClinicId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelectedClinicId(c.id)}
                          style={{ left: `${c.x}%`, top: `${c.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-full z-30 group/pin cursor-pointer focus:outline-none"
                        >
                          <div className="relative flex flex-col items-center">
                            {/* Red Teardrop Location Icon Pin with Continuous Grow/Shrink Animation */}
                            <div 
                              style={{ animationDelay: `${idx * 0.4}s` }}
                              className={`relative flex items-center justify-center transition-transform animate-pin-grow-shrink ${
                                isSel ? 'scale-125 z-40' : 'group-hover/pin:scale-125'
                              }`}
                            >
                              <MapPin className={`w-9 h-9 ${
                                isSel 
                                  ? 'text-red-600 fill-red-600 drop-shadow-[0_4px_12px_rgba(220,38,38,0.9)]' 
                                  : 'text-red-500 fill-red-500 drop-shadow-md'
                              }`} />
                              {/* Clinic Number Inside Location Pin */}
                              <span className="absolute top-[5px] text-[10px] font-mono font-extrabold text-white">
                                {c.num}
                              </span>
                            </div>

                            {/* Clinic Name Pill Below Location Pin */}
                            <span className="text-[9px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full shadow-md border border-white -mt-1 whitespace-nowrap">
                              {c.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                </div>

                {/* Selected Clinic Emergence Banner */}
                <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-brand)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-brand)] font-bold">SELECTED HEALTHCARE PROVIDER</span>
                    <h4 className="text-base font-extrabold text-[var(--color-text-primary)]">{activeClinic.name}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">{activeClinic.area} • {activeClinic.distance} • Doctor: {activeClinic.doctor}</p>
                  </div>

                  <button
                    onClick={() => setActiveStage(1)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer flex-shrink-0"
                  >
                    <span>Choose Doctor & Slots →</span>
                  </button>
                </div>

              </div>
            )}

            {/* STAGE 02: CHOOSE (DOCTOR & TIME SLOTS) */}
            {activeStage === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto w-full">
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-[var(--color-brand)] font-bold">STEP 2 OF 5: SELECT SPECIALIST & TIME</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                    Available Doctors at {activeClinic.name}
                  </h3>
                </div>

                <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl space-y-5">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center font-extrabold font-mono text-sm shadow-md">
                      DR
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[var(--color-text-primary)]">{activeClinic.doctor}</h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">{activeClinic.specialty} • {activeClinic.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase font-bold">AVAILABLE OPEN SLOTS TODAY</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {activeClinic.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-[var(--color-accent-lime)] text-[var(--color-text-primary)] border-[var(--color-accent-lime)] shadow-md scale-105'
                              : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] text-[var(--color-card-solution-text)] text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-mint)] flex-shrink-0" />
                    <span>Slot <strong>{selectedSlot}</strong> is reserved in real-time upon selection.</span>
                  </div>

                  <button
                    onClick={() => setActiveStage(2)}
                    className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>Proceed to Book ({selectedSlot}) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 03: BOOK (PATIENT BOOKING FORM) */}
            {activeStage === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-md mx-auto w-full">
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-[var(--color-brand)] font-bold">STEP 3 OF 5: PATIENT BOOKING</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                    Confirm Appointment Details
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    No phone call required. Submission dispatches directly to clinic roster.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl space-y-4">
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-mono text-[var(--color-text-muted)] mb-1">PATIENT FULL NAME</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="Rahul Verma" 
                        className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] font-bold text-[var(--color-text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[var(--color-text-muted)] mb-1">MOBILE NUMBER (WHATSAPP)</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="+91 98765 43210" 
                        className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] font-bold text-[var(--color-text-primary)]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-mono text-[var(--color-text-muted)] mb-1">CLINIC</label>
                        <input 
                          type="text" 
                          readOnly 
                          value={activeClinic.name} 
                          className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[var(--color-text-muted)] mb-1">TIME</label>
                        <input 
                          type="text" 
                          readOnly 
                          value={selectedSlot} 
                          className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-brand)] font-bold text-[var(--color-brand)]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookingSubmit}
                    className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[var(--color-accent-lime)]" />
                    <span>Confirm Appointment →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 04: SYNC (DATA STREAM & CLINIC ADMIN DASHBOARD) */}
            {activeStage === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto w-full">
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-[var(--color-brand)] font-bold">STEP 4 OF 5: CLINIC SYSTEM SYNCHRONIZATION</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                    Clinic Receives Appointment Instantly
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    The appointment data stream updates the clinic's administrative roster live.
                  </p>
                </div>

                {/* ANIMATED DATA PACKET TRANSITION */}
                <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-brand)] flex items-center justify-between text-xs font-mono text-[var(--color-brand)]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Patient Mobile</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold animate-pulse">
                    <span>━━━━</span>
                    <Zap className="w-4 h-4 text-[var(--color-accent-lime)]" />
                    <span>━━━━▶</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4" />
                    <span>Clinic Admin Roster</span>
                  </div>
                </div>

                {/* CLINIC ROSTER DASHBOARD */}
                <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 text-xs">
                    <span className="font-mono font-bold text-[var(--color-brand)]">{activeClinic.name.toUpperCase()} — TODAY'S ROSTER</span>
                    <span className="text-[10px] font-mono text-[var(--color-accent-mint)] bg-[var(--color-accent-soft)] px-2.5 py-1 rounded-full font-bold">
                      ● REAL-TIME SYNC ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Dynamically Arrived Row */}
                    <div className="p-3.5 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-brand)] flex items-center justify-between animate-in slide-in-from-top duration-500 shadow-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[var(--color-brand)] flex-shrink-0" />
                        <div>
                          <span className="font-bold text-[var(--color-text-primary)]">{selectedSlot} — Rahul Verma</span>
                          <span className="text-[11px] text-[var(--color-text-secondary)] block">{activeClinic.doctor} • Patient Mobile +91 98765 43210</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-white bg-[var(--color-brand)] px-2.5 py-1 rounded-full font-extrabold shadow-sm">
                        NEW ONLINE BOOKING
                      </span>
                    </div>

                    {/* Pre-existing Row */}
                    <div className="p-3.5 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                        <div>
                          <span>09:30 AM — Sunita Rao</span>
                          <span className="text-[11px] text-[var(--color-text-muted)] block">Confirmed • Checked In</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">CONFIRMED</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStage(4)}
                    className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>View Patient Confirmation Receipt →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 05: CONFIRM (PATIENT CONFIRMATION RECEIPT) */}
            {activeStage === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-md mx-auto w-full">
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-[var(--color-brand)] font-bold">STEP 5 OF 5: PATIENT CONFIRMATION</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                    Appointment Successfully Booked
                  </h3>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] shadow-2xl text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-8 h-8 text-[var(--color-accent-lime)]" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-extrabold text-[var(--color-card-solution-text)]">Appointment Confirmed</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      WhatsApp notification & location pin dispatched automatically.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-left space-y-2">
                    <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                      <span className="text-[var(--color-text-muted)] font-mono">PATIENT:</span>
                      <span className="font-bold text-[var(--color-text-primary)]">Rahul Verma</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                      <span className="text-[var(--color-text-muted)] font-mono">CLINIC:</span>
                      <span className="font-bold text-[var(--color-text-primary)]">{activeClinic.name} ({activeClinic.area})</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                      <span className="text-[var(--color-text-muted)] font-mono">DOCTOR:</span>
                      <span className="font-bold text-[var(--color-brand)]">{activeClinic.doctor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)] font-mono">TIME:</span>
                      <span className="font-bold text-[var(--color-accent-mint)]">{selectedSlot} Today</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] text-center space-y-1">
                      <div className="text-xs font-mono font-extrabold text-[var(--color-brand)]">
                        "From a search to a confirmed appointment — without the phone call."
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Replay Product Journey</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Journey Summary Footer */}
          <div className="p-4 sm:p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[var(--color-text-secondary)]">
              <span className={`px-3 py-1 rounded-full border ${activeStage >= 0 ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold' : 'border-[var(--color-border)]'}`}>
                SEARCH & MAP
              </span>
              <span>→</span>
              <span className={`px-3 py-1 rounded-full border ${activeStage >= 1 ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold' : 'border-[var(--color-border)]'}`}>
                DOCTOR & SLOT
              </span>
              <span>→</span>
              <span className={`px-3 py-1 rounded-full border ${activeStage >= 3 ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold' : 'border-[var(--color-border)]'}`}>
                SYSTEM SYNC
              </span>
              <span>→</span>
              <span className={`px-3 py-1 rounded-full border ${activeStage >= 4 ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold' : 'border-[var(--color-border)]'}`}>
                CONFIRMATION
              </span>
            </div>
          </div>

        </div>

      </RevealOnScroll>
    </section>
  );
}
