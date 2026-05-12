import { useDeferredValue, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { skillsDataset } from '@/data/skills';
import { useFilters } from '@/hooks/use-filters';
import { useFavorites } from '@/hooks/use-favorites';
import { useFilteredSkills } from '@/hooks/use-filtered-skills';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { SectionHeader } from '@/components/SectionHeader';
import { RepoCard } from '@/components/RepoCard';
import { SkillCard } from '@/components/SkillCard';
import { SkillModal } from '@/components/SkillModal';
import { EmptyState } from '@/components/EmptyState';
import { Separator } from '@/components/ui/separator';
import type {
  FilterCounts,
  Skill,
  SkillDomain,
  SkillStatus,
  SkillType,
} from '@/types';

const ALL_TYPES: SkillType[] = ['nativa', 'plugin', 'customizada'];
const ALL_STATUSES: SkillStatus[] = ['instalada', 'wishlist'];
const ALL_TAGS: SkillDomain[] = [
  'dev',
  'design',
  'produtividade',
  'dados',
  'conteudo',
  'outro',
];

function App() {
  const {
    filters,
    setType,
    setStatus,
    setTag,
    setQuery,
    toggleFavoritesOnly,
    reset,
  } = useFilters();
  const { favorites, toggle, isFavorite } = useFavorites();
  const [selected, setSelected] = useState<Skill | null>(null);

  const deferredQuery = useDeferredValue(filters.query);
  const deferredFilters = useMemo(
    () => ({ ...filters, query: deferredQuery }),
    [filters, deferredQuery],
  );

  const filteredSkills = useFilteredSkills(
    skillsDataset.skills,
    deferredFilters,
    favorites,
  );

  const counts: FilterCounts = useMemo(() => {
    const types = Object.fromEntries(
      ALL_TYPES.map((t) => [t, 0]),
    ) as Record<SkillType, number>;
    const statuses = Object.fromEntries(
      ALL_STATUSES.map((s) => [s, 0]),
    ) as Record<SkillStatus, number>;
    const tags = Object.fromEntries(
      ALL_TAGS.map((t) => [t, 0]),
    ) as Record<SkillDomain, number>;
    for (const s of skillsDataset.skills) {
      types[s.tipo]++;
      statuses[s.status]++;
      for (const t of s.tags) tags[t]++;
    }
    return { types, statuses, tags, favorites: favorites.size };
  }, [favorites]);

  const handleFavoriteToggle = (id: string) => {
    const wasFavorite = isFavorite(id);
    toggle(id);
    toast(wasFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header>
        <SearchBar value={filters.query} onChange={setQuery} />
      </Header>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-5 py-8">
        <div className="mb-8">
          <FilterChips
            filters={filters}
            counts={counts}
            onTypeToggle={setType}
            onStatusToggle={setStatus}
            onTagToggle={setTag}
            onFavoritesToggle={toggleFavoritesOnly}
          />
        </div>

        {skillsDataset.repositorios.length > 0 && (
          <>
            <SectionHeader
              title="Repositórios base"
              count={skillsDataset.repositorios.length}
            />
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {skillsDataset.repositorios.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            <Separator className="mt-10" />
          </>
        )}

        <SectionHeader title="Skills" count={filteredSkills.length} />
        {filteredSkills.length === 0 ? (
          <EmptyState onClearFilters={reset} />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                isFavorite={isFavorite(skill.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-10 py-8 text-center text-xs text-muted-foreground/70">
        <p>Hub de Skills do Claude — curado por João Paulo</p>
      </footer>

      <SkillModal
        skill={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}

export default App;
