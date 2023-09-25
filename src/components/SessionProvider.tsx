import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../supabase";

const SessionContext = createContext<Session | null | undefined>(null);

type SessionProviderProps = { children: ReactNode };

export function SessionProvider(props: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>();

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
