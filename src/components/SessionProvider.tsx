import { createContext, useContext } from "react";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  return useContext(SessionContext);
}

export const SessionProvider = SessionContext.Provider;