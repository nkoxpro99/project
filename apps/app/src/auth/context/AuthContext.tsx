import { createContext, ReactNode, useContext, useMemo } from 'react';

import { AuthUser } from '../models/auth';

export type AuthContextType = {
  user?: AuthUser;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type AuthProviderProps = AuthContextType & {
  children?: ReactNode;
};

export function AuthProvider({ children, ...context }: AuthProviderProps) {
  const value = useMemo(() => context, Object.values(context)) as AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(scope: string) {
  const context = useContext(AuthContext);

  if (context === undefined) throw Error(`StepperContext - ${scope}: The component is not inside the provider`);

  return context;
}
