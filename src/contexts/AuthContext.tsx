import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: (provider: string, options?: any) => Promise<any>;
  signOut: () => Promise<any>;
  isPremium: boolean;
  checkIsPremium: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  // Check if the user has premium subscription
  const checkIsPremium = async () => {
    if (!session?.user?.id) return false;
    
    try {
      // In a production app, this would be a real API call
      // For demo purposes, we'll just set based on user ID
      const isPremiumUser = session.user.id === "premium_user_id";
      setIsPremium(isPremiumUser);
      return isPremiumUser;
    } catch (error) {
      console.error("Failed to check premium status:", error);
      return false;
    }
  };

  useEffect(() => {
    if (session?.user) {
      checkIsPremium();
    }
  }, [session]);

  const value = {
    session,
    status,
    signIn,
    signOut,
    isPremium,
    checkIsPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
