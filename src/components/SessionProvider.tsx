import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../supabase/client";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider(props: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={session} {...props} />;
}

export function useSession() {
  return useContext(SessionContext);
}
