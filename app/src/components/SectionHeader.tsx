export interface SectionHeaderProps {
  title: string;
  count: number;
}

export function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <h2 className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-10 mb-4">
      {title}
      <span className="text-muted-foreground/70 font-medium tracking-[0.04em]">
        {count}
      </span>
    </h2>
  );
}
