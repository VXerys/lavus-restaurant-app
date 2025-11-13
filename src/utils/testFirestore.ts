/**
 * Firestore Connection Test Utility
 * 
 * Test your Firestore connection step by step
 * to identify where the issue is
 */

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const testFirestoreConnection = async () => {
  console.log('\n🔍 ===== FIRESTORE CONNECTION TEST =====\n');
  
  const results = {
    importSuccess: false,
    instanceSuccess: false,
    connectionSuccess: false,
    readSuccess: false,
    writeSuccess: false,
  };
  
  try {
    // Test 1: Import Check
    console.log('📦 Test 1: Checking @react-native-firebase/firestore import...');
    if (firestore) {
      console.log('✅ Import successful');
      results.importSuccess = true;
    } else {
      console.log('❌ Import failed - firestore is undefined');
      throw new Error('Firestore import failed');
    }
    
    // Test 2: Instance Check
    console.log('\n🔧 Test 2: Getting Firestore instance...');
    const db = firestore();
    if (db) {
      console.log('✅ Firestore instance created');
      results.instanceSuccess = true;
    } else {
      console.log('❌ Failed to get Firestore instance');
      throw new Error('Could not create Firestore instance');
    }
    
    // Test 3: Connection Test
    console.log('\n🌐 Test 3: Testing Firestore connection...');
    try {
      await db.collection('_connection_test').limit(1).get();
      console.log('✅ Firestore connection successful');
      results.connectionSuccess = true;
    } catch (connError: any) {
      console.log('❌ Connection failed:', connError.message);
      console.log('   Error code:', connError.code);
      throw connError;
    }
    
    // Test 4: Read Test
    console.log('\n📖 Test 4: Testing read operation...');
    try {
      const snapshot = await db.collection('menus').limit(1).get();
      console.log('✅ Read operation successful');
      console.log(`   Found ${snapshot.size} documents`);
      results.readSuccess = true;
    } catch (readError: any) {
      console.log('❌ Read failed:', readError.message);
      throw readError;
    }
    
    // Test 5: Write Test
    console.log('\n✍️ Test 5: Testing write operation...');
    try {
      const testDoc = {
        test: true,
        timestamp: firestore.Timestamp.now(),
        message: 'Connection test successful',
      };
      
      const docRef = await db.collection('_connection_test').add(testDoc);
      console.log('✅ Write operation successful');
      console.log(`   Document ID: ${docRef.id}`);
      
      // Clean up test document
      await db.collection('_connection_test').doc(docRef.id).delete();
      console.log('✅ Test document cleaned up');
      
      results.writeSuccess = true;
    } catch (writeError: any) {
      console.log('❌ Write failed:', writeError.message);
      console.log('   This might be a permissions issue');
      throw writeError;
    }
    
    // Success Summary
    console.log('\n🎉 ===== ALL TESTS PASSED =====');
    console.log('✅ Import: OK');
    console.log('✅ Instance: OK');
    console.log('✅ Connection: OK');
    console.log('✅ Read: OK');
    console.log('✅ Write: OK');
    console.log('\n💡 Firestore is working correctly!');
    
    Alert.alert(
      '🎉 Success!',
      'All Firestore tests passed!\n\n' +
      '✅ Import\n' +
      '✅ Connection\n' +
      '✅ Read\n' +
      '✅ Write\n\n' +
      'You can now upload sample data.',
      [{ text: 'Great!' }]
    );
    
    return true;
    
  } catch (error: any) {
    console.log('\n❌ ===== TEST FAILED =====');
    console.log('Test Results:');
    console.log(`  Import: ${results.importSuccess ? '✅' : '❌'}`);
    console.log(`  Instance: ${results.instanceSuccess ? '✅' : '❌'}`);
    console.log(`  Connection: ${results.connectionSuccess ? '✅' : '❌'}`);
    console.log(`  Read: ${results.readSuccess ? '✅' : '❌'}`);
    console.log(`  Write: ${results.writeSuccess ? '✅' : '❌'}`);
    console.log('\nError Details:');
    console.log(`  Message: ${error.message}`);
    console.log(`  Code: ${error.code || 'N/A'}`);
    
    // Specific error guidance
    let guidance = '';
    if (!results.importSuccess) {
      guidance = '❌ Firestore package not installed correctly.\n\n' +
        'Fix:\n' +
        '1. Run: npm install @react-native-firebase/app @react-native-firebase/firestore\n' +
        '2. Run: cd android && ./gradlew clean\n' +
        '3. Rebuild app';
    } else if (!results.instanceSuccess) {
      guidance = '❌ Firebase app not initialized.\n\n' +
        'Fix:\n' +
        '1. Check google-services.json in android/app/\n' +
        '2. Check Firebase config in android/build.gradle';
    } else if (!results.connectionSuccess) {
      guidance = '❌ Cannot connect to Firestore.\n\n' +
        'Possible causes:\n' +
        '• No internet connection\n' +
        '• Firestore not enabled in Firebase Console\n' +
        '• Wrong Firebase project\n\n' +
        'Fix:\n' +
        '1. Check internet connection\n' +
        '2. Go to Firebase Console > Firestore Database\n' +
        '3. Click "Create Database" if not exists';
    } else if (!results.readSuccess || !results.writeSuccess) {
      guidance = '❌ Permission denied.\n\n' +
        'Fix:\n' +
        '1. Go to Firebase Console > Firestore Database\n' +
        '2. Click "Rules" tab\n' +
        '3. Set rules to:\n\n' +
        'rules_version = \'2\';\n' +
        'service cloud.firestore {\n' +
        '  match /databases/{database}/documents {\n' +
        '    match /{document=**} {\n' +
        '      allow read, write: if true;\n' +
        '    }\n' +
        '  }\n' +
        '}\n\n' +
        '4. Publish rules';
    }
    
    Alert.alert(
      '❌ Firestore Test Failed',
      guidance || `Error: ${error.message}\n\nCheck console for details.`,
      [{ text: 'OK' }]
    );
    
    return false;
  }
};

/**
 * Quick connection check (simpler version)
 */
export const quickFirestoreCheck = async (): Promise<boolean> => {
  try {
    const db = firestore();
    await db.collection('_test').limit(1).get();
    console.log('✅ Firestore is ready');
    return true;
  } catch (error: any) {
    console.error('❌ Firestore not ready:', error.message);
    return false;
  }
};

/**
 * Check Firestore Rules
 */
export const checkFirestoreRules = async () => {
  console.log('\n🔐 Checking Firestore Rules...');
  
  try {
    const db = firestore();
    
    // Try to write to test collection
    console.log('Testing write permission...');
    const testRef = await db.collection('_rules_test').add({
      test: true,
      timestamp: firestore.Timestamp.now(),
    });
    console.log('✅ Write permission: OK');
    
    // Try to read
    console.log('Testing read permission...');
    await db.collection('_rules_test').doc(testRef.id).get();
    console.log('✅ Read permission: OK');
    
    // Clean up
    await db.collection('_rules_test').doc(testRef.id).delete();
    console.log('✅ Delete permission: OK');
    
    Alert.alert(
      '✅ Rules OK',
      'Firestore rules allow read and write operations.',
      [{ text: 'Great!' }]
    );
    
    return true;
  } catch (error: any) {
    console.error('❌ Rules check failed:', error.message);
    
    if (error.code === 'permission-denied') {
      Alert.alert(
        '🔐 Permission Denied',
        'Firestore rules are blocking access.\n\n' +
        'Fix:\n' +
        '1. Go to Firebase Console\n' +
        '2. Firestore Database > Rules\n' +
        '3. Set to allow read/write\n' +
        '4. Publish rules',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        '❌ Error',
        `Rules check failed: ${error.message}`,
        [{ text: 'OK' }]
      );
    }
    
    return false;
  }
};
