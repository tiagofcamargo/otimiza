import type { APIRoute } from 'astro';
import { business } from '../data/business';
import { renderSitemap } from '../utils/production';
export const GET: APIRoute = () => new Response(renderSitemap(business), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
