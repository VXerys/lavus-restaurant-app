import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize auth instance once to avoid deprecated v8 method warnings
const authInstance = auth();

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '1085983698799-kj8emrmoo8rnb3p1017pbve4lthd4r06.apps.googleusercontent.com',
  });
};

export interface AuthError {
  code: string;
  message: string;
}

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
    
    // Update display name
    await userCredential.user.updateProfile({
      displayName: displayName,
    });

    // Send email verification
    await userCredential.user.sendEmailVerification();

    return userCredential.user;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Resend Email Verification
export const resendVerificationEmail = async () => {
  try {
    const currentUser = authInstance.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    if (currentUser.emailVerified) {
      throw new Error('Email already verified');
    }

    await currentUser.sendEmailVerification();
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Check if Email is Verified
export const checkEmailVerified = async (): Promise<boolean> => {
  try {
    const currentUser = authInstance.currentUser;
    if (!currentUser) {
      return false;
    }

    // Reload user to get latest verification status
    await currentUser.reload();
    return currentUser.emailVerified;
  } catch (error: any) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    // Check if device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Force account chooser: clear any cached Google user so the account
    // selection UI is shown each time the user taps the Google button.
    // This ensures the user must explicitly pick an account instead of
    // automatically reusing a previously cached account.
    try {
      await GoogleSignin.signOut();
    } catch {
      // Ignore signOut errors (may not be signed in) and continue to signIn
    }

    // Get user ID token
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    
    if (!idToken) {
      throw new Error('Failed to get ID token from Google');
    }
    
    // Create Google credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign in with credential
    const userCredential = await authInstance.signInWithCredential(googleCredential);
    return userCredential.user;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Sign Out
export const signOut = async () => {
  try {
    // Try to sign out from Google (might not be signed in with Google)
    try {
      await GoogleSignin.signOut();
    } catch {
      // Ignore error if not signed in with Google
    }
    
    // Sign out from Firebase
    await authInstance.signOut();
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await authInstance.sendPasswordResetEmail(email);
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

// Error Handler
const handleAuthError = (error: any): AuthError => {
  let message = 'An error occurred';

  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address';
      break;
    case 'auth/weak-password':
      message = 'Password should be at least 6 characters';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password';
      break;
    case 'auth/too-many-requests':
      message = 'Too many attempts. Please try again later';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection';
      break;
    default:
      message = error.message || 'Authentication failed';
  }

  return {
    code: error.code || 'unknown',
    message,
  };
};
