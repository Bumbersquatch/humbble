// Firebase client configuration for React Native/Expo
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

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

// Initialize Firebase Authentication
const auth: Auth = getAuth(app);

export { auth, app };
