'use server';
import { cookies } from 'next/headers';

export async function setLanguageValue(value: string) {
  const cookieStore = await cookies();
  cookieStore.set('lang', value);
}

export async function getLanguageValue() {
  const cookieStore = await cookies();
  return cookieStore.get('lang')?.value;
}
