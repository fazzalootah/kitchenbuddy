import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as updateFirebaseEmail,
  updatePassword as updateFirebasePassword,
  sendEmailVerification,
  updateProfile, 
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const authState = onAuthStateChanged

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app); // assuming 'app' is your Firebase app instance

export const googleProvider = new GoogleAuthProvider();

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user) {
      throw new Error('Google authentication failed. No user information received.');
    }

    const userRef = doc(firestore, "users", user.uid);
    const docSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      const userData = {};

      if (user.displayName) userData.displayName = user.displayName;
      if (user.email) userData.email = user.email;

      if (Object.keys(userData).length === 0) {
        throw new Error('No valid user data to save to Firestore.');
      }

      await setDoc(userRef, userData);
    } else {
      throw new Error('User already exists!');
    }

    return { status: 'success', data: user };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(firestore, "users", user.uid);
    const docSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      throw new Error('User does not exist. Please sign up first!');
    }

    return { status: 'success', data: user };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};


export const signUp = async (email, password, firstName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (user) {
      await updateProfile(user, { displayName: firstName });
      
      // Store user data in Firestore
      const userDocRef = doc(firestore, 'users', user.uid); 
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: firstName
      });
      
      return { status: 'success', data: user };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { status: 'success', data: userCredential.user };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const signOut = async (navigate) => {
  try {
    await auth.signOut();
    navigate('/signin'); // Redirect to signin after signout
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const updateEmail = async (newEmail) => {
  try {
    const user = auth.currentUser;
    await updateFirebaseEmail(user, newEmail);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    await updateFirebasePassword(user, newPassword);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const deleteUser = async () => {
  try {
    const user = auth.currentUser;
    await user.delete();
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const sendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    await sendEmailVerification(user);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const isEmailVerified = () => {
  const user = auth.currentUser;
  return user && user.emailVerified;
};

