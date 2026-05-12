import { GitBranch, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
    >
      <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex items-start gap-4 p-4">
          <div
            className="flex size-10 items-center justify-center rounded-lg shrink-0"
            style={{
              backgroundColor: 'var(--color-repo-icon)',
              color: 'var(--color-repo-icon-foreground)',
            }}
          >
            <GitBranch className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[15px] truncate">{repo.nome}</h3>
              <ExternalLink className="size-3.5 text-muted-foreground/70 shrink-0" />
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">
              {repo.descricao}
            </p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
