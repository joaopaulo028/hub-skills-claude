import { Star } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import type {
  Filters,
  FilterCounts,
  SkillType,
  SkillStatus,
  SkillDomain,
} from '@/types';

const TYPE_LABELS: Record<SkillType, string> = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const STATUS_LABELS: Record<SkillStatus, string> = {
  instalada: 'Instalada',
  wishlist: 'Wishlist',
};

const TAG_LABELS: Record<SkillDomain, string> = {
  dev: 'Dev',
  design: 'Design',
  produtividade: 'Produtividade',
  dados: 'Dados',
  conteudo: 'Conteúdo',
  outro: 'Outro',
};

export interface FilterChipsProps {
  filters: Filters;
  counts: FilterCounts;
  onTypeToggle: (t: SkillType) => void;
  onStatusToggle: (s: SkillStatus) => void;
  onTagToggle: (t: SkillDomain) => void;
  onFavoritesToggle: () => void;
}

export function FilterChips({
  filters,
  counts,
  onTypeToggle,
  onStatusToggle,
  onTagToggle,
  onFavoritesToggle,
}: FilterChipsProps) {
  return (
    <div className="space-y-3">
      <ToggleGroup
        type="multiple"
        value={filters.types}
        aria-label="Filtrar por tipo"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(TYPE_LABELS) as SkillType[]).map((t) => (
          <ToggleGroupItem
            key={t}
            value={t}
            onClick={() => onTypeToggle(t)}
            className="gap-2"
          >
            {TYPE_LABELS[t]}
            <Badge variant="secondary" className="ml-1">
              {counts.types[t]}
            </Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={filters.statuses}
        aria-label="Filtrar por status"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(STATUS_LABELS) as SkillStatus[]).map((s) => (
          <ToggleGroupItem
            key={s}
            value={s}
            onClick={() => onStatusToggle(s)}
            className="gap-2"
          >
            {STATUS_LABELS[s]}
            <Badge variant="secondary" className="ml-1">
              {counts.statuses[s]}
            </Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={filters.tags}
        aria-label="Filtrar por domínio"
        className="flex-wrap gap-2 justify-start"
      >
        {(Object.keys(TAG_LABELS) as SkillDomain[]).map((t) => (
          <ToggleGroupItem
            key={t}
            value={t}
            onClick={() => onTagToggle(t)}
            className="gap-2"
          >
            {TAG_LABELS[t]}
            <Badge variant="secondary" className="ml-1">
              {counts.tags[t]}
            </Badge>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={filters.onlyFavorites ? 'on' : ''}
        aria-label="Filtrar favoritas"
      >
        <ToggleGroupItem value="on" onClick={onFavoritesToggle} className="gap-2">
          <Star className="size-3.5" />
          Favoritas
          <Badge variant="secondary" className="ml-1">
            {counts.favorites}
          </Badge>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
