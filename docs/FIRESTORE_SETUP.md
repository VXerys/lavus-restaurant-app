# FIRESTORE SETUP GUIDE

**Last Updated:** 2025-11-13

## 📋 Overview

Firestore telah diintegrasikan untuk menyediakan real-time database untuk aplikasi Lavus Restaurant. Database ini menyimpan menu items, hot deals, reviews, dan reservations.

---

## 🔧 Setup Steps

### 1. Firebase Console Setup

1. **Buka Firebase Console:** https://console.firebase.google.com/
2. **Pilih project:** `lavus-app`
3. **Buat Firestore Database:**
   - Klik "Firestore Database" di sidebar
   - Klik "Create database"
   - **Pilih mode:**
     - **Test Mode** (Recommended untuk development): Data bisa dibaca/tulis tanpa autentikasi
     - **Production Mode**: Butuh security rules (lebih aman)
   - **Pilih location:** Pilih yang terdekat (e.g., `asia-southeast2` untuk Jakarta)
   - Klik "Enable"

### 2. Security Rules (Test Mode)

Jika memilih **Test Mode**, rules otomatis akan seperti ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

### 3. Security Rules (Production Mode - Recommended)

Untuk **Production Mode**, gunakan rules ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Menu Items - Public read, admin write only
    match /menus/{menuId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Hot Deals - Public read, admin write only
    match /hotDeals/{dealId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Reviews - Public read, authenticated users can write their own
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                              request.auth.uid == resource.data.userId;
    }
    
    // Reservations - Users can only access their own reservations
    match /reservations/{reservationId} {
      allow read: if request.auth != null && 
                    request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                      request.auth.uid == resource.data.userId;
    }
    
    // Users - Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                           request.auth.uid == userId;
    }
  }
}
```

---

## 📁 Database Structure

### Collections

#### 1. **menus** Collection
Menyimpan data menu items restaurant.

```typescript
{
  id: string,                          // Auto-generated
  name: string,                        // "Salmon Salad"
  description: string,                 // "Fresh salmon with..."
  price: number,                       // 39
  rating: number,                      // 5.0
  reviewCount: number,                 // 2000
  imageUrl: string,                    // URL to image
  category: string,                    // "salad" | "drink" | "pizza" | "dessert" | "pasta"
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### 2. **hotDeals** Collection
Menyimpan promo dan deals yang sedang aktif.

```typescript
{
  id: string,                          // Auto-generated
  type: string,                        // "buy1get1" | "discount"
  label: string,                       // "BUY 1 GET 1"
  title: string,                       // "Lavu's Cheesy Pizza"
  description?: string,                // Optional detail
  imageUrl: string,                    // URL to image
  expiryDate: timestamp,               // When deal expires
  discountPercent?: number,            // 50 (for discount type)
  createdAt: timestamp
}
```

#### 3. **reviews** Collection
Menyimpan review dari user untuk menu items.

```typescript
{
  id: string,                          // Auto-generated
  menuId: string,                      // Reference to menu item
  userId: string,                      // User who wrote review
  userName: string,                    // Display name
  userAvatar?: string,                 // Profile photo URL
  rating: number,                      // 1-5
  comment: string,                     // Review text
  createdAt: timestamp
}
```

#### 4. **reservations** Collection
Menyimpan booking reservasi table.

```typescript
{
  id: string,                          // Auto-generated
  userId: string,                      // User who made reservation
  userName: string,
  userEmail: string,
  guests: number,                      // Number of people
  date: timestamp,                     // Reservation date
  time: timestamp,                     // Reservation time
  status: string,                      // "pending" | "confirmed" | "cancelled"
  createdAt: timestamp
}
```

#### 5. **users** Collection (Optional)
Menyimpan additional user data (points, preferences, dll).

```typescript
{
  id: string,                          // Same as Auth UID
  displayName: string,
  email: string,
  photoURL?: string,
  points: number,                      // Rewards points
  membershipTier: number,              // 1, 2, or 3
  createdAt: timestamp,
  lastLoginAt: timestamp
}
```

---

## 🚀 Usage in Code

### Import Firestore Services

```typescript
import {
  fetchMenuItems,
  fetchMenuItemsByCategory,
  fetchActiveHotDeals,
  createReservation,
  addReview,
} from '@services/firestoreService';
```

### Example: Fetch Menu Items

```typescript
const [menus, setMenus] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const loadMenus = async () => {
    setLoading(true);
    try {
      const data = await fetchMenuItemsByCategory('salad');
      setMenus(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };
  
  loadMenus();
}, []);
```

### Example: Create Reservation

```typescript
const handleReservation = async () => {
  try {
    const reservationId = await createReservation({
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      guests: peopleCount,
      date: selectedDate,
      time: selectedTime,
    });
    
    Alert.alert('Success', 'Reservation created!');
  } catch (error) {
    Alert.alert('Error', 'Failed to create reservation');
  }
};
```

---

## 📊 Initialize Sample Data

Untuk populate database dengan data awal:

1. **Temporary development only** - Uncomment di `App.tsx`:

```typescript
import { initializeSampleData } from '@services/firestoreService';

useEffect(() => {
  // Only run once for initial setup
  // initializeSampleData();
}, []);
```

2. **Better approach** - Buat script terpisah atau upload via Firebase Console

---

## 🔍 Monitoring & Testing

### Firebase Console
- **View Data:** Firestore Database > Data tab
- **Query Data:** Gunakan filters dan sorting
- **Add/Edit Data:** Manual via console
- **Monitor Usage:** Usage tab untuk tracking reads/writes

### Testing in App
```typescript
// Log fetched data
const menus = await fetchMenuItems();
console.log('Menus:', menus);
```

---

## 📈 Next Steps

1. ✅ Setup Firestore database (DONE)
2. ✅ Install `@react-native-firebase/firestore` (DONE)
3. ✅ Create service layer (DONE)
4. ⏳ Populate database dengan data
5. ⏳ Update screens untuk fetch dari Firestore
6. ⏳ Add loading states
7. ⏳ Add error handling
8. ⏳ Test offline persistence

---

## 🆘 Troubleshooting

### Error: "Missing or insufficient permissions"
- Check Firestore security rules
- Pastikan user sudah login (untuk protected collections)

### Error: "FIRESTORE (X.X.X) INTERNAL ASSERTION FAILED"
- Rebuild app: `cd android && ./gradlew clean && cd .. && npx react-native run-android`

### Data tidak muncul
- Check Firebase Console apakah data sudah ada
- Check network connection
- Log error messages untuk debugging

---

## 📚 Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Native Firebase Firestore](https://rnfirebase.io/firestore/usage)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
