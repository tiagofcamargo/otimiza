import { enabledServices } from './services.ts';
/** Only published institutional pages; never assets, 404 or technical endpoints. */
export const publicRoutes = ['/', '/sobre', '/servicos', ...enabledServices.filter(service => service.pagePublished).map(service => `/servicos/${service.slug}`), '/perguntas-frequentes', '/contato', '/politica-de-privacidade'];
