export interface SectionHeaderProps {
  title: string;
  count: number;
}

export function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between gap-3 mt-10 mb-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h2>
      <span className="text-[11px] font-medium tabular-nums text-muted-foreground/60">
        {count}
      </span>
    </div>
  );
}
