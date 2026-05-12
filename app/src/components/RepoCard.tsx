import { GitBranch, ExternalLink } from 'lucide-react';
import type { Repositorio } from '@/types';

export interface RepoCardProps {
  repo: Repositorio;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${repo.nome} em nova aba`}
      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        className="flex size-9 items-center justify-center rounded-lg shrink-0"
        style={{
          backgroundColor: 'var(--color-repo-icon)',
          color: 'var(--color-repo-icon-foreground)',
        }}
      >
        <GitBranch className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[14px] font-semibold tracking-tight truncate">
            {repo.nome}
          </h3>
          <ExternalLink className="size-3 text-muted-foreground/60 shrink-0 transition-colors group-hover:text-muted-foreground" />
        </div>
        <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-2 leading-snug">
          {repo.descricao}
        </p>
      </div>
    </a>
  );
}
