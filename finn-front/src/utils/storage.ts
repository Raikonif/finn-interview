// SSR-safe localStorage wrapper
export const isServer = typeof window === 'undefined';

export const storage = {
  getItem: (key: string): string | null => {
    if (isServer) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: string): void => {
    if (isServer) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to set localStorage item:', error);
    }
  },
  
  removeItem: (key: string): void => {
    if (isServer) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove localStorage item:', error);
    }
  },
};
