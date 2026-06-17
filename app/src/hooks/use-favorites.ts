import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '@/lib/storage';

const STORAGE_KEY = 'hub-skills:favorites';

export interface UseFavoritesResult {
  favorites: Set<string>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const initial = readJSON<string[]>(STORAGE_KEY, []);
    return new Set(initial);
  });

  useEffect(() => {
    writeJSON(STORAGE_KEY, Array.from(favorites));
  }, [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}
