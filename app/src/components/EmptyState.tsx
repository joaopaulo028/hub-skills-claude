import { SearchX } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <Empty className="my-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>Nenhuma skill encontrada</EmptyTitle>
        <EmptyDescription>
          Tente ajustar os filtros ou a busca para ver mais resultados.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onClearFilters}>
        Limpar filtros
      </Button>
    </Empty>
  );
}
