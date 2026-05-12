export function Header() {
  return (
    <header className="text-center pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-border">
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.025em] text-foreground leading-[1.05]">
        Meu Hub de Skills do Claude
      </h1>
      <p className="mt-3 text-[14px] sm:text-[15px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Inventário pessoal das Skills que tenho instaladas e das que quero
        instalar depois.
      </p>
    </header>
  );
}
