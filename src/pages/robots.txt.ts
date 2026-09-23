import type { APIRoute } from 'astro';
import { business } from '../data/business';
import { renderRobots } from '../utils/production';
export const GET: APIRoute = () => new Response(renderRobots(business), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
