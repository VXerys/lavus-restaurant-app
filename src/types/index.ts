// Global TypeScript interfaces & types for domain models.
// Keep stable to ease switch from mock data to real API.

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // integer in IDR
  category: 'main' | 'beverage' | 'dessert' | 'other';
  image?: string;
  isRecommended?: boolean;
  isAvailable: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // simple scale
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  banner?: string; // image URL
  discountPercent: number; // 0-100
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  userId: string;
  name: string; // display name if not tied to user detail
  date: string; // ISO date/time of reservation start
  partySize: number; // number of people
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  menuId?: string; // optional if review tied to a menu item
  rating: number; // 0-5
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  avatar?: string;
  loyaltyPoints?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  points: number;
  category: '100-300' | '300-400';
  image: any; // require() image
  isAvailable: boolean;
}

// Generic API response wrappers (future real API alignment)
export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiItemResponse<T> {
  data: T;
}
