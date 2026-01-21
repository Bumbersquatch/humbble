import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../constants/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db } from '../constants/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: any;
  userData: any;
  isLoading: boolean;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
  setUserData: (data: any) => void;
  fetchUserData: (uid: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isLoading: true,
  logout: async () => {},
  setUser: () => {},
  setUserData: () => {},
  fetchUserData: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
        return userSnapshot.data();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        // Fetch user data when user is authenticated
        await fetchUserData(authUser.uid);
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, logout, setUser, setUserData, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
