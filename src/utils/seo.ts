import { enabledServices } from '../data/services.ts';

export type BreadcrumbItem = { name: string; href?: string };
export type InternalPageKind = 'AboutPage' | 'CollectionPage' | 'Service' | 'ContactPage' | 'WebPage';
interface InternalSchemaInput {
  kind: InternalPageKind; path: string; title: string; description: string;
  breadcrumbs: BreadcrumbItem[]; siteUrl?: string;
}

/** Relative references remain relative until the confirmed public domain is configured. */
export function buildInternalSchema({ kind, path, title, description, breadcrumbs, siteUrl }: InternalSchemaInput): Record<string, unknown>[] {
  const url = (value: string) => siteUrl ? new URL(value, siteUrl).href : value;
  const provider = { '@id': `${siteUrl ?? ''}/#organization` };
  const breadcrumbId = `${url(path)}#breadcrumb`;
  const service = kind === 'Service' ? enabledServices.find(service => `/servicos/${service.slug}` === path.replace(/\/$/, '')) : undefined;
  const page = { '@type': kind === 'Service' ? 'WebPage' : kind, '@id': `${url(path)}#webpage`, url: url(path), name: title, description, inLanguage: 'pt-BR', breadcrumb: { '@id': breadcrumbId } };
  return [
    { ...page, ...(service ? { mainEntity: { '@id': `${url(path)}#service` } } : {}),
      ...(kind === 'CollectionPage' ? { mainEntity: { '@type': 'ItemList', itemListElement: enabledServices.map((service, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Service', name: service.title, description: service.description, provider, ...(service.pagePublished ? { url: url(`/servicos/${service.slug}`) } : {}) } })) } } : {}),
    },
    { '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: url(item.href ?? path) })) },
    ...(service ? [{ '@type': 'Service', '@id': `${url(path)}#service`, name: service.title, serviceType: service.slug === 'planejamento-tributario' ? 'Planejamento tributário empresarial' : service.title, description, url: url(path), provider }] : []),
  ];
}
