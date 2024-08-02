import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextUser } from "../types/types";
import SkeletonCard from "@/components/SkeletonCard";

const noop = () => {};

const AuthContext = createContext<ContextUser>({
  currentUser: null,
  setCurrentUser: noop as React.Dispatch<React.SetStateAction<User | null>>,
});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? <SkeletonCard /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
