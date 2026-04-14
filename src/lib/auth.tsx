import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import api from "./api";
import { Loader2 } from "lucide-react";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});


export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("fakeUser");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('fakeUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

const LoadingScreen = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <Loader2 className="animate-spin text-muted-foreground" size={32} />
  </div>
);

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/messengers" replace />;
  return <>{children}</>;
}
