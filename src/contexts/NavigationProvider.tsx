'use client';

import React, { createContext, useState } from 'react';

export interface NavigationContextProps {
  headerTitle: string;
  setHeaderTitle(title: string): void;
  headerColor: string;
  setHeaderColor(color: string): void;
  fetchMenuItems(): Promise<void>;
  menuItems: MenuItem[];
  restaurants: Establishment[];
  stores: Establishment[];
  services: Establishment[];
  fetchEstablishments(): Promise<void>;
}

interface MenuItem {
  _id: string;
  label: string;
  ref: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export interface Establishment {
  name: string;
  logo: string;
  address: string;
  phone: number;
  openingHours: object;
  serviceCategories: string[];
  segments: string[];
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
  const [restaurants, setRestaurants] = useState<Establishment[]>([]);
  const [stores, setStores] = useState<Establishment[]>([]);
  const [services, setServices] = useState<Establishment[]>([]);

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

  const fetchEstablishments = async () => {
    if (restaurants.length || stores.length || services.length) return;

    try {
      const response = await fetch('/api/establishments');
      const data = await response.json();

      const localRestaurants = data.filter((establishment: Establishment) => {
        return establishment.segments.includes('restaurant');
      });

      const localStores = data.filter((establishment: Establishment) => {
        return establishment.segments.includes('store');
      });

      const localServices = data.filter((establishment: Establishment) => {
        return establishment.segments.includes('service');
      });

      setRestaurants(localRestaurants);
      setStores(localStores);
      setServices(localServices);
    } catch (error) {
      console.error('Erro ao buscar os estabelecimentos:', error);
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
        restaurants,
        stores,
        services,
        fetchEstablishments,
        menuItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
