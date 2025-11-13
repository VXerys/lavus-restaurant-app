import firestore from '@react-native-firebase/firestore';

// Collections
export const COLLECTIONS = {
  MENUS: 'menus',
  HOT_DEALS: 'hotDeals',
  REVIEWS: 'reviews',
  RESERVATIONS: 'reservations',
  USERS: 'users',
} as const;

// ============================================
// MENU SERVICES
// ============================================

export interface MenuItemFirestore {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl?: string; // URL for online images
  imagePath?: string; // Path reference for local images
  category: 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta';
  createdAt: any;
  updatedAt: any;
}

/**
 * Fetch all menu items
 */
export const fetchMenuItems = async (): Promise<MenuItemFirestore[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.MENUS)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.originalId || doc.id, // Use originalId if available, fallback to doc.id
        ...data,
      };
    }) as MenuItemFirestore[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

/**
 * Fetch menu items by category
 */
export const fetchMenuItemsByCategory = async (
  category: string
): Promise<MenuItemFirestore[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.MENUS)
      .where('category', '==', category)
      .orderBy('rating', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.originalId || doc.id, // Use originalId if available, fallback to doc.id
        ...data,
      };
    }) as MenuItemFirestore[];
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    throw error;
  }
};

/**
 * Fetch single menu item by ID
 */
export const fetchMenuItemById = async (id: string): Promise<MenuItemFirestore | null> => {
  try {
    const doc = await firestore()
      .collection(COLLECTIONS.MENUS)
      .doc(id)
      .get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    } as MenuItemFirestore;
  } catch (error) {
    console.error('Error fetching menu item:', error);
    throw error;
  }
};

// ============================================
// HOT DEALS SERVICES
// ============================================

export interface HotDealFirestore {
  id: string;
  type: 'buy1get1' | 'discount' | 'hero';
  label: string;
  title: string;
  description?: string;
  imageUrl?: string; // URL for online images
  imagePath?: string; // Path reference for local images
  expiryDate: any;
  discountPercent?: number;
  createdAt: any;
}

/**
 * Fetch all active hot deals
 */
export const fetchActiveHotDeals = async (): Promise<HotDealFirestore[]> => {
  try {
    const now = new Date();
    const snapshot = await firestore()
      .collection(COLLECTIONS.HOT_DEALS)
      .where('expiryDate', '>', now)
      .orderBy('expiryDate', 'asc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.originalId || doc.id, // Use originalId if available, fallback to doc.id
        ...data,
      };
    }) as HotDealFirestore[];
  } catch (error) {
    console.error('Error fetching hot deals:', error);
    throw error;
  }
};

/**
 * Fetch hot deal by ID
 */
export const fetchHotDealById = async (id: string): Promise<HotDealFirestore | null> => {
  try {
    const doc = await firestore()
      .collection(COLLECTIONS.HOT_DEALS)
      .doc(id)
      .get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    } as HotDealFirestore;
  } catch (error) {
    console.error('Error fetching hot deal:', error);
    throw error;
  }
};

// ============================================
// REVIEWS SERVICES
// ============================================

export interface ReviewFirestore {
  id: string;
  menuId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

/**
 * Fetch reviews for a menu item
 */
export const fetchReviewsByMenuId = async (menuId: string): Promise<ReviewFirestore[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.REVIEWS)
      .where('menuId', '==', menuId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ReviewFirestore[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * Add a new review
 */
export const addReview = async (
  reviewData: Omit<ReviewFirestore, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const docRef = await firestore()
      .collection(COLLECTIONS.REVIEWS)
      .add({
        ...reviewData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// ============================================
// RESERVATION SERVICES
// ============================================

export interface ReservationFirestore {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  guests: number;
  date: any;
  time: any;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

/**
 * Create a new reservation
 */
export const createReservation = async (
  reservationData: Omit<ReservationFirestore, 'id' | 'createdAt' | 'status'>
): Promise<string> => {
  try {
    const docRef = await firestore()
      .collection(COLLECTIONS.RESERVATIONS)
      .add({
        ...reservationData,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return docRef.id;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

/**
 * Fetch user reservations
 */
export const fetchUserReservations = async (userId: string): Promise<ReservationFirestore[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.RESERVATIONS)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ReservationFirestore[];
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize Firestore with sample data (for development)
 * Call this once to populate your Firestore database
 */
export const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const menusSnapshot = await firestore()
      .collection(COLLECTIONS.MENUS)
      .limit(1)
      .get();

    if (!menusSnapshot.empty) {
      console.log('Sample data already exists');
      return;
    }

    console.log('Initializing sample data...');

    // Add sample menus
    const sampleMenus = [
      {
        name: 'Salmon Salad',
        description: 'Fresh salmon with mixed greens and house dressing',
        price: 39,
        rating: 5.0,
        reviewCount: 2000,
        imageUrl: 'https://placeholder.com/salad1.jpg',
        category: 'salad',
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        name: 'Shrimp Salad',
        description: 'Grilled shrimp with crispy vegetables',
        price: 29,
        rating: 4.5,
        reviewCount: 1500,
        imageUrl: 'https://placeholder.com/salad2.jpg',
        category: 'salad',
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    ];

    const batch = firestore().batch();
    
    sampleMenus.forEach(menu => {
      const docRef = firestore().collection(COLLECTIONS.MENUS).doc();
      batch.set(docRef, menu);
    });

    await batch.commit();
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
    throw error;
  }
};
