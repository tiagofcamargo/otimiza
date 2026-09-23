import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildInternalSchema } from '../src/utils/seo.ts';
import { services } from '../src/data/services.ts';

const input = { kind: 'Service' as const, path: '/servicos/planejamento-tributario', title: 'Planejamento tributário', description: 'Análise conceitual.', breadcrumbs: [{ name: 'Início', href: '/' }, { name: 'Serviços', href: '/servicos' }, { name: 'Planejamento tributário' }] };
test('configured internal schema uses one real origin and complete breadcrumb positions', () => {
  const graph = buildInternalSchema({ ...input, siteUrl: 'https://example.test' });
  const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList')!;
  assert.deepEqual(breadcrumb.itemListElement, [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://example.test/' },
    { '@type': 'ListItem', position: 2, name: 'Serviços', item: 'https://example.test/servicos' },
    { '@type': 'ListItem', position: 3, name: 'Planejamento tributário', item: 'https://example.test/servicos/planejamento-tributario' },
  ]);
  assert.ok(JSON.stringify(graph).includes('https://example.test/servicos/planejamento-tributario'));
  assert.ok(!JSON.stringify(graph).includes('localhost'));
});
test('without domain internal schema keeps relative page references and no invented business details', () => {
  const graph = buildInternalSchema(input);
  assert.ok(!JSON.stringify(graph).includes('https://'));
  assert.ok(!JSON.stringify(graph).includes('telephone'));
  assert.ok(!JSON.stringify(graph).includes('Person'));
  assert.equal(graph.find(n => n['@type'] === 'Service')?.url, input.path);
});
test('service collection only links a service when its page is published', () => {
  const service = services.find(service => service.slug === 'departamento-pessoal')!;
  const published = service.pagePublished;
  service.pagePublished = false;
  try {
  const graph = buildInternalSchema({ ...input, kind: 'CollectionPage', path: '/servicos' });
  const collection = graph.find(n => n['@type'] === 'CollectionPage')!;
  const text = JSON.stringify(collection);
  assert.ok(text.includes('/servicos/planejamento-tributario'));
  assert.ok(!text.includes('/servicos/departamento-pessoal'));
  } finally { service.pagePublished = published; }
});

test('each service schema identifies the service actually displayed by the route', () => {
  for (const service of services) {
    const path = `/servicos/${service.slug}`;
    const graph = buildInternalSchema({ ...input, path, title: service.title, description: service.description });
    const entity = graph.find(node => node['@type'] === 'Service')!;
    assert.equal(entity.name, service.title, path);
    assert.equal(entity.url, path);
    assert.equal(entity.description, service.description);
  }
});
