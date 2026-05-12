import { useMemo } from 'react';
import type { Filters, Skill } from '@/types';

function matchesQuery(skill: Skill, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (skill.nome.toLowerCase().includes(q)) return true;
  if (skill.descricao.toLowerCase().includes(q)) return true;
  if (skill.output.toLowerCase().includes(q)) return true;
  if (skill.cases.some((c) => c.toLowerCase().includes(q))) return true;
  return false;
}

export function useFilteredSkills(
  skills: Skill[],
  filters: Filters,
  favorites: Set<string>,
): Skill[] {
  return useMemo(() => {
    return skills.filter((skill) => {
      if (filters.onlyFavorites && !favorites.has(skill.id)) return false;
      if (filters.types.length > 0 && !filters.types.includes(skill.tipo)) return false;
      if (filters.statuses.length > 0 && !filters.statuses.includes(skill.status)) return false;
      if (filters.tags.length > 0 && !skill.tags.some((t) => filters.tags.includes(t))) return false;
      if (!matchesQuery(skill, filters.query)) return false;
      return true;
    });
  }, [skills, filters, favorites]);
}
