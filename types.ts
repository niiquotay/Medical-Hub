export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
  LAB = 'LAB',
  RIDER = 'RIDER',
  INSURANCE = 'INSURANCE',
  SPECIALIST = 'SPECIALIST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Comment {
  id: string;
  authorName: string;
  text: string;
  timestamp: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
  image: string;
  coverImage: string; 
  location: string;
  price: number; // Consultation fee
  followers: string; // e.g. "1.2k"
  verified: boolean;
  bio: string;
  handle: string; // e.g. @dr_sarah
  coordinates?: { x: number; y: number }; 
  gallery?: string[]; // Multiple images for vendor profile
  reviews?: Review[];
}

export interface Specialist {
  id: string;
  name: string;
  serviceType: 'Physiotherapist' | 'Masseur' | 'Herbalist' | 'Adult Care' | 'Counselor';
  rating: number;
  available: boolean;
  image: string;
  coverImage: string;
  location: string;
  price: number; // Service/Visit fee
  followers: string;
  verified: boolean;
  bio: string;
  handle: string;
  coordinates?: { x: number; y: number };
  offersHomeVisit: boolean;
  offersVideo: boolean;
  offersProducts: boolean; // For herbalists selling items
  gallery?: string[]; // Multiple images for vendor profile
}

export interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  priceEstimate: number;
  deliveryFee: number;
  image: string;
  coverImage: string;
  rating: number;
  verified: boolean;
  handle: string;
  waitTime: string; // e.g. "10 mins"
  status: 'Open' | 'Busy' | 'Closed';
  coordinates?: { x: number; y: number };
  gallery?: string[];
  bio?: string;
}

export interface Lab {
  id: string;
  name: string;
  distance: string;
  testsAvailable: string[];
  image: string;
  coverImage: string;
  rating: number;
  verified: boolean;
  handle: string;
  waitTime: string;
  status: 'Open' | 'Busy' | 'Closed';
  coordinates?: { x: number; y: number };
  gallery?: string[];
  bio?: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  planName: string;
  monthlyPremium: number;
  coveragePercent: number; // 0.8 for 80%
  logo: string;
  type: 'Private' | 'Government';
  image?: string;
  coverImage?: string;
  rating?: number;
  verified?: boolean;
  bio?: string;
  features?: string[];
  handle?: string;
  gallery?: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'live';
  type: 'video' | 'chat';
}

export interface DeliveryJob {
  id: string;
  type: 'medication' | 'lab_result';
  pickupLocation: string;
  dropoffLocation: string;
  patientName: string;
  status: 'pending' | 'picked_up' | 'delivered';
  fee: number;
  verificationCode: string; // The code the rider needs to scan
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface PostMedia {
  type: 'image' | 'video';
  url: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  content: string;
  media?: PostMedia[]; // Support multiple images/videos
  likes: number;
  comments: number;
  commentsList?: Comment[]; 
  timestamp: string;
  isLiked?: boolean;
}

export interface LiveSession {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  title: string;
  viewers: number;
  thumbnail: string;
  category: string;
}
