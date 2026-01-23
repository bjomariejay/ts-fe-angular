const TOKEN_KEY = 'auth_token';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const getStorage = (): StorageLike | undefined => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
};

export const getStoredToken = () => getStorage()?.getItem(TOKEN_KEY) ?? null;

export const persistToken = (token: string) => {
  getStorage()?.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  getStorage()?.removeItem(TOKEN_KEY);
};

export const tokenStorageKey = TOKEN_KEY;
