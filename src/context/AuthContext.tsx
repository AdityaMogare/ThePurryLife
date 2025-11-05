import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the 'User' type
import { auth } from '@/firebase.config';

// 1. Define the shape of your context data
interface IAuthContext {
  currentUser: User | null;
}

// 2. Create the context with a default value (or undefined)
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// 3. Create a custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 4. Define the props for the provider
interface AuthProviderProps {
  children: React.ReactNode; // Type for 'children'
}

// 5. Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};