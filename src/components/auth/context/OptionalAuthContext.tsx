import { createContext } from "react";

export interface IOptionalAuth {
  authenticated: boolean;
}

export const OptionalAuthContext = createContext<IOptionalAuth | null>(null);
