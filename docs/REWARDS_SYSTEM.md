# Rewards System Documentation

## 📋 Overview

Sistem Rewards Lavu's Restaurant adalah sistem loyalitas pelanggan berbasis poin yang memiliki 3 tingkat membership (tier). Pelanggan mendapatkan poin setiap kali melakukan pemesanan dan dapat naik tier sesuai akumulasi poin mereka.

## 🎯 Reward Tiers

### Tier 1: Member Starter (0-999 poin)
- **Progress Bar**: 0% (kosong)
- **Icon Kiri**: Logo Lavu (daun hijau, tanpa bintang)
- **Icon Kanan**: Logo dengan 1 bintang
- **Status**: Belum mencapai member bintang
- **Target Berikutnya**: Kumpulkan 1000 poin untuk menjadi 2-star member

### Tier 2: 2-Star Member (1000-1999 poin)
- **Progress Bar**: 50% (setengah terisi)
- **Icon Kiri**: Logo dengan 1 bintang
- **Icon Kanan**: Logo dengan 2 bintang
- **Status**: Member bintang 2
- **Target Berikutnya**: Kumpulkan 2000 poin untuk menjadi 3-star member

### Tier 3: 3-Star Member (2000+ poin)
- **Progress Bar**: 100% (penuh)
- **Icon Kiri**: Logo dengan 2 bintang
- **Icon Kanan**: Logo dengan 3 bintang
- **Status**: Member bintang 3 (tier tertinggi)
- **Pesan**: "Congratulations! You are a 3-star member"

## 💰 Cara Mendapatkan Poin

### Sistem Penambahan Poin
- **Setiap pemesanan produk = +50 poin**
- Poin langsung ditambahkan setelah order berhasil
- Akumulasi poin akan otomatis menentukan tier member

### Contoh Perhitungan
```
Order 1 item   = 50 poin
Order 5 items  = 250 poin
Order 20 items = 1000 poin → Naik ke Tier 2
Order 40 items = 2000 poin → Naik ke Tier 3
```

## 🔧 Implementasi Teknis

### Komponen yang Terlibat

#### 1. `RewardsPointsCard`
**Lokasi**: `src/components/RewardsPointsCard.tsx`

Menampilkan:
- Total poin yang dimiliki user
- Tanggal terakhir update poin
- Tombol "Redeem my points"

**Props**:
```typescript
interface RewardsPointsCardProps {
  points: number;          // Total poin user
  lastUpdated: string;     // Tanggal update terakhir
  onRedeemPress: () => void; // Handler untuk redeem
}
```

#### 2. `MembershipProgressBar`
**Lokasi**: `src/components/MembershipProgressBar.tsx`

Menampilkan:
- Progress bar visual (0%, 50%, 100%)
- Icon tier saat ini dan target tier
- Text informasi poin yang dibutuhkan

**Props**:
```typescript
interface MembershipProgressBarProps {
  currentPoints: number;    // Poin user saat ini
  requiredPoints?: number;  // Optional, dihitung otomatis
  nextTier?: string;        // Optional, dihitung otomatis
}
```

### Logika Tier System

```typescript
// Menentukan tier berdasarkan poin
const getCurrentTier = () => {
  if (currentPoints >= 2000) return 3; // Tier 3
  if (currentPoints >= 1000) return 2; // Tier 2
  return 1; // Tier 1
};

// Menentukan persentase progress bar
const getProgressPercentage = () => {
  if (currentPoints >= 2000) return 100; // 100%
  if (currentPoints >= 1000) return 50;  // 50%
  return 0; // 0%
};

// Memilih gambar bar sesuai progress
const getBarImage = () => {
  if (progressPercentage === 0) return RewardImages.barPercent0;
  if (progressPercentage === 50) return RewardImages.barPercent50;
  return RewardImages.barPercent100;
};

// Icon kiri berubah sesuai tier
const getLeftLogoImage = () => {
  if (currentTier === 3) return RewardImages.star2;
  if (currentTier === 2) return RewardImages.star1;
  return RewardImages.logo; // No star
};

// Icon kanan menunjukkan target tier
const getRightLogoImage = () => {
  if (currentTier === 3) return RewardImages.star3;
  if (currentTier === 2) return RewardImages.star2;
  return RewardImages.star1;
};
```

## 🖼️ Asset Images

### Bar Progress Images
- `bar-percent0.png` - Bar kosong (0%)
- `bar-percent50.png` - Bar setengah (50%)
- `bar-percent100.png` - Bar penuh (100%)

### Logo Reward Images
- `logo-reward.png` - Logo dasar tanpa bintang
- `logo-reward-bintang1.png` - Logo dengan 1 bintang
- `logo-reward-bintang2.png` - Logo dengan 2 bintang
- `logo-reward-bintang3.png` - Logo dengan 3 bintang

**Lokasi**: `src/assets/images/rewards/`

## 🔄 Integrasi dengan Reserve Screen (Future)

### Flow Penambahan Poin

1. **User melakukan order di Reserve Screen**
   ```typescript
   // Di ReserveScreen.tsx
   const handleOrderComplete = (orderItems: number) => {
     const pointsEarned = orderItems * 50;
     updateUserPoints(pointsEarned);
   };
   ```

2. **Update state poin user**
   ```typescript
   // Di global state management (Redux/Context/Zustand)
   const updateUserPoints = (points: number) => {
     setUserPoints(prevPoints => prevPoints + points);
     savePointsToBackend(userPoints + points);
   };
   ```

3. **UI otomatis update**
   - `RewardsPointsCard` akan menampilkan total poin baru
   - `MembershipProgressBar` akan auto-detect tier dan update visual

### Contoh Implementasi di Reserve Screen

```typescript
// ReserveScreen.tsx (contoh untuk future implementation)
import { useRewards } from '@hooks/useRewards';

const ReserveScreen = () => {
  const { userPoints, addPoints } = useRewards();
  
  const handleConfirmOrder = (items: MenuItem[]) => {
    const totalItems = items.length;
    const pointsEarned = totalItems * 50;
    
    // Process order...
    processOrder(items);
    
    // Add points
    addPoints(pointsEarned);
    
    // Show notification
    showNotification(`You earned ${pointsEarned} points!`);
  };
  
  return (
    // ... UI
  );
};
```

## 🧪 Testing

### Manual Testing

Untuk testing sistem tier, ubah nilai `userPoints` di `RewardsScreen.tsx`:

```typescript
// Test Tier 1 (0-999 poin)
const [userPoints] = useState(0);
const [userPoints] = useState(500);
const [userPoints] = useState(999);

// Test Tier 2 (1000-1999 poin)
const [userPoints] = useState(1000);
const [userPoints] = useState(1500);
const [userPoints] = useState(1999);

// Test Tier 3 (2000+ poin)
const [userPoints] = useState(2000);
const [userPoints] = useState(3000);
const [userPoints] = useState(5000);
```

### Expected Results

| Poin User | Tier | Bar Progress | Icon Kiri | Icon Kanan | Text Message |
|-----------|------|--------------|-----------|------------|--------------|
| 0-999     | 1    | 0%          | Logo      | 1 Star     | "Earn X more points to reach 2-star member" |
| 1000-1999 | 2    | 50%         | 1 Star    | 2 Stars    | "Earn X more points to reach 3-star member" |
| 2000+     | 3    | 100%        | 2 Stars   | 3 Stars    | "Congratulations! You are a 3-star member" |

## 📱 User Experience Flow

### First Time User (0 poin)
1. Membuka Rewards Screen
2. Melihat "0 Points to Redeem"
3. Melihat progress bar kosong (0%)
4. Melihat text "Earn 1000 more points to reach 2-star member"
5. Motivasi untuk order dan kumpulkan poin

### Active User (1500 poin)
1. Membuka Rewards Screen
2. Melihat "1500 Points to Redeem"
3. Melihat progress bar setengah (50%)
4. Icon sudah menunjukkan 1 bintang di kiri
5. Melihat text "Earn 500 more points to reach 3-star member"
6. Tahu mereka sudah 2-star member dan hampir mencapai tier tertinggi

### VIP User (3000 poin)
1. Membuka Rewards Screen
2. Melihat "3000 Points to Redeem"
3. Melihat progress bar penuh (100%)
4. Icon menunjukkan 2 dan 3 bintang
5. Melihat text "Congratulations! You are a 3-star member"
6. Merasa special sebagai member tier tertinggi

## 🎨 UI Components Styling

### Responsive Design
- Menggunakan `moderateScale()` untuk dimensi
- Menggunakan `scaleFontSize()` untuk ukuran font
- Support berbagai ukuran device (phone, tablet)

### Color Scheme
- Primary Color: `#95AE45` (hijau Lavu's)
- Background: White/Black kontras tinggi
- Progress Bar: Border hitam dengan isi sesuai tier

## 📝 Notes untuk Developer

1. **State Management**: 
   - Implementasikan global state untuk `userPoints`
   - Sinkronisasi dengan backend API
   - Persist data dengan AsyncStorage/SecureStore

2. **Backend Integration**:
   - Endpoint untuk get user points: `GET /api/rewards/points`
   - Endpoint untuk add points: `POST /api/rewards/add`
   - Endpoint untuk redeem: `POST /api/rewards/redeem`

3. **Security**:
   - Validasi penambahan poin di backend
   - Prevent point manipulation dari client side
   - Log semua transaksi poin

4. **Future Enhancement**:
   - Notifikasi saat naik tier
   - History transaksi poin
   - Rewards catalog untuk redeem poin
   - Expiry date untuk poin
   - Special perks untuk tiap tier

## 🔗 Related Files

- `src/screens/RewardsScreen.tsx` - Main rewards screen
- `src/components/RewardsPointsCard.tsx` - Points display card
- `src/components/MembershipProgressBar.tsx` - Progress bar component
- `src/assets/index.ts` - Asset exports (RewardImages)
- `src/assets/images/rewards/` - Reward image assets

## 📚 References

- [Figma Design](link-to-design) - Original UI design
- [API Documentation](link-to-api) - Backend API specs
- [User Flow](link-to-flow) - Complete user journey

---

**Last Updated**: November 11, 2025  
**Version**: 1.0.0  
**Author**: Development Team
