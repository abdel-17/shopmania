import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { useEffect, useState } from "react";

const auth = getAuth(app);

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  });

  return user;
}

export { auth, useAuth };
