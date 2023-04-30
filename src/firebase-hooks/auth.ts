import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./app";
import { useEffect, useState } from "react";

const auth = getAuth(app);

function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  });

  return user;
}

export { auth, useFirebaseAuth };
