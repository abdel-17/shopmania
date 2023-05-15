import { useEffect, useState } from "react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import supabase from "../supabase/client";

export function useAuthListener() {
  const [event, setEvent] = useState<AuthChangeEvent | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen to changes to the auth state.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setEvent(event);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { event, session };
}

