import { client } from './generated/client.gen';
export * from './generated';

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1',
  headers: {
    Accept: 'application/json',
  },
  credentials: 'include',
});
