const fallbackApiUrl = (globalThis as { NG_APP_API_URL?: string } | undefined)?.NG_APP_API_URL;

export const environment = {
  production: false,
  apiUrl: fallbackApiUrl ?? 'http://localhost:5000/api'
} as const;
