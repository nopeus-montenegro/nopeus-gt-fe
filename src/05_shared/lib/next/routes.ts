import type { Route } from 'next';

export const trackDetailRoute = (id: string) => `/track/${id}` as Route;
export const carDetailRoute = (id: string) => `/car/${id}` as Route;
// export const setupDetailRoute = (id: string) => `/setup/${id}` as Route;
