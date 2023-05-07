import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../supabase/client";

export default function useSession() {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed", event);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}
