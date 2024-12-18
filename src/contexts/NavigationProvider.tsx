'use client';

import React, { createContext, useState } from 'react';

export interface NavigationContextProps {
  headerTitle: string;
  setHeaderTitle(title: string): void;
  headerColor: string;
  setHeaderColor(color: string): void;
  fetchMenuItems(): Promise<void>;
  menuItems: MenuItem[];
}

interface MenuItem {
  _id: string;
  label: string;
  ref: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

const NavigationContext = createContext<NavigationContextProps>({} as any);

export function NavigationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [headerColor, setHeaderColor] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const fetchMenuItems = async () => {
    if (menuItems.length > 0) return;

    try {
      const response = await fetch('/api/menu');
      const data = await response.json();

      setMenuItems(data);
    } catch (error) {
      console.error('Erro ao buscar itens do menu:', error);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
        headerColor,
        setHeaderColor,
        fetchMenuItems,
        menuItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
