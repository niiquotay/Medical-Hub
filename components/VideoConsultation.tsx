
import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Activity, 
  Shield, 
  Maximize2, 
  User, 
  Settings,
  AlertCircle,
  Wifi,
  MoreHorizontal
} from 'lucide-react';

interface VideoConsultationProps {
  doctorName: string;
  onEndCall: () => void;
}

export const VideoConsultation: React.FC<VideoConsultationProps> = ({ doctorName, onEndCall }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    let timeout: number;
    
    const handleActivity = () => {
      setShowControls(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setShowControls(false), 5000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    handleActivity();

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col overflow-hidden animate-fade-in font-sans select-none">
      
      {/* Immersive Top Interface */}
      <div className={`absolute top-0 left-0 right-0 p-6 z-40 flex justify-between items-start bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent transition-all duration-700 ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></div>
                <span className="text-white font-mono text-sm font-bold tracking-wider">{formatTime(timer)}</span>
            </div>
            <div className="flex gap-2">
                {!micOn && (
                   <div className="flex items-center gap-2 bg-rose-500/20 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                      <MicOff className="w-3 h-3" /> Muted
                   </div>
                )}
                {!videoOn && (
                   <div className="flex items-center gap-2 bg-slate-500/20 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      <VideoOff className="w-3 h-3" /> Video Off
                   </div>
                )}
            </div>
         </div>

         <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 shadow-lg">
               <Shield className="w-3.5 h-3.5" /> Secure Consultation
             </div>
             <h2 className="text-xl md:text-3xl font-display font-bold text-white tracking-tight drop-shadow-2xl">{doctorName}</h2>
             <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">Medical Professional</p>
         </div>
      </div>

      {/* Primary Video Feed (Remote) */}
      <div className="flex-1 relative flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Remote Doctor Placeholder */}
        <div className="absolute inset-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1400" 
              alt="Doctor Stream" 
              className="w-full h-full object-cover opacity-90 brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20"></div>
        </div>
        
        {/* Remote Diagnostic Overlay */}
        <div className="absolute bottom-32 left-8 md:left-12 flex flex-col gap-4 animate-float">
             <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Heart Rate</p>
                    <p className="text-xl font-mono font-bold text-white">72 <span className="text-[10px] opacity-40">BPM</span></p>
                </div>
             </div>
        </div>

        {/* Local Self View (Picture-in-Picture) */}
        <div className="absolute bottom-32 right-8 md:right-12 w-32 h-44 md:w-56 md:h-72 bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl z-30 ring-1 ring-white/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
           {videoOn ? (
             <div className="relative w-full h-full group">
                <img src="https://i.pravatar.cc/400?u=patient_john" alt="Self Feed" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {!micOn && (
                   <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="p-4 bg-rose-600 rounded-full shadow-2xl animate-bounce">
                        <MicOff className="w-8 h-8 text-white" />
                      </div>
                   </div>
                )}
             </div>
           ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900 gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                    <User className="w-8 h-8 text-slate-600" />
                </div>
                <div className="text-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 block mb-1">Privacy Mode</span>
                    <span className="text-[8px] font-medium text-slate-700">Camera Disabled</span>
                </div>
             </div>
           )}
           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-bold text-white uppercase border border-white/5">YOU</div>
                {micOn && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                )}
           </div>
        </div>
      </div>

      {/* Call Controls HUD */}
      <div className={`absolute bottom-0 left-0 right-0 p-10 md:p-14 flex justify-center items-end bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent transition-all duration-700 ${showControls ? 'translate-y-0' : 'translate-y-12 opacity-0'}`}>
        <div className="flex items-center gap-4 md:gap-10 bg-white/5 backdrop-blur-3xl px-8 py-6 rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Audio Control */}
          <div className="flex flex-col items-center gap-3">
            <button 
                onClick={() => setMicOn(!micOn)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 flex items-center justify-center group ${micOn ? 'bg-white/10 text-white hover:bg-white hover:text-slate-950' : 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-110'}`}
                title={micOn ? 'Mute' : 'Unmute'}
            >
                {micOn ? <Mic className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110" /> : <MicOff className="w-6 h-6 md:w-7 md:h-7" />}
            </button>
            <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${micOn ? 'text-white/30' : 'text-rose-500'}`}>
                {micOn ? 'Mic On' : 'Muted'}
            </span>
          </div>

          {/* Video Control */}
          <div className="flex flex-col items-center gap-3">
            <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 flex items-center justify-center group ${videoOn ? 'bg-white/10 text-white hover:bg-white hover:text-slate-950' : 'bg-slate-700 text-white'}`}
                title={videoOn ? 'Stop Video' : 'Start Video'}
            >
                {videoOn ? <Video className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110" /> : <VideoOff className="w-6 h-6 md:w-7 md:h-7" />}
            </button>
            <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${videoOn ? 'text-white/30' : 'text-slate-500'}`}>
                {videoOn ? 'Cam On' : 'Cam Off'}
            </span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-12 bg-white/10 mx-2 md:mx-4"></div>

          {/* End Call Button */}
          <div className="flex flex-col items-center gap-3">
            <button 
                onClick={onEndCall}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-rose-600 text-white shadow-2xl shadow-rose-600/50 hover:scale-110 hover:bg-rose-500 active:scale-90 transition-all flex items-center justify-center ring-4 ring-rose-500/20"
                title="End Call"
            >
                <PhoneOff className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <span className="text-[8px] font-black uppercase tracking-widest text-rose-500">End Call</span>
          </div>

          {/* More Actions */}
          <div className="w-px h-12 bg-white/10 mx-2 md:mx-4"></div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 text-white hover:bg-sky-500 transition-all duration-300 flex items-center justify-center group">
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110" />
            </button>
            <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Chat</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 flex items-center justify-center group">
                <MoreHorizontal className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110" />
            </button>
            <span className="text-[8px] font-black uppercase tracking-widest text-white/30">More</span>
          </div>

        </div>
      </div>

      {/* Connection Quality Hint */}
      <div className={`absolute bottom-8 left-8 z-40 hidden lg:flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/5 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
         <Wifi className="w-4 h-4 text-emerald-500" />
         <div className="flex gap-0.5 items-end h-3">
            <div className="w-1 h-[40%] bg-emerald-500 rounded-full"></div>
            <div className="w-1 h-[70%] bg-emerald-500 rounded-full"></div>
            <div className="w-1 h-[100%] bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
         </div>
         <span className="text-[9px] font-black text-white/60 tracking-[0.1em] ml-1">HD QUALITY</span>
      </div>

    </div>
  );
};
