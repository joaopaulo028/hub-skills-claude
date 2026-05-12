interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 text-center">
        <h1 className="text-[28px] sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
          Meu Hub de Skills do Claude
        </h1>
        <p className="mt-3 text-[14px] sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Inventário pessoal das Skills que tenho instaladas e das que quero
          instalar depois.
        </p>
        {children && (
          <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">{children}</div>
        )}
      </div>
    </section>
  );
}
