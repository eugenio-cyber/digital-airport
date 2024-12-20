interface OpeningHours {
  [day: string]: {
    isOpen: boolean;
    intervals: { start: string; end: string }[];
  };
}

interface DaysOfWeekPT {
  [key: string]: string;
}

export function formatOpeningHours(openingHours: OpeningHours) {
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const daysOfWeekPT: DaysOfWeekPT = {
    sunday: 'Domingo',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
  };

  const todayIndex = new Date().getDay();
  const todayKey = daysOfWeek[todayIndex];
  const todayLabel = daysOfWeekPT[todayKey];
  const todayHours = openingHours[todayKey];

  if (!todayHours) return 'Sem informação de horário.';

  if (!todayHours.isOpen) {
    return `${todayLabel}: Fechado`;
  }

  const formattedIntervals = todayHours.intervals
    .map((interval) => `${interval.start} às ${interval.end}`)
    .join(', ');

  return `${todayLabel}: ${formattedIntervals}`;
}

export function createAlias(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
