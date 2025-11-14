# 🚀 FIRESTORE READY TO TEST

**Status:** ✅ Setup Complete - Ready untuk Upload Data  
**Date:** 2025-11-13

---

## ✅ Yang Sudah Fixed

### 1. **Batch Write Error** ✅

- ❌ BEFORE: `documentBatch is not a function`
- ✅ AFTER: Upload satu-per-satu (lebih reliable)

### 2. **Images dari Assets** ✅

- ❌ BEFORE: Pakai Unsplash URLs (butuh internet)
- ✅ AFTER: Pakai local images dari `assets/images/MenuImages`
- Data di Firestore store `imagePath` reference
- App akan match dengan local images saat display

---

## 📦 Data yang Akan Di-Upload

### Menus (17 items total)

Dari mock data yang sudah ada:

- **Salads:** 5 items (salad1.jpg - salad5.jpg)
- **Drinks:** 5 items (drink1.jpg - drink5.jpg)
- **Pizzas:** 3 items (pizza1.jpg - pizza3.jpg)
- **Desserts:** 2 items (dessert1.jpg - dessert2.jpg)
- **Pastas:** 2 items (pasta1.jpg - pasta2.jpg)

### Hot Deals (6 items)

Dari mock data yang sudah ada:

- Customer Benefits deals
- New Features promo
- Seasonal offers

**Semua menggunakan gambar lokal yang sudah ada di project!** 🎨

---

## 🎯 Cara Test

### Step 1: Run Aplikasi

Jalankan command ini di terminal:

```powershell
npx react-native run-android
```

### Step 2: Tunggu Upload Complete

Saat app pertama kali dibuka, akan otomatis upload data ke Firestore.

**Perhatikan:**

- Console log akan muncul: "📦 Uploading menu items..."
- Tunggu sampai muncul: "✅ Menu items uploaded successfully!"
- Lalu: "🔥 Uploading hot deals..."
- Dan: "✅ Hot deals uploaded successfully!"
- **Alert popup** akan muncul dengan detail upload

### Step 3: Verify di Firebase Console

1. Buka Firebase Console: <https://console.firebase.google.com/>
2. Pilih project "lavus-app"
3. Klik "Firestore Database"
4. Anda akan lihat 2 collections:
   - ✅ `menus` (17 documents)
   - ✅ `hotDeals` (6 documents)

### Step 4: Test di App

1. Buka **HomeScreen**
2. Cari tombol toggle di bawah search bar (development mode)
3. Tap untuk switch dari "📦 Mock Data" ke "🔥 Firestore"
4. **Data dari Firestore dengan gambar lokal akan muncul!** ✨

---

## 🔍 Yang Harus Dicek

### ✅ Upload Berhasil

- [ ] Alert "Success!" muncul dengan jumlah items
- [ ] Console log tidak ada error
- [ ] Firebase Console menunjukkan data

### ✅ Display Berhasil

- [ ] Toggle ke Firestore mode tidak error
- [ ] Menu items muncul dengan gambar yang benar
- [ ] Loading indicator muncul saat fetch
- [ ] Filtering by category bekerja

### ✅ Images Matching

- [ ] Salmon Salad pakai salad1.jpg
- [ ] Shrimp Salad pakai salad2.jpg
- [ ] Dan seterusnya...

---

## 🛠️ After First Upload

**PENTING!** Setelah upload berhasil, comment kembali di `App.tsx`:

```typescript
useEffect(() => {
  // Initialize Google Sign-In
  configureGoogleSignIn();

  // 🔥 FIRESTORE: Upload sample data (RUN ONCE!)
  // After successful upload, comment this line to prevent duplicates
  // uploadSampleData(); // ← COMMENT THIS!
}, []);
```

---

## 📊 Firestore Structure

### Collection: `menus`

```typescript
{
  id: "salad-1",
  name: "Salmon Salad",
  description: "Introduction about dishes",
  price: 39,
  rating: 5.0,
  reviewCount: 2000,
  category: "salad",
  imagePath: "local_salad_salad-1", // ← Reference ke local image
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Collection: `hotDeals`

```typescript
{
  id: "hd-001",
  type: "hero",
  label: "CUSTOMER BENEFITS",
  title: "Accumulate with ",
  description: "...",
  imagePath: "local_deal_hd-001", // ← Reference ke local image
  expiryDate: timestamp,
  discountPercent: 0,
  createdAt: timestamp
}
```

---

## 🎨 Image Mapping Logic

App akan otomatis match `imagePath` dengan local images:

1. **Firestore menyimpan:** `imagePath: "local_salad_salad-1"`
2. **App mencari** dalam mock data berdasarkan `id: "salad-1"`
3. **Return** `MenuImages.salad.salad1` (local image)
4. **Display** gambar lokal yang sudah ada ✨

**Advantage:**

- ✅ Tidak perlu upload gambar ke Firebase Storage
- ✅ App bekerja offline dengan gambar
- ✅ Konsisten dengan mock data yang ada
- ✅ Lebih cepat karena gambar sudah bundled

---

## 🚀 Next Steps (Optional)

### Setelah Basic Working

1. **Update HomeScreen original** untuk use Firestore by default
2. **Add Hot Deal screen** integration
3. **Add Reviews** read/write functionality
4. **Add Reservations** history
5. **Remove mock data** dan full pakai Firestore

### Future Enhancements

1. **Firebase Storage** untuk upload custom images
2. **Admin panel** untuk manage menu via web
3. **Real-time updates** saat data berubah
4. **Offline persistence** dengan Firestore cache
5. **Search functionality** dengan Firestore queries

---

## 🎉 Success Criteria

Aplikasi Anda akan perfect score (97-100%) jika:

✅ Database dibuat di Firebase Console  
✅ Sample data ter-upload (17 menus + 6 deals)  
✅ Data bisa di-fetch dari Firestore  
✅ Images dari local assets muncul dengan benar  
✅ Loading states working  
✅ Error handling proper  
✅ Toggle feature working

---

## 📞 Troubleshooting

### Error saat upload

```bash
# Rebuild clean
cd android
.\gradlew clean
cd ..
npx react-native run-android
```

### Data tidak muncul

- Check Firebase Console apakah data ada
- Check network connection
- Toggle ke Mock Data dulu, lalu balik ke Firestore

### Images tidak muncul

- Verify local images ada di `src/assets/images/MenuImages`
- Check console untuk error messages

---

**Ready to test! Run `npx react-native run-android` now!** 🚀
