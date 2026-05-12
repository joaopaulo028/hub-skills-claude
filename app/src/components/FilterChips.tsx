import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface ChipProps {
  active: boolean;
  count?: number;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function Chip({ active, count, onClick, icon, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap',
        'transition-colors duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active
          ? 'bg-foreground text-background hover:bg-foreground/90'
          : 'bg-muted text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      {icon}
      <span>{children}</span>
      {count !== undefined && (
        <span
          className={cn(
            'tabular-nums text-[11px] font-semibold',
            active ? 'text-background/70' : 'text-muted-foreground/70',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="hidden sm:inline-block h-5 w-px bg-border mx-1 shrink-0"
    />
  );
}

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
    <div
      role="toolbar"
      aria-label="Filtros"
      className="flex flex-wrap items-center gap-2"
    >
      {(Object.keys(TYPE_LABELS) as SkillType[]).map((t) => (
        <Chip
          key={`type-${t}`}
          active={filters.types.includes(t)}
          count={counts.types[t]}
          onClick={() => onTypeToggle(t)}
        >
          {TYPE_LABELS[t]}
        </Chip>
      ))}
      <Separator />
      {(Object.keys(STATUS_LABELS) as SkillStatus[]).map((s) => (
        <Chip
          key={`status-${s}`}
          active={filters.statuses.includes(s)}
          count={counts.statuses[s]}
          onClick={() => onStatusToggle(s)}
        >
          {STATUS_LABELS[s]}
        </Chip>
      ))}
      <Separator />
      {(Object.keys(TAG_LABELS) as SkillDomain[]).map((t) => (
        <Chip
          key={`tag-${t}`}
          active={filters.tags.includes(t)}
          count={counts.tags[t]}
          onClick={() => onTagToggle(t)}
        >
          {TAG_LABELS[t]}
        </Chip>
      ))}
      <Separator />
      <Chip
        active={filters.onlyFavorites}
        count={counts.favorites}
        onClick={onFavoritesToggle}
        icon={
          <Star
            className={cn(
              'size-3.5',
              filters.onlyFavorites && 'fill-current',
            )}
          />
        }
      >
        Favoritas
      </Chip>
    </div>
  );
}
