import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../supabase/client";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider(props: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen to changes to the auth state.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      setSession(session);
    });

    // Clean up the subscription when the component unmounts.
    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={session} {...props} />;
}

export function useSession() {
  return useContext(SessionContext);
}
