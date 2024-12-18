'use client';

import { createAlias } from '@/utils/EstablishmentUtils';
import React, { createContext, useState } from 'react';

interface NavigationContextProps {
  title: string;
  setTitle(title: string): void;
  headerColor: string;
  setHeaderColor(color: string): void;
  menuItems: MenuItem[];
  setMenuItems(items: MenuItem[]): void;
  fetchMenuItems(): Promise<void>;
  restaurants: Establishment[];
  stores: Establishment[];
  services: Establishment[];
  currentEstablishment: Establishment | undefined;
  setCurrentEstablishment(
    currentEstablishment: Establishment | undefined
  ): void;
  findEstablishment(establishmentName: string): void;
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
  segments: ('restaurant' | 'store' | 'service')[];
  backgroundImage?: string;
  locationId: string;
  instagram?: string;
}

const NavigationContext = createContext<NavigationContextProps>({} as any);

export function NavigationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Establishment[]>([]);
  const [stores, setStores] = useState<Establishment[]>([]);
  const [services, setServices] = useState<Establishment[]>([]);
  const [currentEstablishment, setCurrentEstablishment] = useState<
    Establishment | undefined
  >();
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

  function findEstablishment(establishmentName: string) {
    const alias = createAlias(establishmentName);
    const restaurant = restaurants.find((e) => createAlias(e.name) === alias);
    const store = stores.find((e) => createAlias(e.name) === alias);
    const service = services.find((e) => createAlias(e.name) === alias);

    if (restaurant) {
      setCurrentEstablishment(restaurant);
      return;
    }

    if (store) {
      setCurrentEstablishment(store);
      return;
    }

    if (service) {
      setCurrentEstablishment(service);
      return;
    }
  }

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
        restaurants,
        stores,
        services,
        currentEstablishment,
        setCurrentEstablishment,
        findEstablishment,
        fetchEstablishments,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
