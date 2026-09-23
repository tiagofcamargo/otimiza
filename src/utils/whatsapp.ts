import { business } from '../data/business.ts';

/** Returns no URL until a complete Brazilian international number is confirmed. */
export function buildWhatsAppUrl(message: string): string | null {
  const raw = business.whatsapp;
  if (!/^[+\d\s().-]+$/.test(raw)) return null;
  const number = raw.replace(/\D/g, '');
  if (!/^55[1-9]\d(?:9\d{8}|[2-5]\d{7})$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppNumber(value = business.whatsapp): string | null {
  const number = value.replace(/\D/g, '');
  const match = number.match(/^55(\d{2})(9\d{8})$/);
  return match ? `(${match[1]}) ${match[2].slice(0, 5)}-${match[2].slice(5)}` : null;
}

export const generalMessage = 'Olá, vim pelo site da Otimiza e gostaria de conversar com um especialista.';
