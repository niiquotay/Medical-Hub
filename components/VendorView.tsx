import React, { useState, useRef, useEffect } from 'react';
import { UserRole, Doctor, Pharmacy, Lab, Specialist, DeliveryJob } from '../types';
import { VideoConsultation } from './VideoConsultation';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Activity, 
  Clock, 
  CheckCircle, 
  X, 
  FileText, 
  Video, 
  Mic, 
  Phone, 
  MapPin, 
  Package, 
  Truck, 
  Search,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ClipboardList,
  Heart,
  Home,
  Image as ImageIcon,
  Plus,
  ArrowUp,
  ArrowDown,
  Radio,
  UserCheck,
  XCircle,
  Save,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  MoreHorizontal,
  Download,
  Play,
  Share2,
  LogOut,
  Navigation,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Upload,
  Eye,
  BadgeCheck,
  Send,
  MoreVertical
} from 'lucide-react';

interface VendorViewProps {
  role: UserRole;
  onLogout?: () => void;
}

interface VendorOrder {
    id: string;
    patientName: string;
    patientAvatar: string;
    timestamp: string;
    items: string[];
    type: 'delivery' | 'pickup';
    status: 'new' | 'preparing' | 'ready' | 'rider_assigned' | 'in_transit' | 'delivered';
    prescriptionUrl?: string;
    total?: number;
    rider?: {
        name: string;
        avatar: string;
        phone: string;
        status: string;
        location: string;
    };
}

interface ChatConversation {
    id: string;
    patientName: string;
    patientAvatar: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    online: boolean;
    messages: { id: string; sender: 'patient' | 'vendor'; text: string; time: string }[];
}

const MOCK_PHARMACY_REQUESTS: VendorOrder[] = [
    {
        id: 'ORD-101',
        patientName: 'John Doe',
        patientAvatar: 'https://i.pravatar.cc/150?u=patient_john',
        timestamp: '10 mins ago',
        items: ['Amoxicillin 500mg (10 tabs)', 'Panadol Extra (1 pack)'],
        type: 'delivery',
        status: 'new',
        prescriptionUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
        total: 45.50
    },
    {
        id: 'ORD-102',
        patientName: 'Sarah Smith',
        patientAvatar: 'https://i.pravatar.cc/150?u=patient_sarah',
        timestamp: '45 mins ago',
        items: ['Insulin Pen (2)', 'Blood Glucose Strips'],
        type: 'delivery',
        status: 'rider_assigned',
        total: 120.00,
        rider: {
            name: 'Alex Rider',
            avatar: 'https://i.pravatar.cc/150?u=rider_alex',
            phone: '+1 555-0123',
            status: 'Picked up order',
            location: '2 blocks away'
        }
    }
];

const MOCK_CONVERSATIONS: ChatConversation[] = [
    {
        id: 'c1',
        patientName: 'John Doe',
        patientAvatar: 'https://i.pravatar.cc/150?u=patient_john',
        lastMessage: 'Is the Amoxicillin in stock?',
        timestamp: '2m ago',
        unread: true,
        online: true,
        messages: [
            { id: 'm1', sender: 'patient', text: 'Hello, do you have Amoxicillin 500mg available?', time: '10:00 AM' },
            { id: 'm2', sender: 'vendor', text: 'Yes, we have it in stock. Would you like to order?', time: '10:05 AM' },
            { id: 'm3', sender: 'patient', text: 'Is the Amoxicillin in stock?', time: '10:15 AM' }
        ]
    },
    {
        id: 'c2',
        patientName: 'Sarah Smith',
        patientAvatar: 'https://i.pravatar.cc/150?u=patient_sarah',
        lastMessage: 'Thank you for the quick delivery!',
        timestamp: '1h ago',
        unread: false,
        online: false,
        messages: [
            { id: 'm4', sender: 'patient', text: 'My order just arrived.', time: '09:00 AM' },
            { id: 'm5', sender: 'vendor', text: 'Great to hear! Let us know if you need anything else.', time: '09:10 AM' },
            { id: 'm6', sender: 'patient', text: 'Thank you for the quick delivery!', time: '09:15 AM' }
        ]
    }
];

const MOCK_PATIENTS_DATA: PatientRecord[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 34,
    gender: 'Male',
    lastVisit: '2 days ago',
    condition: 'Seasonal Allergies',
    image: 'https://i.pravatar.cc/150?u=patient_john',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    history: [
      { date: 'Oct 12, 2023', type: 'Consultation', doctor: 'Dr. Sarah Wilson', notes: 'Reported mild fever and runny nose. Prescribed antihistamines.' },
    ],
    documents: [
      { name: 'Blood_Work_Oct23.pdf', date: 'Oct 12, 2023', type: 'Lab Report' },
    ],
    notes: 'Patient has a history of penicillin allergy.'
  },
  {
    id: 'p2',
    name: 'Sarah Smith',
    age: 28,
    gender: 'Female',
    lastVisit: '1 week ago',
    condition: 'Migraine',
    image: 'https://i.pravatar.cc/150?u=patient_sarah',
    email: 'sarah.smith@example.com',
    phone: '+1 987 654 3210',
    history: [
      { date: 'Nov 01, 2023', type: 'Emergency', doctor: 'Dr. James Chen', notes: 'Severe headache and nausea.' }
    ],
    documents: [
      { name: 'MRI_Scan_Nov01.pdf', date: 'Nov 01, 2023', type: 'Scan' }
    ],
    notes: 'Monitor frequency of headaches.'
  }
];

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  image: string;
  email: string;
  phone: string;
  history: { date: string; type: string; doctor: string; notes: string }[];
  documents: { name: string; date: string; type: string }[];
  notes: string;
}

const HostLiveSession = ({ onClose, title, category }: { onClose: () => void; title: string; category: string }) => {
  const [messages, setMessages] = useState<{user: string; text: string}[]>([
    { user: 'System', text: 'You are now LIVE. Waiting for viewers...' }
  ]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const viewerInterval = setInterval(() => {
        setViewers(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);

    const msgInterval = setInterval(() => {
        const msgs = ['Hello Doctor!', 'Can I ask a question?', 'Great clarity!', 'Is this recorded?', 'Thanks for the info!'];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
        const randomUser = `User${Math.floor(Math.random() * 1000)}`;
        setMessages(prev => [...prev, { user: randomUser, text: randomMsg }]);
    }, 3000);

    return () => {
        clearInterval(viewerInterval);
        clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-black flex flex-col animate-fade-in">
        <div className="relative flex-1 bg-slate-900 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/800/1200" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-rose-600 px-3 py-1 rounded text-white text-xs font-bold animate-pulse">LIVE</div>
                        <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                            <Users className="w-4 h-4 text-white" />
                            <span className="text-white font-mono font-bold text-sm">{viewers}</span>
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-sm mt-2 drop-shadow-md">{title}</h3>
                    <p className="text-white/80 text-xs">{category}</p>
                </div>
                <button onClick={onClose} className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white font-bold text-xs hover:bg-rose-500 transition-colors border border-white/20">
                    End Stream
                </button>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full max-w-md h-64 overflow-y-auto mask-image-b bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col gap-2 justify-end min-h-full">
                    {messages.map((m, i) => (
                        <div key={i} className="animate-float-up">
                            <span className="text-white/60 text-[10px] font-bold mr-2">{m.user}</span>
                            <span className="text-white text-sm shadow-black drop-shadow-md">{m.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

const LiveSetupModal = ({ onClose, onStart }: { onClose: () => void, onStart: (title: string, category: string) => void }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General Health');

    return (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                <div className="mb-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-3">
                        <Radio className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Setup Live Session</h2>
                    <p className="text-xs text-slate-500">Enter details to notify your followers.</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Session Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Daily Health Tips" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        >
                            <option>General Health</option>
                            <option>Pediatrics</option>
                            <option>Mental Health</option>
                            <option>Fitness & Physio</option>
                            <option>Nutrition</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => { if (title) onStart(title, category); }}
                        disabled={!title}
                        className="w-full py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Broadcast
                    </button>
                </div>
            </div>
        </div>
    );
};

export const VendorView: React.FC<VendorViewProps> = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'requests' | 'messages' | 'settings' | 'live'>('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400'
  ]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [liveSessionData, setLiveSessionData] = useState({ title: '', category: '' });
  const [showLiveSetup, setShowLiveSetup] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Requests/Orders State
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Messages State
  const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [vendorMsg, setVendorMsg] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (role === UserRole.PHARMACY) setOrders(MOCK_PHARMACY_REQUESTS);
    else if (role === UserRole.LAB) setOrders([]); // Labs start empty for this mock
  }, [role]);

  useEffect(() => {
    if (chatBottomRef.current) {
        chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversationId, conversations]);

  // Dashboard State
  const [appointments, setAppointments] = useState([
    { id: 'apt1', patient: 'John Doe', time: '09:00 AM', type: 'Video Consult', status: 'Upcoming', img: 'https://i.pravatar.cc/150?u=patient_john' },
    { id: 'apt2', patient: 'Sarah Smith', time: '10:30 AM', type: 'Clinic Visit', status: 'Pending', img: 'https://i.pravatar.cc/150?u=patient_sarah' },
  ]);

  // Patients State
  const [patients] = useState<PatientRecord[]>(MOCK_PATIENTS_DATA);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientSearch, setPatientSearch] = useState('');

  // Settings State
  const [profileBio, setProfileBio] = useState('Dedicated healthcare professional providing top-tier clinical services.');
  const [profileCover, setProfileCover] = useState('https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1000');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (mainRef.current) {
       const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
       setShowScrollTop(scrollTop > 200);
       setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 100);
    }
  };

  const scrollToTop = () => { mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); };
  const scrollToBottom = () => { mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior: 'smooth' }); };

  const handleAppointmentAction = (id: string, action: 'accept' | 'reject') => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: action === 'accept' ? 'Confirmed' : 'Rejected' } : apt));
    setNotification(`Appointment ${action === 'accept' ? 'Confirmed' : 'Rejected'}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateOrderStatus = (id: string, newStatus: VendorOrder['status']) => {
    setOrders(prev => prev.map(ord => ord.id === id ? { ...ord, status: newStatus } : ord));
    setNotification(`Order updated to ${newStatus.replace('_', ' ')}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const sendVendorMessage = () => {
    if (!vendorMsg.trim() || !selectedConversationId) return;
    const newMsg = {
        id: `m${Date.now()}`,
        sender: 'vendor' as const,
        text: vendorMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConversations(prev => prev.map(c => 
        c.id === selectedConversationId ? { ...c, messages: [...c.messages, newMsg], lastMessage: vendorMsg, unread: false } : c
    ));
    setVendorMsg('');
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map(f => URL.createObjectURL(f as File));
      setGalleryImages(prev => [...prev, ...urls]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfileCover(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveChanges = () => {
      setNotification("Profile settings saved!");
      setTimeout(() => setNotification(null), 3000);
  };

  const startLiveSession = (title: string, category: string) => {
      setLiveSessionData({ title, category });
      setShowLiveSetup(false);
      setIsLive(true);
  };

  const getRoleIcon = () => {
    switch (role) {
      case UserRole.DOCTOR: return <Activity className="w-7 h-7" />;
      case UserRole.PHARMACY: return <Package className="w-7 h-7" />;
      case UserRole.LAB: return <ClipboardList className="w-7 h-7" />;
      default: return <Activity className="w-7 h-7" />;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case UserRole.DOCTOR: return 'bg-sky-500';
      case UserRole.PHARMACY: return 'bg-emerald-500';
      case UserRole.LAB: return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  const getRoleName = () => {
    switch (role) {
      case UserRole.DOCTOR: return 'Dr. Sarah Wilson';
      case UserRole.PHARMACY: return 'HealthPlus Pharmacy';
      case UserRole.LAB: return 'Synlab Central';
      default: return 'Vendor';
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case UserRole.DOCTOR: return 'General Practitioner';
      case UserRole.PHARMACY: return 'Licensed Vendor';
      case UserRole.LAB: return 'Diagnostic Center';
      default: return 'Service Provider';
    }
  };

  const renderHeader = () => (
    <header className="px-6 py-5 bg-white/70 backdrop-blur-md border-b border-white/50 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="relative">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden ${!profileImage && getRoleColor()}`}>
              {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : getRoleIcon()}
           </div>
           <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 leading-none">{getRoleName()}</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">{getRoleTitle()}</p>
        </div>
      </div>
      <div className="flex gap-3">
         {(role === UserRole.DOCTOR) && (
             <button onClick={() => setShowLiveSetup(true)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all bg-rose-500 text-white hover:bg-rose-600 flex items-center gap-2 shadow-lg shadow-rose-500/30">
                <Radio className="w-4 h-4" /> GO LIVE
             </button>
         )}
         <button onClick={() => setIsOnline(!isOnline)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
         </button>
         <button className="p-2 bg-white rounded-xl text-slate-400 hover:bg-slate-50 relative border border-slate-100 shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
         </button>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <div className="p-6 space-y-6 animate-fade-in">
       <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-3xl shadow-sm bg-white/60">
             <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-slate-400 bg-white/50 px-2 py-1 rounded-lg border border-slate-100">+12%</span>
             </div>
             <p className="text-2xl font-display font-bold text-slate-900">1,248</p>
             <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Patients</p>
          </div>
          <div className="glass-card p-4 rounded-3xl shadow-sm bg-white/60">
             <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-slate-400 bg-white/50 px-2 py-1 rounded-lg border border-slate-100">+5%</span>
             </div>
             <p className="text-2xl font-display font-bold text-slate-900">$12.4k</p>
             <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Revenue</p>
          </div>
          <div className="glass-card p-4 rounded-3xl shadow-sm bg-white/60">
             <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Package className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-slate-400 bg-white/50 px-2 py-1 rounded-lg border border-slate-100">Now</span>
             </div>
             <p className="text-2xl font-display font-bold text-slate-900">{orders.length}</p>
             <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Orders</p>
          </div>
       </div>

       <div className="glass-panel bg-white/80 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <h3 className="font-bold text-slate-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-slate-100">
               {appointments.map(apt => (
                  <div key={apt.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                     <div className={`w-1 h-10 rounded-full ${apt.status === 'Upcoming' ? 'bg-sky-500' : 'bg-amber-500'}`}></div>
                     <img src={apt.img} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm">{apt.patient}</h4>
                        <p className="text-xs text-slate-500">{apt.type} • {apt.time}</p>
                     </div>
                     <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-primary transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>
               ))}
            </div>
       </div>
    </div>
  );

  const renderMessages = () => (
    <div className="flex h-full animate-fade-in overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 bg-white/50 backdrop-blur-sm flex flex-col ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-6 border-b border-slate-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                {conversations.map(conv => (
                    <div 
                        key={conv.id} 
                        onClick={() => setSelectedConversationId(conv.id)}
                        className={`p-4 flex gap-4 cursor-pointer transition-colors hover:bg-white/80 ${selectedConversationId === conv.id ? 'bg-white shadow-sm ring-1 ring-slate-100' : ''}`}
                    >
                        <div className="relative shrink-0">
                            <img src={conv.patientAvatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                            {conv.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-slate-900 text-sm truncate">{conv.patientName}</h4>
                                <span className="text-[10px] text-slate-400 font-medium">{conv.timestamp}</span>
                            </div>
                            <p className={`text-xs truncate ${conv.unread ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>{conv.lastMessage}</p>
                        </div>
                        {conv.unread && <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 self-center"></div>}
                    </div>
                ))}
            </div>
        </div>

        {/* Active Chat Pane */}
        <div className={`flex-1 flex flex-col bg-slate-50/30 ${!selectedConversationId ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
            {selectedConversationId ? (
                <>
                    <div className="p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center z-10 shadow-sm">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSelectedConversationId(null)} className="md:hidden p-2 -ml-2 text-slate-400"><ArrowLeft className="w-5 h-5" /></button>
                            <img src={conversations.find(c => c.id === selectedConversationId)?.patientAvatar} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">{conversations.find(c => c.id === selectedConversationId)?.patientName}</h3>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-colors"><Phone className="w-5 h-5" /></button>
                            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30">
                        {conversations.find(c => c.id === selectedConversationId)?.messages.map(m => (
                            <div key={m.id} className={`flex ${m.sender === 'vendor' ? 'justify-end' : 'justify-start'} animate-float-up`}>
                                <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
                                    m.sender === 'vendor' 
                                        ? 'bg-slate-900 text-white rounded-tr-none' 
                                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                }`}>
                                    {m.text}
                                    <div className={`text-[9px] mt-1.5 opacity-50 ${m.sender === 'vendor' ? 'text-right' : 'text-left'}`}>{m.time}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatBottomRef} />
                    </div>

                    <div className="p-4 bg-white/90 backdrop-blur-md border-t border-slate-200">
                        <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Plus className="w-5 h-5" /></button>
                            <input 
                                type="text" 
                                value={vendorMsg}
                                onChange={e => setVendorMsg(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendVendorMessage()}
                                placeholder="Type a response..." 
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700"
                            />
                            <button 
                                onClick={sendVendorMessage}
                                disabled={!vendorMsg.trim()}
                                className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center opacity-30">
                    <MessageSquare className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-xl font-bold">Select a conversation to begin</p>
                </div>
            )}
        </div>
    </div>
  );

  const renderRequests = () => {
    if (selectedOrderId) {
        const order = orders.find(o => o.id === selectedOrderId);
        if (!order) return null;
        return (
            <div className="p-6 animate-fade-in space-y-6">
                <button onClick={() => setSelectedOrderId(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-xs mb-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Requests
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel bg-white/80 p-6 rounded-[2.5rem] shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <img src={order.patientAvatar} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">{order.patientName}</h2>
                                        <p className="text-xs text-slate-500 font-medium">Order #{order.id} • {order.timestamp}</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'new' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{order.status}</div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" /> {role === UserRole.PHARMACY ? 'Prescription Items' : 'Requested Tests'}</h3>
                                <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 divide-y divide-slate-100">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0"><span className="text-sm font-medium text-slate-700">{item}</span><span className="text-xs font-bold text-slate-400">1 Unit</span></div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 flex gap-3 pt-6 border-t border-slate-100">
                                {order.status === 'new' && (
                                    <button onClick={() => handleUpdateOrderStatus(order.id, 'preparing')} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">Accept & Prepare</button>
                                )}
                                <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 animate-fade-in space-y-6">
            <div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold font-display text-slate-900">Active Requests</h2><p className="text-slate-500 text-sm">Orders and lab tests</p></div></div>
            <div className="grid gap-4">
                {orders.map(order => (
                    <div key={order.id} onClick={() => setSelectedOrderId(order.id)} className="glass-panel bg-white/80 p-5 rounded-[2rem] shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group flex items-center gap-4">
                        <img src={order.patientAvatar} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{order.patientName}</h3>
                            <p className="text-xs text-slate-500">{order.timestamp} • {order.items.length} items</p>
                        </div>
                        <div className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase bg-amber-100 text-amber-600">{order.status}</div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const renderPatients = () => {
    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()));
    return (
        <div className="p-6 animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-display text-slate-900">My Patients</h2>
                <div className="relative">
                    <input type="text" placeholder="Search patients..." value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-200 w-64" />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map(patient => (
                    <div key={patient.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={patient.image} alt={patient.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                            <div><h3 className="font-bold text-slate-900">{patient.name}</h3><p className="text-xs text-slate-500">{patient.gender}, {patient.age}</p></div>
                        </div>
                        <button className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">View Records</button>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const renderSettings = () => (
    <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="glass-panel bg-white/80 rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="h-48 md:h-64 bg-slate-200 relative group overflow-hidden">
                <img src={profileCover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <label className="bg-white/90 text-slate-900 px-6 py-3 rounded-2xl cursor-pointer hover:bg-white transition-all font-bold text-sm flex items-center gap-2 shadow-xl">
                        <ImageIcon className="w-5 h-5" /> Change Cover
                        <input type="file" className="hidden" onChange={handleCoverUpload} accept="image/*" />
                    </label>
                </div>
            </div>
            <div className="px-8 pb-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-20 mb-8 gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden bg-white relative">
                            {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <div className={`w-full h-full flex items-center justify-center text-white ${getRoleColor()}`}>{React.cloneElement(getRoleIcon() as React.ReactElement, { className: "w-16 h-16" })}</div>}
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><Upload className="w-8 h-8 text-white" /><input type="file" className="hidden" onChange={handleProfileImageUpload} accept="image/*" /></label>
                        </div>
                    </div>
                    <button onClick={handleSaveChanges} className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95"><Save className="w-5 h-5" /> Save Profile</button>
                </div>
                <div className="space-y-6">
                    <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">About / Bio</label>
                        <textarea value={profileBio} onChange={e => setProfileBio(e.target.value)} className="w-full p-4 bg-white rounded-2xl border border-slate-200 text-sm font-medium text-slate-600 min-h-[140px] resize-none focus:ring-4 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="flex justify-between items-center mb-6"><h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Service Gallery</h3><label className="cursor-pointer bg-white p-2 rounded-xl border border-slate-200 text-primary shadow-sm hover:bg-primary hover:text-white transition-all"><Plus className="w-5 h-5" /><input type="file" className="hidden" multiple onChange={handleGalleryUpload} accept="image/*" /></label></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm"><img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" /><button onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Trash2 className="w-6 h-6" /></button></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#f0f4f8] font-sans text-slate-800 relative overflow-hidden">
      {renderHeader()}
      {notification && (<div className="fixed top-24 right-6 z-[130] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-float border border-white/10"><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-sm font-bold">{notification}</span></div>)}
      <main ref={mainRef} onScroll={handleScroll} className="flex-1 overflow-y-auto pb-24 scroll-smooth">
         {activeTab === 'dashboard' && renderDashboard()}
         {activeTab === 'patients' && renderPatients()}
         {activeTab === 'requests' && renderRequests()}
         {activeTab === 'messages' && renderMessages()}
         {activeTab === 'settings' && renderSettings()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 px-6 py-3 flex justify-between items-center z-50 pb-6 shadow-lg">
         <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-400'}`}><Activity className="w-6 h-6" /><span className="text-[10px] font-bold">Dash</span></button>
         <button onClick={() => setActiveTab('patients')} className={`flex flex-col items-center gap-1 ${activeTab === 'patients' ? 'text-slate-900' : 'text-slate-400'}`}><Users className="w-6 h-6" /><span className="text-[10px] font-bold">Patients</span></button>
         <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-primary' : 'text-slate-400'}`}><div className="relative"><MessageSquare className="w-6 h-6" /><div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse border border-white"></div></div><span className="text-[10px] font-bold">Chat</span></button>
         <button onClick={() => setActiveTab('requests')} className={`flex flex-col items-center gap-1 ${activeTab === 'requests' ? 'text-slate-900' : 'text-slate-400'}`}><ClipboardList className="w-6 h-6" /><span className="text-[10px] font-bold">Requests</span></button>
         <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-slate-900' : 'text-slate-400'}`}><Settings className="w-6 h-6" /><span className="text-[10px] font-bold">Settings</span></button>
      </nav>
      {activeCall && <VideoConsultation doctorName={activeCall} onEndCall={() => setActiveCall(null)} />}
      {isLive && <HostLiveSession onClose={() => setIsLive(false)} title={liveSessionData.title} category={liveSessionData.category} />}
      {showLiveSetup && <LiveSetupModal onClose={() => setShowLiveSetup(false)} onStart={startLiveSession} />}
    </div>
  );
};
