// Firebase client configuration for React Native/Expo
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
// @ts-ignore: getReactNativePersistence exists in the RN bundle 
// but is often missing from public TypeScript definitions.
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace these with your Firebase config
// Get your config from Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db: Firestore = getFirestore(app);

export { auth, app, db };
