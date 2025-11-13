# 🔥 Firestore Upload Troubleshooting Guide

## 📋 Alur Kerja Upload Data

### **Flow Diagram:**
```
App Start
   ↓
App.tsx → useEffect()
   ↓
testFirestoreConnection() (STEP 1 - Uncomment untuk test)
   ↓
   ├─ Test Import ✅
   ├─ Test Instance ✅
   ├─ Test Connection ✅
   ├─ Test Read ✅
   └─ Test Write ✅
   ↓
uploadSampleData() (STEP 2 - Setelah test berhasil)
   ↓
checkDataExists()
   ↓
   ├─ Data exists? → Skip upload
   └─ Data empty? → Continue
       ↓
       ├─ uploadMenus()
       │   ├─ Get mock data from popularMenus.ts
       │   ├─ Convert to Firestore format
       │   ├─ Loop & upload to 'menus' collection
       │   └─ Return success/fail
       │
       └─ uploadHotDeals()
           ├─ Get mock data from hotDeals.ts
           ├─ Convert to Firestore format
           ├─ Loop & upload to 'hotDeals' collection
           └─ Return success/fail
   ↓
Show Result Alert
```

---

## 🚨 Common Problems & Solutions

### **Problem 1: "Upload Failed, No Data Was Uploaded"**

#### **Penyebab A: Firestore Belum Diaktifkan**
**Solusi:**
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project Anda
3. Menu kiri: **Firestore Database**
4. Klik **"Create database"** (jika belum ada)
5. Pilih **"Start in test mode"** (untuk development)
6. Pilih location (asia-southeast2 untuk Singapore)
7. Klik **"Enable"**

#### **Penyebab B: Permission Denied (Rules terlalu ketat)**
**Solusi:**
1. Firebase Console → **Firestore Database** → Tab **"Rules"**
2. Paste rules ini (untuk development):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ⚠️ Development only!
    }
  }
}
```
3. Klik **"Publish"**

⚠️ **Warning:** Rules ini untuk development only! Untuk production, gunakan rules yang lebih secure.

#### **Penyebab C: google-services.json Salah/Tidak Ada**
**Solusi:**
1. Firebase Console → Project Settings → **"Your apps"**
2. Pilih Android app (atau add app jika belum ada)
3. Download **google-services.json** yang baru
4. Copy ke: `android/app/google-services.json`
5. Rebuild app:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### **Penyebab D: Tidak Ada Internet**
**Solusi:**
- Pastikan device/emulator terhubung ke internet
- Test dengan buka browser di emulator
- Cek WiFi/data cellular

#### **Penyebab E: Firebase Package Belum Terinstall Benar**
**Solusi:**
```bash
# Reinstall packages
npm install @react-native-firebase/app @react-native-firebase/firestore

# Clean build
cd android
./gradlew clean
cd ..

# Rebuild
npx react-native run-android
```

---

## 🧪 Testing Process

### **Step 1: Test Connection**

Edit `App.tsx`:
```typescript
useEffect(() => {
  configureGoogleSignIn();
  
  // UNCOMMENT THIS:
  testFirestoreConnection();
  
  // COMMENT THIS:
  // uploadSampleData();
}, []);
```

Run app dan lihat hasil test di console. Akan ada 5 test:
1. ✅ Import check
2. ✅ Instance check
3. ✅ Connection check
4. ✅ Read check
5. ✅ Write check

Jika **SEMUA PASS** → lanjut ke Step 2

### **Step 2: Upload Data**

Edit `App.tsx`:
```typescript
useEffect(() => {
  configureGoogleSignIn();
  
  // COMMENT THIS:
  // testFirestoreConnection();
  
  // UNCOMMENT THIS:
  uploadSampleData();
}, []);
```

Run app dan tunggu alert "Success!"

### **Step 3: Verify Data**

Buka Firebase Console → Firestore Database

Harus ada 2 collections:
- **menus** (13 documents)
- **hotDeals** (3 documents)

---

## 📊 Understanding Console Logs

### **Successful Upload Logs:**
```
🚀 Starting Firestore data upload...
🔍 Checking if data already exists...
✅ No existing data found, ready to upload
📦 Starting menu upload...
📦 Found 13 menu items to upload
🔄 Getting Firestore instance...
🔄 Testing Firestore connection...
✅ Firestore connection successful
⏳ [1/13] Uploading: Salmon Salad...
✅ [1/13] Salmon Salad → ID: xyz123
...
🎉 Menu upload complete: 13 items uploaded!
🔥 Starting hot deals upload...
...
🎉 All sample data uploaded successfully!
```

### **Failed Upload Logs (Connection Issue):**
```
🚀 Starting Firestore data upload...
🔍 Checking if data already exists...
📦 Starting menu upload...
📦 Found 13 menu items to upload
🔄 Getting Firestore instance...
🔄 Testing Firestore connection...
❌ Firestore connection failed: [ERROR]
```
**→ Problem: Cannot connect to Firestore**

### **Failed Upload Logs (Permission Issue):**
```
...
✅ Firestore connection successful
⏳ [1/13] Uploading: Salmon Salad...
❌ Failed to upload Salmon Salad: [permission-denied]
```
**→ Problem: Firestore rules blocking access**

### **Failed Upload Logs (No Mock Data):**
```
📦 Starting menu upload...
📦 Found 0 menu items to upload
❌ No menu data found in mock files
```
**→ Problem: Mock files not found/imported correctly**

---

## 🔍 Debugging Checklist

### **Before Running Upload:**
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Rules set to allow read/write (test mode)
- [ ] `google-services.json` in `android/app/`
- [ ] Package ID matches Firebase (check `android/app/build.gradle`)
- [ ] App rebuilt after adding google-services.json
- [ ] Device/emulator has internet connection

### **During Upload:**
- [ ] Watch Metro Bundler console for logs
- [ ] Check for error messages
- [ ] Note where it stops (connection? permission? data?)

### **After Upload:**
- [ ] Check Firebase Console → Firestore Database
- [ ] Verify collections exist (menus, hotDeals)
- [ ] Count documents (should be 13 menus, 3 deals)
- [ ] Comment out `uploadSampleData()` to prevent duplicates

---

## 💡 Quick Commands

### **Check if Firestore is working:**
```bash
# Run app
npx react-native run-android

# Watch logs
npx react-native log-android
```

### **Clean rebuild if needed:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### **Check Firebase package:**
```bash
npm list @react-native-firebase/firestore
```

---

## 📝 File Structure

```
src/
├── utils/
│   ├── uploadFirestoreData.ts    ← Main upload script
│   └── testFirestore.ts           ← Connection test utility
├── mocks/
│   └── data/
│       ├── popularMenus.ts        ← Menu mock data
│       └── hotDeals.ts            ← Hot deals mock data
└── services/
    └── firestoreService.ts        ← Firestore CRUD operations
```

---

## 🎯 Expected Result

### **In Firebase Console:**

**Collection: `menus`** (13 documents)
```
Document fields:
- originalId: string
- name: string
- description: string
- price: number
- rating: number
- reviewCount: number
- category: string
- imagePath: string
- createdAt: timestamp
- updatedAt: timestamp
```

**Collection: `hotDeals`** (3 documents)
```
Document fields:
- originalId: string
- type: string (buy1get1 | discount)
- label: string
- title: string
- description: string
- imagePath: string
- expiryDate: timestamp
- discountPercent: number
- createdAt: timestamp
```

---

## 🆘 Still Having Issues?

### **Check Console Output:**
1. Run: `npx react-native run-android`
2. Open another terminal: `npx react-native log-android`
3. Copy **SEMUA** log output dari console
4. Look for:
   - Error messages
   - Stack traces
   - Firebase-related errors

### **Common Error Messages:**

| Error | Meaning | Solution |
|-------|---------|----------|
| `Default FirebaseApp is not initialized` | Firebase not setup | Check google-services.json |
| `permission-denied` | Firestore rules blocking | Update Firestore rules |
| `network-request-failed` | No internet | Check connection |
| `not-found` | Collection/doc missing | Normal for first run |
| `already-exists` | Duplicate write | Data already uploaded |

---

## 📚 Additional Resources

- [Firebase Console](https://console.firebase.google.com)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Native Firebase Docs](https://rnfirebase.io)
- Project docs: `docs/FIRESTORE_SETUP.md`

---

**Last Updated:** December 2024
