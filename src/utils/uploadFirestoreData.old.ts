/**
 * Firestore Data Upload Helper
 * 
 * This script helps you upload sample data to Firestore.
 * Run this ONCE to populate your database.
 * 
 * Usage:
 * 1. Uncomment the uploadSampleData() call in App.tsx useEffect
 * 2. Run the app once
 * 3. Comment it back to prevent duplicate uploads
 */

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

/**
 * Validate mock data imports
 * This catches import errors early before attempting upload
 */
const validateMockDataImports = () => {
  try {
    // Dynamic import to catch errors
    const popularMenus = require('@mocks/data/popularMenus');
    const hotDeals = require('@mocks/data/hotDeals');
    
    const {
      saladMenuItems,
      drinkMenuItems,
      pizzaMenuItems,
      dessertMenuItems,
      pastaMenuItems,
    } = popularMenus;
    
    const { hotDealsData } = hotDeals;
    
    // Validate arrays exist and are not empty
    const menuArrays = [
      { name: 'saladMenuItems', data: saladMenuItems },
      { name: 'drinkMenuItems', data: drinkMenuItems },
      { name: 'pizzaMenuItems', data: pizzaMenuItems },
      { name: 'dessertMenuItems', data: dessertMenuItems },
      { name: 'pastaMenuItems', data: pastaMenuItems },
    ];
    
    for (const arr of menuArrays) {
      if (!Array.isArray(arr.data) || arr.data.length === 0) {
        throw new Error(`${arr.name} is empty or not an array`);
      }
    }
    
    if (!Array.isArray(hotDealsData) || hotDealsData.length === 0) {
      throw new Error('hotDealsData is empty or not an array');
    }
    
    console.log('✅ Mock data imports validated successfully');
    
    return {
      menus: [
        ...saladMenuItems,
        ...drinkMenuItems,
        ...pizzaMenuItems,
        ...dessertMenuItems,
        ...pastaMenuItems,
      ],
      deals: hotDealsData,
    };
  } catch (error: any) {
    console.error('❌ Failed to import mock data:', error.message);
    throw new Error(`Mock data import failed: ${error.message}`);
  }
};

/**
 * Convert local menu data to Firestore format
 * Image assets (require()) cannot be stored in Firestore
 * We store only the reference ID, then map back to local images when reading
 */
const convertMenuToFirestore = (menus: any[]) => {
  console.log(`📦 Converting ${menus.length} menu items to Firestore format...`);
  
  return menus.map(menu => {
    // Validate required fields
    if (!menu.id || !menu.name || !menu.category) {
      console.warn(`⚠️ Menu item missing required fields:`, menu);
      throw new Error(`Invalid menu item: ${menu.name || 'Unknown'}`);
    }
    
    return {
      originalId: menu.id,
      name: menu.name,
      description: menu.description || 'Delicious dish from our kitchen',
      price: Number(menu.price) || 0,
      rating: Number(menu.rating) || 0,
      reviewCount: Number(menu.reviewCount) || 0,
      category: menu.category,
      // Store only the ID reference, not the actual image asset
      // When reading from Firestore, we'll map this back to MenuImages
      imageRef: menu.id, // e.g., "salad-1" maps to MenuImages.salad.salad1
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
    };
  });
};

/**
 * Convert hot deals to Firestore format
 * Preserve original type (hero/regular) and handle optional fields properly
 */
const convertHotDealsToFirestore = (deals: any[]) => {
  console.log(`🔥 Converting ${deals.length} hot deals to Firestore format...`);
  
  return deals.map(deal => {
    // Validate required fields
    if (!deal.id || !deal.title || !deal.type) {
      console.warn(`⚠️ Deal missing required fields:`, deal);
      throw new Error(`Invalid deal: ${deal.title || 'Unknown'}`);
    }
    
    // Calculate expiry date
    let expiryDate: Date;
    if (deal.validUntil) {
      expiryDate = new Date(deal.validUntil);
      // If invalid date, set to far future
      if (isNaN(expiryDate.getTime())) {
        console.warn(`⚠️ Invalid date for deal ${deal.id}, using default`);
        expiryDate = new Date('2025-12-31T23:59:59.000Z');
      }
    } else {
      // No expiry date = valid indefinitely (set far future)
      expiryDate = new Date('2099-12-31T23:59:59.000Z');
    }
    
    return {
      originalId: deal.id,
      type: deal.type, // Keep original: 'hero' or 'regular'
      label: deal.label || 'SPECIAL OFFER',
      title: deal.title,
      description: deal.description || '',
      // Store image reference ID to map back to local assets
      imageRef: deal.id, // e.g., "hd-001" maps to HotDealImages
      expiryDate: firestore.Timestamp.fromDate(expiryDate),
      discount: Number(deal.discount) || 0,
      createdAt: firestore.Timestamp.now(),
    };
  });
};

/**
 * Upload menu items to Firestore
 */
const uploadMenus = async (menus: any[]): Promise<boolean> => {
  console.log('\n📦 Starting menu upload...');
  
  try {
    // Convert menus to Firestore format
    const menusToUpload = convertMenuToFirestore(menus);
    console.log(`📦 Prepared ${menusToUpload.length} menu items for upload`);
    
    // Get Firestore instance
    const db = firestore();
    
    // Test connection first
    console.log('🔄 Testing Firestore connection...');
    try {
      await db.collection('_connection_test').limit(1).get();
      console.log('✅ Connection successful');
    } catch (connError: any) {
      console.error('❌ Connection failed:', connError.message);
      throw new Error(
        `Firestore connection failed: ${connError.message}\n\n` +
        'Possible causes:\n' +
        '• No internet connection\n' +
        '• Firestore not enabled in Firebase Console\n' +
        '• google-services.json missing or invalid'
      );
    }
    
    const menusCollection = db.collection('menus');
    let uploadCount = 0;
    const errors: string[] = [];
    
    // Upload in small batches to avoid overwhelming Firestore
    console.log('📤 Uploading to Firestore...');
    for (let i = 0; i < menusToUpload.length; i++) {
      const menu = menusToUpload[i];
      try {
        const docRef = await menusCollection.add(menu);
        uploadCount++;
        console.log(`✅ [${uploadCount}/${menusToUpload.length}] ${menu.name} → ${docRef.id}`);
      } catch (uploadError: any) {
        const errorMsg = `${menu.name}: ${uploadError.message}`;
        console.error(`❌ ${errorMsg}`);
        errors.push(errorMsg);
        
        // If permission error, stop immediately
        if (uploadError.code === 'permission-denied') {
          throw new Error(
            'Permission denied! Update Firestore rules:\n\n' +
            'Go to Firebase Console → Firestore Database → Rules\n' +
            'Set: allow read, write: if true;'
          );
        }
      }
    }
    
    // Summary
    console.log('\n📊 Menu Upload Summary:');
    console.log(`  ✅ Uploaded: ${uploadCount}/${menusToUpload.length}`);
    console.log(`  ❌ Failed: ${errors.length}`);
    
    if (errors.length > 0 && errors.length < 5) {
      console.log('\n❌ Errors:');
      errors.forEach((err) => console.log(`  • ${err}`));
    }
    
    return uploadCount > 0;
    
  } catch (error: any) {
    console.error('\n❌ CRITICAL ERROR in uploadMenus:');
    console.error(`  ${error.message}`);
    return false;
  }
};

/**
 * Upload hot deals to Firestore
 */
const uploadHotDeals = async (deals: any[]): Promise<boolean> => {
  console.log('\n🔥 Starting hot deals upload...');
  
  try {
    // Convert deals to Firestore format
    const dealsToUpload = convertHotDealsToFirestore(deals);
    console.log(`🔥 Prepared ${dealsToUpload.length} hot deals for upload`);
    
    const db = firestore();
    const dealsCollection = db.collection('hotDeals');
    let uploadCount = 0;
    const errors: string[] = [];
    
    console.log('📤 Uploading to Firestore...');
    for (let i = 0; i < dealsToUpload.length; i++) {
      const deal = dealsToUpload[i];
      try {
        const docRef = await dealsCollection.add(deal);
        uploadCount++;
        console.log(`✅ [${uploadCount}/${dealsToUpload.length}] ${deal.title} → ${docRef.id}`);
      } catch (uploadError: any) {
        const errorMsg = `${deal.title}: ${uploadError.message}`;
        console.error(`❌ ${errorMsg}`);
        errors.push(errorMsg);
        
        if (uploadError.code === 'permission-denied') {
          throw new Error('Permission denied! Check Firestore rules.');
        }
      }
    }
    
    // Summary
    console.log('\n📊 Hot Deals Upload Summary:');
    console.log(`  ✅ Uploaded: ${uploadCount}/${dealsToUpload.length}`);
    console.log(`  ❌ Failed: ${errors.length}`);
    
    if (errors.length > 0 && errors.length < 5) {
      console.log('\n❌ Errors:');
      errors.forEach((err) => console.log(`  • ${err}`));
    }
    
    return uploadCount > 0;
    
  } catch (error: any) {
    console.error('\n❌ CRITICAL ERROR in uploadHotDeals:');
    console.error(`  ${error.message}`);
    return false;
  }
};

/**
 * Check if data already exists in Firestore
 */
const checkDataExists = async (): Promise<{ exists: boolean; count: number }> => {
  try {
    console.log('\n🔍 Checking existing data...');
    const db = firestore();
    
    const [menusSnapshot, dealsSnapshot] = await Promise.all([
      db.collection('menus').limit(1).get(),
      db.collection('hotDeals').limit(1).get(),
    ]);
    
    const menuCount = menusSnapshot.size;
    const dealCount = dealsSnapshot.size;
    const exists = !menusSnapshot.empty || !dealsSnapshot.empty;
    
    if (exists) {
      console.log(`ℹ️  Found existing data: ${menuCount} menus, ${dealCount} deals`);
    } else {
      console.log('✅ No existing data - ready for upload');
    }
    
    return { exists, count: menuCount + dealCount };
  } catch (error: any) {
    console.error('❌ Error checking data:', error.message);
    // If permission denied, data checking failed but upload might still work
    if (error.code === 'permission-denied') {
      console.log('⚠️  Cannot check existing data due to permissions');
    }
    return { exists: false, count: 0 };
  }
};

/**
 * Main upload function
 * This is the entry point - call from App.tsx once
 */
export const uploadSampleData = async () => {
  console.log('\n🚀 ========================================');
  console.log('🚀 FIRESTORE DATA UPLOAD STARTING');
  console.log('🚀 ========================================\n');
  
  try {
    // Step 1: Validate and load mock data
    console.log('📋 Step 1: Loading mock data...');
    const mockData = validateMockDataImports();
    console.log(`✅ Loaded ${mockData.menus.length} menus and ${mockData.deals.length} deals`);
    
    // Step 2: Check if data already exists
    console.log('\n📋 Step 2: Checking for existing data...');
    const { exists, count } = await checkDataExists();
    
    if (exists && count > 0) {
      console.log('\n⏭️  Skipping upload - data already exists');
      Alert.alert(
        'Data Already Exists',
        `Found ${count} existing documents in Firestore.\n\nSkipping upload to prevent duplicates.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Step 3: Upload menus
    console.log('\n📋 Step 3: Uploading menu items...');
    const menusSuccess = await uploadMenus(mockData.menus);
    
    // Step 4: Upload hot deals
    console.log('\n📋 Step 4: Uploading hot deals...');
    const dealsSuccess = await uploadHotDeals(mockData.deals);
    
    // Final results
    console.log('\n🎯 ========================================');
    console.log('🎯 UPLOAD COMPLETE');
    console.log('🎯 ========================================');
    console.log(`  Menus: ${menusSuccess ? '✅ Success' : '❌ Failed'}`);
    console.log(`  Deals: ${dealsSuccess ? '✅ Success' : '❌ Failed'}`);
    console.log('🎯 ========================================\n');
    
    if (menusSuccess && dealsSuccess) {
      Alert.alert(
        '🎉 Upload Successful!',
        `Data uploaded to Firestore:\n\n✅ ${mockData.menus.length} menu items\n✅ ${mockData.deals.length} hot deals\n\nYou can now use Firestore mode in the app!`,
        [{ text: 'Great!' }]
      );
    } else if (menusSuccess || dealsSuccess) {
      Alert.alert(
        '⚠️ Partial Success',
        'Some data was uploaded successfully, but some failed.\n\nCheck Metro console for detailed error logs.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        '❌ Upload Failed',
        'No data was uploaded to Firestore.\n\nPlease check:\n• Internet connection\n• Firestore is enabled\n• Firestore rules allow write\n• google-services.json is valid\n\nSee console for detailed errors.',
        [{ text: 'OK' }]
      );
    }
  } catch (error: any) {
    console.error('\n❌ ========================================');
    console.error('❌ UPLOAD FAILED');
    console.error('❌ ========================================');
    console.error(`Error: ${error.message}`);
    console.error('❌ ========================================\n');
    
    Alert.alert(
      '❌ Error',
      `Upload failed: ${error.message}\n\nCheck console for details.`,
      [{ text: 'OK' }]
    );
  }
};

/**
 * Clear all data (use with caution!)
 */
export const clearAllData = async () => {
  try {
    console.log('🗑️ Starting data cleanup...');
    
    const db = firestore();
    
    // Delete all menus
    console.log('🗑️ Deleting menus...');
    const menusSnapshot = await db.collection('menus').get();
    for (const doc of menusSnapshot.docs) {
      await db.collection('menus').doc(doc.id).delete();
    }
    console.log(`✅ Deleted ${menusSnapshot.docs.length} menu items`);
    
    // Delete all hot deals
    console.log('🗑️ Deleting hot deals...');
    const dealsSnapshot = await db.collection('hotDeals').get();
    for (const doc of dealsSnapshot.docs) {
      await db.collection('hotDeals').doc(doc.id).delete();
    }
    console.log(`✅ Deleted ${dealsSnapshot.docs.length} hot deals`);
    
    console.log('✅ All data cleared!');
    Alert.alert('Success', 'All data has been cleared from Firestore.');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    Alert.alert('Error', 'Failed to clear data.');
  }
};
