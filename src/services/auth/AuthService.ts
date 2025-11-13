import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize auth instance once to avoid deprecated v8 method warnings
const authInstance = auth();

/**
 * Auth Service
 * Handles all Firebase Authentication operations
 */
class AuthService {
  /**
   * Initialize Google Sign-In
   * Call this in App.tsx on mount
   */
  static initialize() {
    GoogleSignin.configure({
      webClientId: '1085983698799-kj8emrmoo8rnb3p1017pbve4lthd4r06.apps.googleusercontent.com',
    });
  }

  /**
   * Sign up with email and password
   */
  static async signUpWithEmail(
    email: string,
    password: string,
    displayName?: string
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
      
      // Update display name if provided
      if (displayName && userCredential.user) {
        await userCredential.user.updateProfile({
          displayName,
        });
      }

      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with email and password
   */
  static async signInWithEmail(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      return await authInstance.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get user's ID token
      const signInResult = await GoogleSignin.signIn();
      
      if (!signInResult.data?.idToken) {
        throw new Error('Google Sign-In failed: No ID token received');
      }
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data.idToken
      );

      // Sign-in with credential
      return await authInstance.signInWithCredential(googleCredential);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<void> {
    try {
      // Sign out from Google
      try {
        await GoogleSignin.signOut();
      } catch {
        // Ignore Google sign-out errors
      }

      // Sign out from Firebase
      await authInstance.signOut();
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await authInstance.sendPasswordResetEmail(email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): FirebaseAuthTypes.User | null {
    return authInstance.currentUser;
  }

  /**
   * Check if user is signed in
   */
  static isSignedIn(): boolean {
    return authInstance.currentUser !== null;
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return authInstance.onAuthStateChanged(callback);
  }

  /**
   * Handle Firebase Auth errors and return user-friendly messages
   */
  private static handleAuthError(error: any): Error {
    let message = 'An error occurred. Please try again.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please sign in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address format.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your internet connection.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled.';
        break;
      default:
        message = error.message || message;
    }

    return new Error(message);
  }
}

export default AuthService;
