import { useCallback, useState } from 'react';
import type { Filters, SkillDomain, SkillStatus, SkillType } from '@/types';

const initialFilters: Filters = {
  types: [],
  statuses: [],
  tags: [],
  onlyFavorites: false,
  query: '',
};

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export interface UseFiltersResult {
  filters: Filters;
  setType: (t: SkillType) => void;
  setStatus: (s: SkillStatus) => void;
  setTag: (t: SkillDomain) => void;
  setQuery: (q: string) => void;
  toggleFavoritesOnly: () => void;
  reset: () => void;
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const setType = useCallback((t: SkillType) => {
    setFilters((f) => ({ ...f, types: toggle(f.types, t) }));
  }, []);

  const setStatus = useCallback((s: SkillStatus) => {
    setFilters((f) => ({ ...f, statuses: toggle(f.statuses, s) }));
  }, []);

  const setTag = useCallback((t: SkillDomain) => {
    setFilters((f) => ({ ...f, tags: toggle(f.tags, t) }));
  }, []);

  const setQuery = useCallback((q: string) => {
    setFilters((f) => ({ ...f, query: q }));
  }, []);

  const toggleFavoritesOnly = useCallback(() => {
    setFilters((f) => ({ ...f, onlyFavorites: !f.onlyFavorites }));
  }, []);

  const reset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return { filters, setType, setStatus, setTag, setQuery, toggleFavoritesOnly, reset };
}
