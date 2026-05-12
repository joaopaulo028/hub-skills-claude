import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <Card
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
      className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <div className="flex-1 min-w-0">
          <Badge
            className="uppercase tracking-[0.08em] font-bold text-[10px]"
            style={TYPE_BADGE_STYLE[skill.tipo]}
          >
            {TYPE_LABEL[skill.tipo]}
          </Badge>
          <h3 className="mt-2 text-[15px] font-semibold truncate">{skill.nome}</h3>
        </div>
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
              className="rounded p-1 text-muted-foreground/70 hover:text-foreground active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star
                className={cn(
                  'size-4',
                  isFavorite && 'fill-current text-amber-500',
                )}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent className="pb-3 space-y-2">
        <p className="text-[13px] text-muted-foreground line-clamp-2">
          {skill.descricao}
        </p>
        {skill.output && (
          <p className="text-[12px]">
            <span className="font-semibold">Output:</span>{' '}
            <span className="text-muted-foreground">{skill.output}</span>
          </p>
        )}
        {skill.cases.length > 0 && (
          <p className="text-[12px]">
            <span className="font-semibold">Cases:</span>{' '}
            <span className="text-muted-foreground">
              {skill.cases.join(', ')}
            </span>
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={STATUS_STYLE[skill.status]}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {STATUS_LABEL[skill.status]}
        </span>
      </CardFooter>
    </Card>
  );
}
