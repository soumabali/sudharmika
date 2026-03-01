# API_INTEGRATION (Laravel Starterkit)

## Base URL
Gunakan environment variable:

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1`
- `LARAVEL_OPENAPI_URL=http://localhost:8000/docs/v1/openapi.yaml`

## Recommended flow
1. Backend (Laravel) update endpoint + OpenAPI.
2. Frontend jalankan `npm run api:client` untuk generate function per endpoint + types.
3. Implement/use service API di `src/lib/api/*`.
4. Jalankan `npm run quality-gate`.

## Auth notes (Sanctum)
Jika pakai cookie-based auth lintas origin:
- pastikan CORS di Laravel mengizinkan origin frontend
- `withCredentials: true` sudah aktif di `src/lib/api/http.ts`
- untuk local dev paling aman pakai host yang konsisten (localhost)
