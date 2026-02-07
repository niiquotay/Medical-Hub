import React, { useState } from 'react';
import { UserRole } from './types';
import { PatientView } from './components/PatientView';
import { RiderView } from './components/RiderView';
import { VendorView } from './components/VendorView';
import { ShieldCheck, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.PATIENT);

  return (
    <div className="min-h-screen font-sans text-slate-900 overflow-hidden relative selection:bg-primary/20">
       {/* Premium Ambient Background Mesh */}
       <div className="fixed inset-0 z-0 bg-[#f0f4f8]">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-sky-200/40 rounded-full blur-[120px] mix-blend-multiply animate-float"></div>
          <div className="absolute top-[20%] right-[-20%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[120px] mix-blend-multiply"></div>
       </div>
      
      {/* Module Selector - Moved to Bottom */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[9999] group animate-fade-in">
        <div className="glass-dark px-1.5 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 transition-all hover:scale-105 cursor-pointer">
          <div className="bg-white/10 p-1.5 rounded-full text-emerald-400">
             <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="relative">
            <select 
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="appearance-none bg-transparent text-[10px] font-bold text-slate-200 focus:outline-none cursor-pointer uppercase tracking-wider pr-6 pl-1 py-1"
            >
              <option value={UserRole.PATIENT} className="text-slate-900">Patient View</option>
              <option value={UserRole.RIDER} className="text-slate-900">Rider View</option>
              <option value={UserRole.DOCTOR} className="text-slate-900">Doctor View</option>
              <option value={UserRole.PHARMACY} className="text-slate-900">Pharmacy View</option>
              <option value={UserRole.LAB} className="text-slate-900">Lab View</option>
              <option value={UserRole.SPECIALIST} className="text-slate-900">Specialist View</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <div className="relative z-10 h-full">
        {currentRole === UserRole.PATIENT && <PatientView />}
        
        {currentRole === UserRole.RIDER && <RiderView />}
        
        {(currentRole === UserRole.DOCTOR || currentRole === UserRole.PHARMACY || currentRole === UserRole.LAB || currentRole === UserRole.SPECIALIST) && (
          <VendorView role={currentRole} />
        )}
      </div>
      
    </div>
  );
};

export default App;