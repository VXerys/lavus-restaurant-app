/**
 * Firestore Data Upload Helper - Clean Version
 * 
 * This script uploads sample data from local mock files to Firestore.
 * 
 * WHAT IT DOES:
 * - Loads menu and hot deal data from @mocks/data
 * - Converts ImageSourcePropType assets to string references
 * - Uploads to Firestore collections: 'menus' and 'hotDeals'
 * - Local images stay in app, only metadata goes to Firestore
 * 
 * USAGE:
 * 1. Uncomment uploadSampleData() in App.tsx
 * 2. Run app once
 * 3. Comment it back to prevent duplicates
 */

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

/**
 * Validate and load mock data
 * Catches import errors early before attempting upload
 */
const loadMockData = () => {
  try {
    const popularMenus = require('@mocks/data/popularMenus');
    const hotDeals = require('@mocks/data/hotDeals');
    
    const {
      saladMenuItems = [],
      drinkMenuItems = [],
      pizzaMenuItems = [],
      dessertMenuItems = [],
      pastaMenuItems = [],
    } = popularMenus;
    
    const { hotDealsData = [] } = hotDeals;
    
    const allMenus = [
      ...saladMenuItems,
      ...drinkMenuItems,
      ...pizzaMenuItems,
      ...dessertMenuItems,
      ...pastaMenuItems,
    ];
    
    if (allMenus.length === 0) {
      throw new Error('No menu items found in mock files');
    }
    
    if (hotDealsData.length === 0) {
      throw new Error('No hot deals found in mock files');
    }
    
    console.log(`✅ Loaded ${allMenus.length} menus, ${hotDealsData.length} deals`);
    
    return { menus: allMenus, deals: hotDealsData };
  } catch (error: any) {
    console.error('❌ Failed to load mock data:', error.message);
    throw new Error(`Mock data loading failed: ${error.message}`);
  }
};

/**
 * Convert menu items to Firestore format
 * 
 * IMPORTANT: image assets (require()) cannot be stored in Firestore
 * We store only the ID reference (e.g., "salad-1")
 * When reading from Firestore, map back to MenuImages.salad.salad1
 */
const convertMenusForFirestore = (menus: any[]) => {
  return menus.map(menu => ({
    originalId: menu.id,
    name: menu.name,
    description: menu.description || 'Delicious dish from our kitchen',
    price: Number(menu.price) || 0,
    rating: Number(menu.rating) || 0,
    reviewCount: Number(menu.reviewCount) || 0,
    category: menu.category,
    imageRef: menu.id, // Store ID only, not the actual image asset
    createdAt: firestore.Timestamp.now(),
    updatedAt: firestore.Timestamp.now(),
  }));
};

/**
 * Convert hot deals to Firestore format
 * Preserves type ('hero' or 'regular') and handles dates properly
 */
const convertDealsForFirestore = (deals: any[]) => {
  return deals.map(deal => {
    // Handle expiry date
    let expiryDate: Date;
    if (deal.validUntil) {
      expiryDate = new Date(deal.validUntil);
      if (isNaN(expiryDate.getTime())) {
        expiryDate = new Date('2099-12-31'); // Far future for invalid dates
      }
    } else {
      expiryDate = new Date('2099-12-31'); // No expiry
    }
    
    return {
      originalId: deal.id,
      type: deal.type, // Keep original: 'hero' or 'regular'
      label: deal.label || 'SPECIAL OFFER',
      title: deal.title,
      description: deal.description || '',
      imageRef: deal.id, // Store ID only
      expiryDate: firestore.Timestamp.fromDate(expiryDate),
      discount: Number(deal.discount) || 0,
      createdAt: firestore.Timestamp.now(),
    };
  });
};

/**
 * Test Firestore connection
 */
const testConnection = async (db: ReturnType<typeof firestore>): Promise<void> => {
  try {
    await db.collection('_connection_test').limit(1).get();
    console.log('✅ Connection OK');
  } catch (error: any) {
    const errorMessage = 
      'Firestore connection failed!\n\n' +
      'Possible causes:\n' +
      '• No internet connection\n' +
      '• Firestore not enabled in Firebase Console\n' +
      '• google-services.json missing/invalid\n\n' +
      `Error: ${error.message}`;
    throw new Error(errorMessage);
  }
};

/**
 * Upload menus to Firestore
 */
const uploadMenus = async (menus: any[]): Promise<boolean> => {
  console.log('\n📦 Uploading menus...');
  
  try {
    const converted = convertMenusForFirestore(menus);
    const db = firestore();
    const collection = db.collection('menus');
    
    let count = 0;
    const errors: string[] = [];
    
    for (const menu of converted) {
      try {
        await collection.add(menu);
        count++;
        console.log(`✅ [${count}/${converted.length}] ${menu.name}`);
      } catch (error: any) {
        errors.push(`${menu.name}: ${error.message}`);
        
        // Stop on permission error
        if (error.code === 'permission-denied') {
          throw new Error(
            'Permission denied!\n\n' +
            'Fix: Firebase Console → Firestore → Rules\n' +
            'Set: allow read, write: if true;'
          );
        }
      }
    }
    
    console.log(`\n📊 Menus: ${count}/${converted.length} uploaded`);
    if (errors.length > 0 && errors.length <= 3) {
      errors.forEach(err => console.log(`  ❌ ${err}`));
    }
    
    return count > 0;
  } catch (error: any) {
    console.error(`\n❌ Menu upload failed: ${error.message}`);
    throw error;
  }
};

/**
 * Upload hot deals to Firestore
 */
const uploadDeals = async (deals: any[]): Promise<boolean> => {
  console.log('\n🔥 Uploading hot deals...');
  
  try {
    const converted = convertDealsForFirestore(deals);
    const db = firestore();
    const collection = db.collection('hotDeals');
    
    let count = 0;
    const errors: string[] = [];
    
    for (const deal of converted) {
      try {
        await collection.add(deal);
        count++;
        console.log(`✅ [${count}/${converted.length}] ${deal.title}`);
      } catch (error: any) {
        errors.push(`${deal.title}: ${error.message}`);
        
        if (error.code === 'permission-denied') {
          throw new Error('Permission denied! Check Firestore rules.');
        }
      }
    }
    
    console.log(`\n📊 Deals: ${count}/${converted.length} uploaded`);
    if (errors.length > 0 && errors.length <= 3) {
      errors.forEach(err => console.log(`  ❌ ${err}`));
    }
    
    return count > 0;
  } catch (error: any) {
    console.error(`\n❌ Deal upload failed: ${error.message}`);
    throw error;
  }
};

/**
 * Check if data already exists
 */
const checkExistingData = async (): Promise<{ exists: boolean; count: number }> => {
  try {
    const db = firestore();
    
    const [menusSnap, dealsSnap] = await Promise.all([
      db.collection('menus').limit(1).get(),
      db.collection('hotDeals').limit(1).get(),
    ]);
    
    const exists = !menusSnap.empty || !dealsSnap.empty;
    const count = menusSnap.size + dealsSnap.size;
    
    if (exists) {
      console.log(`ℹ️  Found ${count} existing documents`);
    }
    
    return { exists, count };
  } catch (error: any) {
    console.warn(`⚠️  Cannot check existing data: ${error.message}`);
    return { exists: false, count: 0 };
  }
};

/**
 * Main upload function
 * Call this from App.tsx once
 */
export const uploadSampleData = async () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 FIRESTORE DATA UPLOAD');
  console.log('='.repeat(50) + '\n');
  
  try {
    // Step 1: Load mock data
    console.log('📋 Step 1/4: Loading mock data...');
    const mockData = loadMockData();
    
    // Step 2: Check existing data
    console.log('\n📋 Step 2/4: Checking existing data...');
    const { exists, count } = await checkExistingData();
    
    if (exists && count > 0) {
      console.log('\n⏭️  Skipping upload - data already exists\n');
      Alert.alert(
        'Data Already Exists',
        `Found ${count} documents in Firestore.\n\nSkipping upload to prevent duplicates.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Step 3: Test connection
    console.log('\n📋 Step 3/4: Testing connection...');
    const db = firestore();
    await testConnection(db);
    
    // Step 4: Upload data
    console.log('\n📋 Step 4/4: Uploading data...');
    const menusSuccess = await uploadMenus(mockData.menus);
    const dealsSuccess = await uploadDeals(mockData.deals);
    
    // Results
    console.log('\n' + '='.repeat(50));
    console.log('🎯 UPLOAD COMPLETE');
    console.log('='.repeat(50));
    console.log(`Menus: ${menusSuccess ? '✅' : '❌'}`);
    console.log(`Deals: ${dealsSuccess ? '✅' : '❌'}`);
    console.log('='.repeat(50) + '\n');
    
    if (menusSuccess && dealsSuccess) {
      Alert.alert(
        '🎉 Success!',
        `Uploaded to Firestore:\n\n✅ ${mockData.menus.length} menu items\n✅ ${mockData.deals.length} hot deals\n\nYou can now use Firestore mode!`,
        [{ text: 'Great!' }]
      );
    } else if (menusSuccess || dealsSuccess) {
      Alert.alert(
        '⚠️ Partial Success',
        'Some data uploaded, some failed.\n\nCheck console for error details.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        '❌ Upload Failed',
        'No data was uploaded.\n\nCheck:\n• Internet connection\n• Firestore enabled\n• Rules allow write\n• google-services.json valid\n\nSee console for details.',
        [{ text: 'OK' }]
      );
    }
  } catch (error: any) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ UPLOAD FAILED');
    console.error('='.repeat(50));
    console.error(error.message);
    console.error('='.repeat(50) + '\n');
    
    Alert.alert(
      '❌ Error',
      `Upload failed:\n\n${error.message}\n\nCheck console for details.`,
      [{ text: 'OK' }]
    );
  }
};

/**
 * Clear all data from Firestore (use with caution!)
 */
export const clearAllData = async () => {
  try {
    console.log('\n🗑️  Clearing Firestore data...');
    
    const db = firestore();
    
    // Delete menus
    const menusSnapshot = await db.collection('menus').get();
    for (const doc of menusSnapshot.docs) {
      await doc.ref.delete();
    }
    console.log(`✅ Deleted ${menusSnapshot.size} menus`);
    
    // Delete deals
    const dealsSnapshot = await db.collection('hotDeals').get();
    for (const doc of dealsSnapshot.docs) {
      await doc.ref.delete();
    }
    console.log(`✅ Deleted ${dealsSnapshot.size} deals\n`);
    
    Alert.alert('✅ Success', 'All data cleared from Firestore.');
  } catch (error: any) {
    console.error('❌ Clear failed:', error.message);
    Alert.alert('❌ Error', `Failed to clear data: ${error.message}`);
  }
};
