import { Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Skill, SkillType, SkillStatus } from '@/types';

const TYPE_LABEL: Record<SkillType, string> = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const TYPE_BADGE_STYLE: Record<SkillType, React.CSSProperties> = {
  nativa: {
    backgroundColor: 'var(--color-badge-nativa)',
    color: 'var(--color-badge-nativa-foreground)',
  },
  plugin: {
    backgroundColor: 'var(--color-badge-plugin)',
    color: 'var(--color-badge-plugin-foreground)',
  },
  customizada: {
    backgroundColor: 'var(--color-badge-customizada)',
    color: 'var(--color-badge-customizada-foreground)',
  },
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  instalada: 'Instalada',
  wishlist: 'Wishlist',
};

const STATUS_STYLE: Record<SkillStatus, React.CSSProperties> = {
  instalada: {
    backgroundColor: 'var(--color-status-instalada)',
    color: 'var(--color-status-instalada-foreground)',
  },
  wishlist: {
    backgroundColor: 'var(--color-status-wishlist)',
    color: 'var(--color-status-wishlist-foreground)',
  },
};

export interface SkillCardProps {
  skill: Skill;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onClick: (skill: Skill) => void;
}

export function SkillCard({
  skill,
  isFavorite,
  onFavoriteToggle,
  onClick,
}: SkillCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(skill);
        }
      }}
      aria-label={`Abrir detalhes de ${skill.nome}`}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card p-5',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]',
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
          style={TYPE_BADGE_STYLE[skill.tipo]}
        >
          {TYPE_LABEL[skill.tipo]}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(skill.id);
              }}
              aria-label={
                isFavorite
                  ? `Remover ${skill.nome} das favoritas`
                  : `Adicionar ${skill.nome} às favoritas`
              }
              className={cn(
                '-m-1 rounded-md p-1 transition-all',
                'text-muted-foreground/50 hover:text-foreground',
                'active:scale-90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isFavorite && 'text-amber-500 hover:text-amber-600',
              )}
            >
              <Star
                className={cn('size-4', isFavorite && 'fill-current')}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </TooltipContent>
        </Tooltip>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-foreground line-clamp-1">
        {skill.nome}
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-muted-foreground line-clamp-2">
        {skill.descricao}
      </p>

      <dl className="mt-3 space-y-1 text-[12px]">
        {skill.output && (
          <div className="flex gap-1.5">
            <dt className="font-semibold text-foreground/80 shrink-0">Output:</dt>
            <dd className="text-muted-foreground line-clamp-1">{skill.output}</dd>
          </div>
        )}
        {skill.cases.length > 0 && (
          <div className="flex gap-1.5">
            <dt className="font-semibold text-foreground/80 shrink-0">Cases:</dt>
            <dd className="text-muted-foreground line-clamp-1">
              {skill.cases.join(', ')}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 pt-3 border-t border-border/60">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={STATUS_STYLE[skill.status]}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {STATUS_LABEL[skill.status]}
        </span>
      </div>
    </article>
  );
}
