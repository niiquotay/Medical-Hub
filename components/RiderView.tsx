import React, { useState, useRef, useEffect } from 'react';
import { DeliveryJob } from '../types';
import { 
  MapPin, Navigation, Scan, CheckCircle, AlertTriangle, Package, 
  Home, Map as MapIcon, DollarSign, User, Bell, ChevronRight, 
  History, Settings, TrendingUp, Clock, Shield, Star, Bike,
  ArrowUp, ArrowDown
} from 'lucide-react';

export const RiderView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'earnings' | 'profile'>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  const [jobs, setJobs] = useState<DeliveryJob[]>([
    {
      id: 'job-123',
      type: 'medication',
      pickupLocation: 'City Pharmacy (2km)',
      dropoffLocation: '123 Pine St (4km)',
      patientName: 'John Doe',
      status: 'pending',
      fee: 12.50,
      verificationCode: 'MED-5592'
    },
    {
      id: 'job-456',
      type: 'lab_result',
      pickupLocation: 'MediLab Central (1.2km)',
      dropoffLocation: '456 Oak Ave (3km)',
      patientName: 'Sarah Smith',
      status: 'pending',
      fee: 8.00,
      verificationCode: 'LAB-9921'
    }
  ]);

  const [activeScanner, setActiveScanner] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<'idle' | 'success' | 'fail'>('idle');

  const handleScroll = () => {
    if (mainRef.current) {
       const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
       setShowScrollTop(scrollTop > 200);
       setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 100);
    }
  };

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToBottom = () => {
    mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior: 'smooth' });
  };

  const handleScan = (jobId: string) => {
    setActiveScanner(jobId);
    setScanResult('idle');
  };

  const simulateScanAction = (success: boolean) => {
    setScanResult(success ? 'success' : 'fail');
    if (success) {
      setTimeout(() => {
        setJobs(prev => prev.map(j => j.id === activeScanner ? { ...j, status: 'delivered' } : j));
        setActiveScanner(null);
        setScanResult('idle');
      }, 1500);
    }
  };

  const renderHome = () => (
    <div className="p-4 space-y-6 animate-fade-in pb-24">
      <header className="flex justify-between items-center relative z-10 pt-4">
        <div className="flex items-center gap-3">
          <div className="relative">
              <img src="https://i.pravatar.cc/150?u=rider_alex" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover img-enhance" alt="Rider Profile" />
               <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h1 className="text-xl font-display font-bold italic tracking-tight text-slate-900 drop-shadow-sm leading-none">ALEX</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Rider • Online</p>
          </div>
        </div>
        <div className="glass-card px-4 py-2 rounded-2xl shadow-premium border border-white/60 text-right">
          <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Earnings</span>
          <p className="text-lg font-mono font-bold text-emerald-600 drop-shadow-sm">$45.20</p>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="glass-card p-3 rounded-2xl flex items-center gap-3 bg-white/60">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Navigation className="w-5 h-5"/></div>
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Trips Today</p>
                <p className="text-lg font-bold text-slate-900">12</p>
             </div>
          </div>
          <div className="glass-card p-3 rounded-2xl flex items-center gap-3 bg-white/60">
             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Clock className="w-5 h-5"/></div>
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Online</p>
                <p className="text-lg font-bold text-slate-900">4h 20m</p>
             </div>
          </div>
      </div>

      {/* Active Missions List */}
      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-end px-2">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Manifest</h2>
            <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">View History <ChevronRight className="w-3 h-3"/></button>
        </div>
        
        {jobs.map(job => (
          <div key={job.id} className="glass-card rounded-[2rem] overflow-hidden shadow-premium group card-3d bg-white/80">
            <div className="p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl shadow-inner ${job.type === 'medication' ? 'bg-blue-50/50 text-blue-600' : 'bg-purple-50/50 text-purple-600'}`}>
                    <Package className="w-6 h-6 drop-shadow-sm" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block tracking-wider">{job.type.replace('_', ' ')}</span>
                    <span className="text-sm font-mono text-slate-600 font-bold">#{job.id}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-slate-800 drop-shadow-sm">${job.fee.toFixed(2)}</div>
              </div>

              <div className="space-y-4 pl-4 border-l-2 border-slate-200/50 relative ml-2">
                 <div className="flex items-start gap-4">
                    <div className="mt-0.5"><MapPin className="w-5 h-5 text-slate-400" /></div>
                    <div>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Pickup From</p>
                       <p className="font-semibold text-slate-800">{job.pickupLocation}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="mt-0.5"><Navigation className="w-5 h-5 text-primary drop-shadow-sm" /></div>
                    <div>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Deliver To</p>
                       <p className="font-semibold text-primary">{job.dropoffLocation}</p>
                       <p className="text-sm text-slate-500 font-medium">{job.patientName}</p>
                    </div>
                 </div>
              </div>

              {job.status === 'delivered' ? (
                 <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl py-3 flex items-center justify-center gap-2 text-emerald-600 font-bold tracking-wide shadow-inner backdrop-blur-sm">
                   <CheckCircle className="w-5 h-5" /> COMPLETED
                 </div>
              ) : (
                <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('map')}
                      className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
                    >
                      <MapIcon className="w-5 h-5" /> Map
                    </button>
                    <button 
                      onClick={() => handleScan(job.id)}
                      className="flex-[2] py-4 bg-slate-900 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 btn-primary-3d"
                    >
                      <Scan className="w-5 h-5" /> Verify & Complete
                    </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
      <div className="h-full relative w-full bg-slate-200">
         <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Neighborhood_Map_1002.svg')] bg-cover opacity-80 mix-blend-multiply"></div>
         <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-slate-900/80 to-transparent z-10 pt-12 pb-12">
            <h2 className="text-white font-bold text-xl drop-shadow-md">Route Navigation</h2>
            <p className="text-slate-300 text-sm">Follow the highlighted path</p>
         </div>

         {/* Mock Route Line */}
         <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60">
            <path d="M 100 200 Q 200 400 300 300" stroke="#0ea5e9" strokeWidth="5" fill="none" strokeDasharray="10 5" className="animate-pulse" />
         </svg>

         {/* Pins */}
         <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10">
             <div className="relative group">
                 <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white">
                     <Package className="w-5 h-5" />
                 </div>
                 <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-xs font-bold">Pickup</div>
             </div>
         </div>

         <div className="absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-10">
             <div className="relative group">
                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white animate-bounce">
                     <Navigation className="w-5 h-5" />
                 </div>
                 <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-xs font-bold">Dropoff</div>
             </div>
         </div>
         
         {/* Rider Location */}
         <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
             <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                 <Bike className="w-4 h-4 text-white" />
             </div>
         </div>

         <div className="absolute bottom-28 left-4 right-4 z-20">
             <div className="glass-panel bg-white/90 p-4 rounded-3xl shadow-2xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                     <Navigation className="w-6 h-6" />
                 </div>
                 <div className="flex-1">
                     <p className="text-[10px] text-slate-500 font-bold uppercase">Next Turn</p>
                     <h3 className="font-bold text-slate-900">Turn Right on Oak Ave</h3>
                     <p className="text-xs text-slate-500">200m away</p>
                 </div>
                 <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">3 min</p>
                    <p className="text-xs text-slate-500">Arrival</p>
                 </div>
             </div>
         </div>
      </div>
  );

  const renderEarnings = () => (
      <div className="p-4 space-y-6 pt-12 pb-24 animate-fade-in">
          <h2 className="text-2xl font-display font-bold text-slate-900">Earnings</h2>
          
          <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-4xl font-mono font-bold mb-6">$1,240.50</h3>
              <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-colors">Withdraw</button>
                  <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold backdrop-blur-md transition-colors">Details</button>
              </div>
          </div>

          <div className="space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" /> Recent Activity
              </h3>
              {[1,2,3,4].map(i => (
                  <div key={i} className="glass-card p-4 rounded-2xl flex items-center justify-between bg-white/60">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                              <Package className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="font-bold text-slate-900 text-sm">Delivery #{4000+i}</p>
                              <p className="text-xs text-slate-400">Today, 2:30 PM</p>
                          </div>
                      </div>
                      <span className="font-mono font-bold text-emerald-600">+$12.50</span>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderProfile = () => (
      <div className="p-4 space-y-6 pt-12 pb-24 animate-fade-in">
          <div className="text-center">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto mb-4 relative">
                  <img src="https://i.pravatar.cc/150?u=rider_alex" className="w-full h-full rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Alex Rider</h2>
              <p className="text-slate-500">Pro Member • 4.9 <Star className="w-3 h-3 inline fill-amber-400 text-amber-400" /></p>
          </div>

          <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
                  <p className="text-2xl font-bold text-slate-900">1,204</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Deliveries</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
                  <p className="text-2xl font-bold text-slate-900">98%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Completion Rate</p>
              </div>
          </div>

          <div className="bg-white rounded-[2rem] p-2 shadow-sm">
              {[
                  { icon: Settings, label: 'Preferences' },
                  { icon: History, label: 'Ride History' },
                  { icon: Shield, label: 'Insurance & Safety' },
                  { icon: Bell, label: 'Notifications' },
              ].map((item, i) => (
                  <button key={i} className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                      <div className="w-10 h-10 bg-slate-50 group-hover:bg-white rounded-xl flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shadow-inner">
                          <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700 flex-1">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                  </button>
              ))}
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-slate-800 font-sans relative overflow-hidden flex flex-col">
      <div 
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {activeTab === 'home' && renderHome()}
        {activeTab === 'map' && renderMap()}
        {activeTab === 'earnings' && renderEarnings()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      {/* Floating Scroll Buttons */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2 pointer-events-none">
        <button 
            onClick={scrollToTop} 
            className={`p-3 bg-slate-900 text-white rounded-full shadow-lg transition-all transform pointer-events-auto hover:bg-slate-800 active:scale-95 ${showScrollTop ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
        <button 
            onClick={scrollToBottom} 
            className={`p-3 bg-white/80 backdrop-blur text-slate-900 border border-white rounded-full shadow-lg transition-all transform pointer-events-auto hover:bg-white active:scale-95 ${showScrollBottom ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
        >
            <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 px-6 py-3 flex justify-between items-center z-40 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
         <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-slate-900' : 'text-slate-400'}`}>
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Home</span>
         </button>
         <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'map' ? 'text-slate-900' : 'text-slate-400'}`}>
            <MapIcon className={`w-6 h-6 ${activeTab === 'map' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Map</span>
         </button>
         <div className="w-12"></div> {/* Spacing for Floating Scan Button if needed later, or center styling */}
         <button onClick={() => setActiveTab('earnings')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'earnings' ? 'text-slate-900' : 'text-slate-400'}`}>
            <DollarSign className={`w-6 h-6 ${activeTab === 'earnings' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Earnings</span>
         </button>
         <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'}`}>
            <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Profile</span>
         </button>
         
         {/* Center Scan Button Floating */}
         <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button onClick={() => setActiveTab('home')} className="bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-xl shadow-slate-900/30 transition-transform hover:scale-105 active:scale-95 border-4 border-[#f0f4f8]">
                <Package className="w-6 h-6" />
            </button>
         </div>
      </nav>

      {/* Scanner Overlay */}
      {activeScanner && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center">
           <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
              <h3 className="font-display font-bold text-xl flex items-center gap-2 text-white">
                 <Scan className="w-6 h-6 text-primary" /> SCANNER
              </h3>
              <button onClick={() => setActiveScanner(null)} className="text-white/60 border border-white/20 px-4 py-2 rounded-full uppercase text-xs font-bold hover:bg-white/10 transition-colors">Close</button>
           </div>

           <div className="relative w-full max-w-sm aspect-square bg-slate-800 overflow-hidden rounded-[2.5rem] shadow-2xl animate-float border border-white/10">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/600/600?grayscale')] opacity-60 bg-cover bg-center mix-blend-overlay"></div>
              
              <div className="absolute inset-8 border-2 border-white/30 rounded-3xl flex items-center justify-center">
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl shadow-[0_0_15px_#0ea5e9]"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl shadow-[0_0_15px_#0ea5e9]"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl shadow-[0_0_15px_#0ea5e9]"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl shadow-[0_0_15px_#0ea5e9]"></div>
                 
                 <div className="w-full h-1 bg-white/80 shadow-[0_0_20px_white] animate-scan absolute"></div>

                 {scanResult === 'success' && <CheckCircle className="w-24 h-24 text-emerald-400 animate-pulse relative z-20 drop-shadow-2xl" />}
                 {scanResult === 'fail' && <AlertTriangle className="w-24 h-24 text-rose-400 animate-pulse relative z-20 drop-shadow-2xl" />}
              </div>
           </div>

           <p className="text-white/70 text-sm mt-8 font-medium tracking-wide">Align Patient QR Code within frame</p>

           <div className="mt-8 flex gap-4 w-full max-w-sm px-6">
              <button onClick={() => simulateScanAction(false)} className="flex-1 py-4 bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold rounded-2xl hover:bg-rose-500/30 transition-colors btn-primary-3d backdrop-blur-md">Simulate Fail</button>
              <button onClick={() => simulateScanAction(true)} className="flex-1 py-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold rounded-2xl hover:bg-emerald-500/30 transition-colors btn-primary-3d backdrop-blur-md">Simulate Success</button>
           </div>
        </div>
      )}
    </div>
  );
};