import React, { useState, useEffect, useRef } from 'react';
import { Doctor, Pharmacy, Lab, InsuranceProvider, Post, UserRole, Review, Specialist, PostMedia, LiveSession } from '../types';
import { VideoConsultation } from './VideoConsultation';
import { AIAssistant } from './AIAssistant';
import { 
  Calendar, 
  Video, 
  Pill, 
  TestTube, 
  Upload, 
  MapPin, 
  Star,
  StarHalf,
  QrCode,
  X,
  Activity,
  Zap,
  Home,
  ChevronRight,
  Bell,
  Clock,
  Search,
  ShieldCheck,
  CreditCard,
  Check,
  Users,
  Heart,
  MessageCircle,
  Send,
  DollarSign,
  BadgeCheck,
  Stethoscope,
  ArrowUp,
  ArrowDown,
  Info,
  Image as ImageIcon,
  Brain,
  FileUp,
  ClipboardList,
  List,
  LayoutGrid,
  ShoppingBag,
  MessageSquare,
  Radio,
  Coffee,
  Sparkles,
  SlidersHorizontal,
  MessageCircleQuestion,
  User,
  Settings,
  CreditCard as CardIcon,
  Plus,
  Trash2,
  Lock,
  ArrowLeft,
  Phone,
  FileText,
  Truck,
  Loader2
} from 'lucide-react';

const MOCK_DOCTORS: Doctor[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Wilson', 
    handle: '@dr_sarah',
    specialty: 'General Practitioner', 
    rating: 4.9, 
    available: true, 
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=500', 
    coverImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1000',
    location: '123 Health Ave, Downtown',
    price: 45.00,
    followers: '12.4k Followers',
    verified: true,
    bio: 'Dedicated General Practitioner focusing on preventive care and holistic health. I believe in treating the person, not just the symptoms.',
    coordinates: { x: 45, y: 30 },
    gallery: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400'
    ],
    reviews: [
      { id: 'r1', author: 'Jane D.', rating: 5, text: 'Dr. Sarah is incredibly patient and kind. Highly recommended!', date: '2 days ago' },
    ]
  },
  { 
    id: '2', 
    name: 'Dr. James Chen', 
    handle: '@heart_doc',
    specialty: 'Cardiologist', 
    rating: 5.0, 
    available: false, 
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500', 
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    location: 'Heart Center, 4th Floor',
    price: 120.00,
    followers: '8.9k Followers',
    verified: true,
    bio: 'Expert in arrhythmia and heart health management. Former Chief Resident at Mayo Clinic.',
    coordinates: { x: 60, y: 55 },
    reviews: []
  },
  { 
    id: '3', 
    name: 'Dr. Emily Okafor', 
    handle: '@skin_emily',
    specialty: 'Dermatologist', 
    rating: 4.7, 
    available: true, 
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500', 
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0833860?auto=format&fit=crop&q=80&w=1000',
    location: 'West Clinic, Suite 202',
    price: 85.00,
    followers: '45.2k Followers',
    verified: true,
    bio: 'Helping you achieve your best skin. Specializing in acne treatments.',
    coordinates: { x: 25, y: 40 },
    gallery: [],
    reviews: []
  },
  { 
    id: '4', 
    name: 'Dr. Alan Grant', 
    handle: '@kids_doc',
    specialty: 'Pediatrician', 
    rating: 4.8, 
    available: true, 
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500', 
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000',
    location: 'City Hospital, Pediatrics Wing',
    price: 60.00,
    followers: '15.1k Followers',
    verified: true,
    bio: 'Caring for your little ones with patience and expertise.',
    coordinates: { x: 75, y: 20 },
    reviews: []
  },
];

const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: 's1',
    name: 'Alex Motion',
    serviceType: 'Physiotherapist',
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000',
    location: 'Motion Studio, Downtown',
    price: 65.00,
    followers: '5.2k',
    verified: true,
    bio: 'Helping you regain mobility and strength through personalized physiotherapy sessions.',
    handle: '@physio_alex',
    offersHomeVisit: true,
    offersVideo: true,
    offersProducts: false
  }
];

const MOCK_PHARMACIES: Pharmacy[] = [
  { 
    id: 'p1', 
    name: 'HealthPlus', 
    handle: '@healthplus',
    distance: '0.5km', 
    priceEstimate: 45.00, 
    deliveryFee: 5.00,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    verified: true,
    waitTime: '5 mins',
    status: 'Open',
    coordinates: { x: 50, y: 50 },
    bio: 'Trusted community pharmacy providing prescription medications.'
  },
  { 
    id: 'p2', 
    name: 'City Meds', 
    handle: '@citymeds',
    distance: '1.2km', 
    priceEstimate: 42.50, 
    deliveryFee: 7.50,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1000',
    rating: 4.5,
    verified: true,
    waitTime: 'Busy (20m)',
    status: 'Busy',
    coordinates: { x: 30, y: 25 },
    bio: 'Full-service pharmacy with quick delivery.'
  },
];

const MOCK_LABS: Lab[] = [
  { 
    id: 'l1', 
    name: 'Synlab Central', 
    handle: '@synlab',
    distance: '1.5km', 
    testsAvailable: ['Blood Count', 'Urinalysis', 'Lipid Profile'],
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    verified: true,
    waitTime: '15 mins',
    status: 'Open',
    coordinates: { x: 70, y: 40 },
    bio: 'Advanced diagnostic laboratory with fast turnaround.'
  },
];

const OrderMedicationModal = ({ pharmacy, onClose, onConfirm }: { pharmacy: Pharmacy; onClose: () => void; onConfirm: () => void }) => {
    const [step, setStep] = useState(1);
    const [uploading, setUploading] = useState(false);
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => { setUploading(false); setStep(2); }, 1500);
    };

    const addItem = () => { if (newItem.trim()) { setItems(prev => [...prev, newItem.trim()]); setNewItem(''); } };

    return (
        <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white/95 glass-panel w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-float-up" onClick={e => e.stopPropagation()}>
                <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Order from {pharmacy.name}</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Step {step} of 2</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-xl text-slate-400 shadow-sm border border-slate-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500"><FileText className="w-10 h-10" /></div>
                                <h3 className="font-bold text-slate-800">Upload Prescription</h3>
                                <p className="text-xs text-slate-500 mt-2">Required for clinical medication orders.</p>
                            </div>
                            <button onClick={handleUpload} className="w-full py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/40 hover:bg-slate-50 transition-all">
                                {uploading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <Upload className="w-8 h-8" />}
                                <span className="font-bold text-sm">{uploading ? 'Processing...' : 'Click to Upload'}</span>
                            </button>
                            <button onClick={() => setStep(2)} className="w-full py-4 text-slate-500 font-bold text-xs hover:text-slate-800 transition-colors uppercase tracking-widest">Skip for non-clinical items</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex gap-2">
                                <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add item..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                <button onClick={addItem} className="p-3 bg-slate-900 text-white rounded-xl shadow-lg"><Plus className="w-5 h-5" /></button>
                            </div>
                            <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-hide">
                                {items.length > 0 ? items.map((it, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                        <span className="text-xs font-medium text-slate-700">{it}</span>
                                        <button onClick={() => setItems(prev => prev.filter((_, idx) => idx !== i))}><Trash2 className="w-4 h-4 text-rose-400 hover:text-rose-600" /></button>
                                    </div>
                                )) : <div className="text-center py-6 text-slate-400 text-xs italic">No items added yet</div>}
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-4"><span className="text-xs font-bold text-slate-400 uppercase">Estimated Delivery</span><span className="text-sm font-bold text-emerald-600">{pharmacy.waitTime}</span></div>
                                <button onClick={onConfirm} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 active:scale-95 transition-transform"><Truck className="w-5 h-5" /> Confirm Delivery Order</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BookingModal = ({ doctor, onClose, onConfirm, initialDate }: { doctor: Doctor; onClose: () => void; onConfirm: () => void; initialDate: Date | null; insurance: InsuranceProvider | null }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white glass-panel w-full max-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-float-up" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center"><h2 className="text-xl font-bold text-slate-900">Book Appointment</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button></div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"><img src={doctor.image} className="w-14 h-14 rounded-xl object-cover shadow-sm" /><div><p className="font-bold text-slate-900">{doctor.name}</p><p className="text-xs text-slate-500 font-medium">{doctor.specialty}</p></div></div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {getNextDays(7).map((day, i) => (
                <button key={i} onClick={() => setSelectedDate(day.fullDate)} className={`flex flex-col items-center p-3 min-w-[65px] rounded-2xl border transition-all ${selectedDate.toDateString() === day.fullDate.toDateString() ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}><span className="text-[10px] uppercase font-bold mb-1 opacity-70">{day.dayName}</span><span className="text-lg font-bold">{day.dayNumber}</span></button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Time</p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(slot => (
                <button key={slot} onClick={() => setSelectedTime(slot)} className={`py-2.5 px-3 text-[10px] font-bold rounded-xl border transition-all ${selectedTime === slot ? 'bg-sky-500 border-sky-500 text-white shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}>{slot}</button>
              ))}
            </div>
          </div>
          <button onClick={onConfirm} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold mt-4 shadow-xl shadow-slate-900/20 active:scale-95 transition-transform hover:bg-slate-800">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

type AnyProvider = Doctor | Pharmacy | Lab | InsuranceProvider | Specialist;

const IconGlassDoctor = () => (
  <div className="w-10 h-10 relative group perspective-1000">
    <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl group-hover:bg-sky-500/40 transition-all duration-500"></div>
    <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/50 shadow-glass animate-float flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 overflow-hidden"><Stethoscope className="w-5 h-5 text-sky-600 drop-shadow-lg relative z-10" /></div>
  </div>
);

const IconGlassPharmacy = () => (
  <div className="w-10 h-10 relative group perspective-1000">
    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/40 transition-all duration-500"></div>
    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/50 shadow-glass animate-float flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-500 overflow-hidden"><Pill className="w-5 h-5 text-emerald-600 drop-shadow-lg relative z-10" /></div>
  </div>
);

const IconGlassLab = () => (
  <div className="w-10 h-10 relative group perspective-1000">
    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/40 transition-all duration-500"></div>
    <div className="relative w-full h-full rounded-xl rotate-45 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/50 shadow-glass animate-float flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 overflow-hidden"><div className="-rotate-45 relative z-10"><TestTube className="w-5 h-5 text-purple-600 drop-shadow-lg" /></div></div>
  </div>
);

const getNextDays = (count: number, startDate?: Date) => {
  const days = [];
  const today = startDate || new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({ dayName: i === 0 && !startDate ? 'Today' : i === 1 && !startDate ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' }), dayNumber: d.getDate(), fullDate: d });
  }
  return days;
};

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const DeliveryQR = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
        <div className="glass-panel p-8 rounded-3xl shadow-2xl w-full max-sm text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 via-rose-400 to-emerald-400"></div>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">My Patient ID</h2>
            <p className="text-slate-500 text-xs mb-8">Scan this code for verification</p>
            <div className="bg-white p-4 rounded-2xl shadow-inner border border-slate-100 inline-block mb-8 relative group"><QrCode className="w-48 h-48 text-slate-900" /><div className="absolute inset-0 border-4 border-slate-900/10 rounded-xl"></div><div className="absolute top-4 left-4 right-4 h-0.5 bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-scan opacity-50"></div></div>
            <div className="flex items-center justify-center gap-3 text-slate-400 text-xs font-mono bg-slate-50 py-3 rounded-xl border border-slate-100"><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>VERIFIED ID</span></div>
            <button onClick={onClose} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">Close</button>
        </div>
    </div>
);

const ChatModal = ({ provider, onClose }: { provider: AnyProvider; onClose: () => void }) => {
    const [msg, setMsg] = useState('');
    const [history, setHistory] = useState([{ role: 'model', text: `Hello! This is ${provider.name}. How can we help you today?` }]);
    const send = () => {
      if (!msg.trim()) return;
      setHistory(prev => [...prev, { role: 'user', text: msg }]);
      setMsg('');
      setTimeout(() => { setHistory(prev => [...prev, { role: 'model', text: "Thank you for your inquiry. A representative will get back to you shortly." }]); }, 1000);
    };
    return (
      <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
         <div className="bg-white glass-panel w-full sm:w-[450px] h-[80vh] sm:h-[600px] sm:rounded-[2rem] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-float-up" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
               <img src={provider.image} className="w-10 h-10 rounded-full object-cover" />
               <div className="flex-1"><h3 className="font-bold text-slate-900 text-sm">{provider.name}</h3><p className="text-[10px] text-emerald-500 font-bold uppercase">Online</p></div>
               <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
               {history.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-sm ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>{m.text}</div>
                  </div>
               ))}
            </div>
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
               <input type="text" value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." className="flex-1 bg-slate-50 rounded-xl px-4 py-2 text-sm border-none focus:ring-2 focus:ring-sky-500/20" />
               <button onClick={send} className="p-2 bg-sky-500 text-white rounded-xl shadow-lg shadow-sky-500/20"><Send className="w-5 h-5" /></button>
            </div>
         </div>
      </div>
    );
};

interface ProviderCardProps { 
  provider: AnyProvider;
  type: 'doctor' | 'pharmacy' | 'lab' | 'insurance' | 'specialist';
  image: string;
  coverImage: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  statusBadge?: React.ReactNode;
  rating: number;
  actionButton: React.ReactNode;
  backDetails: React.ReactNode;
  isFlipped: boolean;
  onFlip: (id: string, e?: React.MouseEvent) => void;
  onOpenProfile: (provider: AnyProvider, e?: React.MouseEvent) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, e?: React.MouseEvent) => void;
  followers?: string;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ 
  provider, image, title, subtitle, statusBadge, rating, actionButton, backDetails, isFlipped, onFlip: onFlipProp, onOpenProfile, isFavorite, onToggleFavorite
}) => {
  const handleFlip = (id: string, e?: React.MouseEvent) => { onFlipProp(id, e); };
  const renderStars = (r: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (r >= i) stars.push(<Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-500 fill-amber-500" />);
      else if (r >= i - 0.5) stars.push(<StarHalf key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-500 fill-amber-500" />);
      else stars.push(<Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-200" />);
    }
    return stars;
  };

  return (
    <div className="relative aspect-[1/1.05] group perspective-1000">
       <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] rounded-[1.25rem]" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
         <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[1.25rem] overflow-hidden bg-white shadow-card border border-slate-100 cursor-pointer" onClick={(e) => handleFlip(provider.id, e)}>
            <img src={image} className="w-full h-full object-cover transition-transform duration-700 img-enhance group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent"></div>
            <div className="absolute top-2 left-2 right-2 flex justify-end items-center z-20">
                {onToggleFavorite && (<button onClick={(e) => onToggleFavorite(provider.id, e)} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-rose-500/20 transition-colors group/fav"><Heart className={`w-3 h-3 md:w-4 md:h-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white group-hover/fav:text-rose-400'}`} /></button>)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white"><div className="flex items-center gap-1 mb-0.5">{statusBadge}</div><h3 className="font-bold text-[10px] md:text-xs lg:text-sm leading-tight truncate tracking-tight mb-0">{title}</h3><p className="text-[7px] md:text-[10px] lg:text-xs text-slate-300 truncate font-medium">{subtitle}</p></div>
         </div>
         <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-[1.25rem] p-2 md:p-3 flex flex-col shadow-xl border border-slate-100 overflow-hidden cursor-pointer" onClick={(e) => handleFlip(provider.id, e)}>
             <div className="flex gap-2 mb-1.5 pb-1.5 border-b border-slate-100 shrink-0 items-start">
                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg p-0.5 border border-slate-100 shrink-0 shadow-sm bg-slate-50 overflow-hidden"><img src={image} className="w-full h-full rounded object-cover" /></div>
                 <div className="flex-1 min-w-0 flex flex-col justify-center h-8 md:h-10"><h4 className="text-[9px] md:text-xs lg:text-sm font-bold text-slate-900 leading-tight mb-0 truncate">{provider.name}</h4><div className="flex items-center gap-0.5">{renderStars(rating)}</div></div>
             </div>
             <div className="flex-1 flex flex-col items-start px-0.5 overflow-hidden py-0.5">{backDetails && (<div className="w-full bg-slate-50/80 rounded-lg p-1 border border-slate-100 mb-1.5 text-left shadow-sm shrink-0">{backDetails}</div>)}<div className="w-full"><p className="text-[8px] md:text-[10px] lg:text-xs text-slate-600 leading-tight font-medium line-clamp-3 text-left">{(provider as any).bio || "Available for quality healthcare services."}</p></div></div>
             <div className="mt-auto flex gap-1 shrink-0 pt-1.5 border-t border-slate-50"><div className="flex-1 min-w-0">{actionButton}</div><button onClick={(e) => onOpenProfile(provider, e)} className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[8px] md:text-[10px] lg:text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 min-w-0 truncate shadow-sm">Profile</button></div>
         </div>
       </div>
    </div>
  );
};

const FullProfileModal = ({ provider, onClose, onChat }: { provider: AnyProvider; onClose: () => void; onSubmitReview: (id: string, text: string, rating: number) => void; onChat: (provider: AnyProvider) => void }) => {
  const isDoc = 'specialty' in provider;
  const isSpec = 'serviceType' in provider;
  const isPharm = 'priceEstimate' in provider;
  const isLab = 'testsAvailable' in provider;
  const subtitle = isDoc ? (provider as Doctor).specialty : isSpec ? (provider as Specialist).serviceType : isPharm ? 'Pharmacy' : isLab ? 'Laboratory' : 'Healthcare Provider';
  const gallery = (provider as any).gallery || [];
  return (
    <div className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-md flex justify-end sm:justify-center items-end sm:items-center" onClick={onClose}>
        <div className="bg-white/90 glass-panel w-full sm:w-[450px] md:w-[600px] h-[85vh] sm:h-[750px] sm:rounded-3xl rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-float-up" onClick={e => e.stopPropagation()}>
           <div className="h-48 md:h-64 relative shrink-0"><img src={provider.coverImage || provider.image} className="w-full h-full object-cover img-enhance" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div><button onClick={onClose} className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full backdrop-blur-md border border-white/20"><X className="w-5 h-5" /></button><div className="absolute -bottom-10 left-6 w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white overflow-hidden shadow-lg"><img src={provider.image} className="w-full h-full object-cover img-enhance" /></div></div>
           <div className="pt-12 md:pt-16 px-6 md:px-8 pb-6 flex-1 overflow-y-auto"><div className="flex justify-between items-start mb-2"><div><h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{provider.name} {(provider as any).verified && <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-sky-500 inline-block" />}</h2><p className="text-sm md:text-base text-slate-500 font-medium">{subtitle}</p></div><div className="flex flex-col items-end"><div className="flex items-center gap-1 bg-amber-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-amber-100"><Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 fill-amber-500" /><span className="font-bold text-slate-900 md:text-lg">{provider.rating}</span></div></div></div><div className="flex gap-4 my-6 md:my-8 border-b border-slate-200/50 pb-6 md:pb-8"><div className="text-center flex-1 border-r border-slate-200/50 last:border-0"><p className="text-lg md:text-xl font-bold text-slate-900">{(provider as any).followers || '12.4k Followers'}</p><p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">Followers</p></div><div className="text-center flex-1"><p className="text-lg md:text-xl font-bold text-slate-900">1k+</p><p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">Patients</p></div></div><div className="space-y-6 md:space-y-8"><div><h3 className="font-bold text-slate-900 text-sm md:text-base mb-2">About</h3><p className="text-sm md:text-base text-slate-600 leading-relaxed">{(provider as any).bio || "No biography available for this provider."}</p></div>{gallery.length > 0 && (<div><h3 className="font-bold text-slate-900 text-sm md:text-base mb-3">Gallery</h3><div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">{gallery.map((img: string, idx: number) => (<div key={idx} className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-200"><img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover img-enhance" /></div>))}</div></div>)}</div></div>
           <div className="p-4 md:p-6 border-t border-slate-200 bg-white/90 backdrop-blur-md flex gap-3"><button onClick={() => onChat(provider)} className="flex-1 py-3 md:py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors md:text-lg flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Message</button>{(provider as Specialist).offersHomeVisit ? (<button className="flex-[2] py-3 md:py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 md:text-lg"><Home className="w-4 h-4 md:w-5 md:h-5" /> Book Home Visit</button>) : (<button className="flex-[2] py-3 md:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 md:text-lg">Book Service</button>)}</div>
        </div>
    </div>
  );
};

const UserProfileModal = ({ onClose, favoriteIds, insurance, onOpenProvider }: { onClose: () => void; favoriteIds: string[]; insurance: InsuranceProvider | null, onOpenProvider: (p: AnyProvider) => void }) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'history' | 'payments' | 'favorites'>('info');
  const historyData = [{ type: 'Booking', title: 'Consultation', provider: 'Dr. Sarah Wilson', amount: '$45.00', date: 'Oct 12, 2023', status: 'Completed' }, { type: 'Transaction', title: 'Medication', provider: 'HealthPlus Pharmacy', amount: '$32.00', date: 'Oct 15, 2023', status: 'Paid' }, { type: 'Booking', title: 'Blood Test', provider: 'Synlab Central', amount: '$20.00', date: 'Oct 18, 2023', status: 'Completed' }];
  const favoriteDocs = MOCK_DOCTORS.filter(d => favoriteIds.includes(d.id));
  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/80 backdrop-blur-xl flex flex-col sm:items-center sm:justify-center animate-fade-in" onClick={onClose}><div className="bg-white/95 glass-panel w-full sm:w-[500px] h-full sm:h-[80vh] sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-float-up" onClick={e => e.stopPropagation()}><div className="p-6 pb-4 flex justify-between items-center bg-slate-50/50 border-b border-slate-100"><div className="flex items-center gap-4"><div className="relative"><img src="https://i.pravatar.cc/150?u=patient_john" className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-xl" /><div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div></div><div><h2 className="text-xl font-bold text-slate-900">John Doe</h2><p className="text-xs text-slate-500 font-medium">Verified Patient • New York, NY</p></div></div><button onClick={onClose} className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100"><X className="w-5 h-5" /></button></div><div className="flex px-4 py-3 bg-white border-b border-slate-100 gap-2 overflow-x-auto scrollbar-hide">{[{ id: 'info', label: 'Profile', icon: User }, { id: 'history', label: 'History', icon: ClipboardList }, { id: 'payments', label: 'Payments', icon: CardIcon }, { id: 'favorites', label: 'Favorites', icon: Heart }].map(tab => (<button key={tab.id} onClick={() => setActiveSubTab(tab.id as any)} className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeSubTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>))}</div><div className="flex-1 overflow-y-auto p-6">{activeSubTab === 'info' && (<div className="space-y-6 animate-fade-in"><div className="grid grid-cols-2 gap-4"><div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Blood Group</p><p className="text-lg font-bold text-slate-800">O+</p></div><div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Insurance</p><p className="text-lg font-bold text-slate-800">{insurance?.planName || 'None'}</p></div></div><div className="space-y-4"><div className="group"><label className="block text-[10px] text-slate-400 font-bold uppercase mb-2 ml-1">Email Address</label><div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all"><Send className="w-4 h-4 text-slate-400" /><input type="text" defaultValue="john.doe@example.com" className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 w-full" /></div></div><div className="group"><label className="block text-[10px] text-slate-400 font-bold uppercase mb-2 ml-1">Phone Number</label><div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all"><Phone className="w-4 h-4 text-slate-400" /><input type="text" defaultValue="+1 234 567 890" className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 w-full" /></div></div></div></div>)}{activeSubTab === 'history' && (<div className="space-y-3 animate-fade-in">{historyData.map((item, idx) => (<div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all"><div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'Booking' ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'}`}>{item.type === 'Booking' ? <Calendar className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}</div><div><h4 className="font-bold text-slate-900 text-sm">{item.title}</h4><p className="text-[10px] text-slate-500">{item.provider} • {item.date}</p></div></div><div className="text-right"><p className="font-bold text-slate-900 text-sm">{item.amount}</p><span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">{item.status}</span></div></div>))}</div>)}{activeSubTab === 'favorites' && (<div className="space-y-3 animate-fade-in">{favoriteDocs.length > 0 ? favoriteDocs.map(doc => (<div key={doc.id} onClick={() => onOpenProvider(doc)} className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group"><img src={doc.image} className="w-12 h-12 rounded-xl object-cover" /><div className="flex-1"><h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{doc.name}</h4><p className="text-[10px] text-slate-500">{doc.specialty}</p></div><div className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /><span className="text-xs font-bold text-slate-700">{doc.rating}</span></div></div>)) : (<div className="text-center py-10 opacity-40"><Heart className="w-10 h-10 mx-auto mb-2" /><p className="text-sm font-bold">No favorites yet</p></div>)}</div>)}</div><div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3"><button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"><Settings className="w-4 h-4" /> Settings</button><button className="flex-1 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"><Lock className="w-4 h-4" /> Logout</button></div></div></div>
  );
};

export const PatientView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creators' | 'feed' | 'insurance' | 'history'>('creators');
  const [activeCategory, setActiveCategory] = useState<'doctors' | 'pharmacies' | 'labs' | 'insurance' | 'specialists'>('doctors');
  const [showQR, setShowQR] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [orderingPharmacy, setOrderingPharmacy] = useState<Pharmacy | null>(null);
  const [userLocation, setUserLocation] = useState<string>('Locating...');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy] = useState<InsuranceProvider | null>(null); 
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>({});
  const [viewingProfile, setViewingProfile] = useState<AnyProvider | null>(null);
  const [chattingWith, setChattingWith] = useState<AnyProvider | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '4']); 
  const [notification, setNotification] = useState<string | null>(null);
  
  const [doctorsList] = useState<Doctor[]>(MOCK_DOCTORS);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setUserLocation('New York, NY'), 1000); }, []);
  const handleScroll = () => { if (mainRef.current) { /* scroll logic */ } };
  const handleFlip = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setFlippedItems(prev => ({ ...prev, [id]: !prev[id] })); };
  const openProfile = (provider: AnyProvider, e?: React.MouseEvent) => { e?.stopPropagation(); setViewingProfile(provider); };
  const toggleFavorite = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setFavoriteIds(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id] ); };
  const handleReviewSubmit = () => { /* logic */ };
  const filteredDoctors = doctorsList.filter(doc => { const q = searchQuery.toLowerCase(); return doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q); });
  const sortedDoctors = [...filteredDoctors].sort((a, b) => { if (a.available !== b.available) return a.available ? -1 : 1; return b.rating - a.rating; });
  const VerifiedBadge = () => <BadgeCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-sky-500 fill-sky-100 inline-block ml-0.5" />;
  const handleServiceSelect = (category: 'doctors' | 'pharmacies' | 'labs' | 'insurance' | 'specialists') => { setActiveCategory(category); setActiveTab('creators'); setShowServicesModal(false); };

  const ServicesModal = () => (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white/90 glass-panel w-full max-w-sm md:max-w-md rounded-[2.5rem] shadow-2xl p-6 relative overflow-hidden animate-float-up">
            <div className="flex justify-between items-center mb-6 pl-2"><div><h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Start Here</h2><p className="text-xs md:text-sm text-slate-500 font-medium">Choose a service to proceed</p></div><button onClick={() => setShowServicesModal(false)} className="p-2 bg-white/50 rounded-full text-slate-400 hover:text-slate-600 backdrop-blur-md"><X className="w-5 h-5 md:w-6 md:h-6" /></button></div>
            <div className="grid gap-3 h-[400px] md:h-[500px] overflow-y-auto scrollbar-hide pb-10">
                <button onClick={() => { setShowAI(true); setShowServicesModal(false); }} className="bg-white/60 p-4 md:p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 text-left transition-all hover:scale-[1.02] group backdrop-blur-sm"><div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-teal-50 flex items-center justify-center"><Brain className="w-5 h-5 md:w-6 md:h-6 text-teal-500" /></div><div><h3 className="font-bold text-slate-900 text-sm md:text-base">AI Health Assistant</h3><p className="text-[10px] md:text-xs text-slate-500">Chat with MediBot.</p></div></button>
                <button onClick={() => handleServiceSelect('doctors')} className="bg-white/60 p-4 md:p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 text-left transition-all hover:scale-[1.02] group backdrop-blur-sm"><IconGlassDoctor /><div><h3 className="font-bold text-slate-900 text-sm md:text-base">Consultancy</h3><p className="text-[10px] md:text-xs text-slate-500">Speak to a doctor.</p></div></button>
                <button onClick={() => handleServiceSelect('pharmacies')} className="bg-white/60 p-4 md:p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 text-left transition-all hover:scale-[1.02] group backdrop-blur-sm"><IconGlassPharmacy /><div><h3 className="font-bold text-slate-900 text-sm md:text-base">Pharmacy</h3><p className="text-[10px] md:text-xs text-slate-500">Order medications.</p></div></button>
                <button onClick={() => handleServiceSelect('labs')} className="bg-white/60 p-4 md:p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 text-left transition-all hover:scale-[1.02] group backdrop-blur-sm"><IconGlassLab /><div><h3 className="font-bold text-slate-900 text-sm md:text-base">Lab Tests</h3><p className="text-[10px] md:text-xs text-slate-500">Book clinical tests.</p></div></button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen text-slate-800 overflow-hidden relative bg-[#f0f4f8]">
      <header className="px-4 py-3 md:py-4 z-20 bg-white/60 backdrop-blur-xl sticky top-0 border-b border-white/50 transition-all duration-300">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center shrink-0"><button onClick={() => setShowProfileModal(true)} className="relative group focus:outline-none"><img src="https://i.pravatar.cc/150?u=patient_john" className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-white shadow-xl group-hover:scale-105 transition-transform" alt="Profile" /><div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div></button><div className="hidden md:block ml-3"><h1 className="md:text-lg lg:text-xl font-bold text-slate-900 leading-tight">John Doe</h1><div className="flex items-center gap-1 text-[10px] md:text-xs lg:text-sm text-slate-500 font-medium mt-1"><MapPin className="w-3 h-3 text-rose-500" />{userLocation}</div></div></div>
          <div className="flex-1 max-w-2xl"><div className="relative group"><div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none"><Search className="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-focus-within:text-primary transition-colors" /></div><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search doctors, labs, meds..." className="block w-full bg-white/50 border border-white/60 rounded-2xl pl-10 pr-10 md:pl-12 md:pr-12 py-2 md:py-3 text-xs md:text-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all" /><button className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-slate-400 hover:text-slate-600 active:scale-95 transition-all"><SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" /></button></div></div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0"><button onClick={() => setShowQR(true)} className="hidden sm:flex p-2 md:p-3 bg-white/50 rounded-full text-slate-600 border border-white/60 shadow-sm transition-all active:scale-95"><QrCode className="w-5 h-5 md:w-6 md:h-6" /></button><button className="p-2 md:p-3 bg-white/50 rounded-full text-slate-600 border border-white/60 shadow-sm transition-all active:scale-95"><Bell className="w-5 h-5 md:w-6 md:h-6" /></button></div>
        </div>
      </header>

      <main ref={mainRef} onScroll={handleScroll} className="flex-1 overflow-y-auto overflow-x-hidden pb-24 relative z-0 scroll-smooth">
        {activeTab === 'creators' && (
          <div className="px-3 py-4 md:px-6 md:py-10 animate-fade-in max-w-[2200px] mx-auto">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6 lg:gap-8">
                {activeCategory === 'doctors' && sortedDoctors.map(doc => (
                    <ProviderCard key={doc.id} provider={doc} type="doctor" image={doc.image} coverImage={doc.coverImage} title={<>{doc.name} {doc.verified && <VerifiedBadge />}</>} subtitle={doc.specialty} rating={doc.rating} statusBadge={doc.available ? <span className="bg-emerald-500 text-white text-[7px] md:text-xs font-bold px-1.5 py-0.5 rounded-lg uppercase tracking-wide flex items-center gap-0.5"><span className="w-1 h-1 bg-white rounded-full animate-pulse"></span> Online</span> : <span className="bg-slate-300 text-slate-500 text-[7px] md:text-xs font-bold px-1.5 py-0.5 rounded-lg uppercase tracking-wide">Offline</span>} actionButton={<button onClick={(e) => { e.stopPropagation(); setBookingDoctor(doc); setBookingDate(new Date()); }} className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-[9px] md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-sky-500/10">${doc.price}</button>} backDetails={null} isFlipped={!!flippedItems[doc.id]} onFlip={handleFlip} onOpenProfile={openProfile} isFavorite={favoriteIds.includes(doc.id)} onToggleFavorite={toggleFavorite} />
                ))}
                {activeCategory === 'pharmacies' && MOCK_PHARMACIES.map(pharm => (
                    <ProviderCard key={pharm.id} provider={pharm} type="pharmacy" image={pharm.image} coverImage={pharm.coverImage} title={pharm.name} subtitle={`${pharm.distance} away`} rating={pharm.rating} statusBadge={<span className="bg-emerald-100 text-emerald-600 text-[7px] md:text-xs font-bold px-1.5 py-0.5 rounded-lg uppercase">{pharm.waitTime}</span>} actionButton={<div className="flex gap-1"><button onClick={(e) => {e.stopPropagation(); setChattingWith(pharm)}} className="p-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-primary transition-colors shadow-sm"><MessageCircle className="w-3.5 h-3.5" /></button><button onClick={(e) => {e.stopPropagation(); setOrderingPharmacy(pharm)}} className="flex-1 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] md:text-sm font-bold shadow-lg">Order</button></div>} backDetails={<div className="text-[8px] md:text-xs font-bold text-slate-500">Est. <span className="text-emerald-600">${pharm.priceEstimate}</span></div>} isFlipped={!!flippedItems[pharm.id]} onFlip={handleFlip} onOpenProfile={openProfile} />
                ))}
                {activeCategory === 'labs' && MOCK_LABS.map(lab => (
                    <ProviderCard key={lab.id} provider={lab} type="lab" image={lab.image} coverImage={lab.coverImage} title={lab.name} subtitle={`${lab.distance} away`} rating={lab.rating} statusBadge={<span className="bg-purple-100 text-purple-600 text-[7px] md:text-xs font-bold px-1.5 py-0.5 rounded-lg uppercase">Open</span>} actionButton={<div className="flex gap-1"><button onClick={(e) => {e.stopPropagation(); setChattingWith(lab)}} className="p-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-primary transition-colors shadow-sm"><MessageCircle className="w-3.5 h-3.5" /></button><button className="flex-1 py-1.5 bg-purple-600 text-white rounded-lg text-[9px] md:text-sm font-bold shadow-lg">Book</button></div>} backDetails={<div className="flex flex-wrap gap-0.5">{lab.testsAvailable.slice(0, 1).map(t => <span key={t} className="px-1 py-0.5 bg-rose-50 text-rose-600 text-[7px] font-bold rounded">{t}</span>)}</div>} isFlipped={!!flippedItems[lab.id]} onFlip={handleFlip} onOpenProfile={openProfile} />
                ))}
             </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-white/50 px-6 py-3 flex justify-between items-center z-50 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] lg:justify-center lg:gap-24">
         <button onClick={() => setActiveTab('creators')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'creators' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}><Home className="w-5 h-5 md:w-7 md:h-7" /></button>
         <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'feed' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}><Activity className="w-5 h-5 md:w-7 md:h-7" /></button>
         <div className="w-12 md:w-16"></div>
         <button onClick={() => setActiveTab('insurance')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'insurance' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}><ShieldCheck className="w-5 h-5 md:w-7 md:h-7" /></button>
         <button onClick={() => setShowQR(true)} className="flex flex-col items-center gap-1 transition-all text-slate-400 hover:text-slate-600 active:scale-95"><QrCode className="w-5 h-5 md:w-7 md:h-7" /></button>
         <div className="absolute left-1/2 -translate-x-1/2 -top-8"><button onClick={() => setShowServicesModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white p-4 md:p-6 rounded-full shadow-2xl shadow-slate-900/40 transition-transform hover:scale-110 active:scale-95 border-8 border-[#f0f4f8]"><LayoutGrid className="w-6 h-6 md:w-9 md:h-9" /></button></div>
      </nav>

      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} favoriteIds={favoriteIds} insurance={activePolicy} onOpenProvider={(p) => { setShowProfileModal(false); setViewingProfile(p); }} />}
      {viewingProfile && <FullProfileModal provider={viewingProfile} onClose={() => setViewingProfile(null)} onSubmitReview={handleReviewSubmit} onChat={(p) => { setViewingProfile(null); setChattingWith(p); }} />}
      {chattingWith && <ChatModal provider={chattingWith} onClose={() => setChattingWith(null)} />}
      {bookingDoctor && <BookingModal doctor={bookingDoctor} onClose={() => { setBookingDoctor(null); setBookingDate(null); }} onConfirm={() => { setBookingDoctor(null); setBookingDate(null); setNotification(`Appointment Confirmed!`); }} initialDate={bookingDate} insurance={activePolicy} />}
      {orderingPharmacy && <OrderMedicationModal pharmacy={orderingPharmacy} onClose={() => setOrderingPharmacy(null)} onConfirm={() => { setOrderingPharmacy(null); setNotification('Medication Order Placed!'); }} />}
      {showServicesModal && <ServicesModal />}
      {showAI && (<div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex flex-col justify-end sm:justify-center"><div className="bg-white/90 glass-panel w-full h-[90%] sm:h-[700px] md:h-[800px] sm:w-[450px] md:w-[600px] sm:mx-auto sm:rounded-[3rem] rounded-t-[3.5rem] shadow-2xl overflow-hidden flex flex-col animate-float-up"><div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-100 bg-slate-50/50"><h3 className="font-display font-bold text-xl md:text-3xl text-slate-800">MediBot AI</h3><button onClick={() => setShowAI(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-6 h-6 md:w-8 md:h-8 text-slate-500" /></button></div><div className="flex-1 overflow-hidden"><AIAssistant /></div></div></div>)}
      {showQR && <DeliveryQR onClose={() => setShowQR(false)} />}
      {notification && (<div className="fixed top-28 right-8 z-[130] bg-slate-900 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-float border border-white/10"><Check className="w-6 h-6 text-emerald-400" /><span className="text-base md:text-lg font-bold">{notification}</span></div>)}
    </div>
  );
};
