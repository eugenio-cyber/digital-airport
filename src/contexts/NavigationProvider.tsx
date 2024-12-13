'use client';

import React, { createContext, useContext, useState } from 'react';

export interface NavigationContextProps {
  title: string;
  setTitle(title: string): void;
  headerColor: string;
  setHeaderColor(color: string): void;
  menuItems: MenuItem[];
  setMenuItems(items: MenuItem[]): void;
  fetchMenuItems(): Promise<void>;
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [title, setTitle] = useState<string>('');
  const [headerColor, setHeaderColor] = useState<string>('');

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
        menuItems,
        setMenuItems,
        title,
        setTitle,
        headerColor,
        setHeaderColor,
        fetchMenuItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
