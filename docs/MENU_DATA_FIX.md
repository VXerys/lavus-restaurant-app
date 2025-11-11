# Menu Data ID Synchronization Fix

## Problem Identified

Terdapat ketidaksesuaian ID antara data menu di `popularMenus.ts` dan `menuDetails.ts` yang menyebabkan detail menu tidak sesuai dengan card yang dipilih.

### Root Cause
- **popularMenus.ts** menggunakan format ID: `pm-salad-001`, `pm-drink-001`, etc.
- **menuDetails.ts** menggunakan format ID: `salad-1`, `drink-1`, etc.
- Ketika user menekan card, `HomeScreen` mengirim ID dengan format `pm-xxx-xxx`
- `MenuDetailScreen` mencari data menggunakan ID tersebut di `menuDetails.ts`
- Karena ID tidak match, selalu fallback ke default 'Salmon Salad'

## Solution Applied

### 1. Standardized ID Format
Mengubah semua ID di `popularMenus.ts` untuk mengikuti format yang sama dengan `menuDetails.ts`:

**Before:**
```typescript
{
  id: 'pm-salad-001',
  name: 'Salmon Salad',
  // ...
}
```

**After:**
```typescript
{
  id: 'salad-1',
  name: 'Salmon Salad',
  // ...
}
```

### 2. Updated Menu Names for Consistency
Memperbarui nama menu di `menuDetails.ts` agar sesuai dengan nama di `popularMenus.ts`:

#### Salads
- `salad-2`: Caesar Salad → **Shrimp Salad**
- `salad-3`: Greek Salad → **Lavu's Salad**
- `salad-4`: Avocado Chicken Salad → **Fruit Salad**
- `salad-5`: Quinoa Power Bowl → **Tofu Salad**

#### Drinks
- `drink-2`: Green Detox Smoothie → **Tropical Smoothie**
- `drink-3`: Mango Passion Smoothie → **Iced Coffee**
- `drink-4`: Berry Blast Smoothie → **Green Tea Latte**

#### Pizza
- `pizza-2`: Pepperoni Pizza → **Pepperoni Delight**
- `pizza-3`: BBQ Chicken Pizza → **Veggie Supreme**
- `pizza-4`: Vegetarian Supreme → **Hawaiian Pizza**

#### Pasta
- `pasta-2`: Pesto Linguine → **Bolognese**
- `pasta-3`: Bolognese Spaghetti → **Aglio Olio**
- `pasta-4`: Seafood Linguine → **Pesto Pasta**
- `pasta-5`: Truffle Mushroom Pasta → **Seafood Linguine**

### 3. Enhanced Error Handling
Ditambahkan proper error handling di `MenuDetailScreen.tsx`:

```typescript
const menuData = getMenuDetail(menuId);

// Fallback if menu not found
if (!menuData) {
  console.warn(`Menu with ID "${menuId}" not found. Falling back to default.`);
}

const displayData = menuData || {
  // default fallback data
};
```

### 4. Removed Unused Items
Menghapus item yang tidak memiliki pasangan di `menuDetails.ts`:
- `drink-5` (Berry Blast) - removed from popularMenus
- `dessert-5` (Cheesecake) - removed from popularMenus

## Benefits

### 1. **Data Consistency**
- Semua ID menggunakan format yang sama dan konsisten
- Nama menu sesuai antara list dan detail
- Gambar yang ditampilkan sesuai dengan menu yang dipilih

### 2. **Better Error Handling**
- Warning di console jika menu tidak ditemukan
- Fallback yang proper untuk mencegah app crash
- Easier debugging untuk development

### 3. **Maintainability**
- ID yang lebih sederhana dan mudah dibaca
- Struktur data yang konsisten
- Mudah untuk menambah menu baru

### 4. **Responsive & Performance**
- Tidak ada perubahan pada responsive design
- Tetap menggunakan image optimization yang sama
- Performance tidak terpengaruh

## Testing Checklist

- [x] ID synchronization antara popularMenus dan menuDetails
- [x] Nama menu sesuai di semua kategori
- [x] Navigation dari HomeScreen ke MenuDetail
- [x] Proper error handling dan fallback
- [x] Image loading yang benar
- [x] Responsive design tetap berfungsi
- [x] TypeScript type safety

## Files Modified

1. `src/mocks/data/popularMenus.ts`
   - Updated all menu IDs to match menuDetails format
   - Removed items without matching details

2. `src/mocks/data/menuDetails.ts`
   - Updated menu names to match popularMenus
   - Updated descriptions to match new menu items

3. `src/screens/MenuDetailScreen.tsx`
   - Enhanced error handling
   - Added proper fallback mechanism
   - Added console warning for debugging

## Future Recommendations

1. **Type Safety Enhancement**
   - Consider creating a shared MenuID type
   - Validate IDs at compile time

2. **Data Validation**
   - Add runtime validation for menu data
   - Create a utility to verify ID consistency

3. **Testing**
   - Add unit tests for menu data retrieval
   - Test navigation with various menu IDs

4. **Documentation**
   - Document ID naming convention
   - Create guide for adding new menu items
