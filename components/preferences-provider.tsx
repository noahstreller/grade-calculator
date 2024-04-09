import { Preferences } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getPreferences } from "@/lib/services/preferences-service";
import { createContext, useContext, useEffect, useState } from "react";


type PreferencesContextType = {
  preferences: Preferences | undefined;
  setPreferences: (preferences: Preferences) => void;
  loading: boolean;
};

const defaultContextValue: PreferencesContextType = {
  preferences: undefined,
  setPreferences: () => void 0,
  loading: true,
};

const PreferencesContext = createContext(defaultContextValue);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPreferences().then((result): void => {
      setPreferences(catchProblem(result));
      setLoading(false);
    });
  }, []);

  return (
    <PreferencesContext.Provider
      value={{ preferences, setPreferences, loading }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);