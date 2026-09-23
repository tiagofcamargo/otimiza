import { createPublicConfig } from '../utils/production.ts';
const env = import.meta.env ?? process.env;
const defaultPublicSiteUrl = 'https://otimizacontabil.com.br';
const defaultPublicWhatsapp = '5511971774720';
const configuredEnv = {
  PUBLIC_SITE_URL: typeof env.PUBLIC_SITE_URL === 'string' ? env.PUBLIC_SITE_URL : defaultPublicSiteUrl,
  PUBLIC_INDEXING_ENABLED: typeof env.PUBLIC_INDEXING_ENABLED === 'string' ? env.PUBLIC_INDEXING_ENABLED : undefined,
  PUBLIC_GA_ID: typeof env.PUBLIC_GA_ID === 'string' ? env.PUBLIC_GA_ID : undefined,
};
const publication = createPublicConfig(configuredEnv, import.meta.env?.DEV ?? (process.env.NODE_ENV === 'development'));

export const business = {
  name: 'Otimiza Assessoria Contábil',
  legalName: undefined as string | undefined,
  whatsapp: typeof env.PUBLIC_WHATSAPP === 'string' ? env.PUBLIC_WHATSAPP.trim() : defaultPublicWhatsapp,
  indexingEnabled: publication.indexingEnabled,
  gaId: publication.gaId,
  openingHours: undefined as string | undefined,
  privacyEmail: undefined as string | undefined,
  phone: undefined as string | undefined,
  email: undefined as string | undefined,
  instagram: 'https://www.instagram.com/otimiza_assessoria/',
  instagramHandle: '@otimiza_assessoria',
  siteUrl: publication.siteUrl,
  address: undefined as string | undefined,
  city: undefined as string | undefined,
  state: undefined as string | undefined,
  postalCode: undefined as string | undefined,
  cnpj: undefined as string | undefined,
  crc: undefined as string | undefined,
  googleBusinessUrl: undefined as string | undefined,
  serviceMode: 'online',
};
