'use client';

import React, { createContext, useContext, useState } from 'react';

export interface NavigationContextProps {
  title: string;
  setTitle(title: string): void;
  headerColor: string;
  setHeaderColor(color: string): void;
}

const NavigationContext = createContext<NavigationContextProps>({} as any);

export function NavigationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState<string>('');
  const [headerColor, setHeaderColor] = useState<string>('');

  return (
    <NavigationContext.Provider
      value={{ title, setTitle, headerColor, setHeaderColor }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
