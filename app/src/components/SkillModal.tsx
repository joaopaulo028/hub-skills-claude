import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Skill, SkillType } from '@/types';

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

export interface SkillModalProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillModal({ skill, open, onOpenChange }: SkillModalProps) {
  if (!skill) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <Badge
            className="self-start uppercase tracking-[0.08em] font-bold text-[10px]"
            style={TYPE_BADGE_STYLE[skill.tipo]}
          >
            {TYPE_LABEL[skill.tipo]}
          </Badge>
          <DialogTitle className="text-[22px] font-bold">
            {skill.nome}
          </DialogTitle>
          <DialogDescription>{skill.descricao}</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 text-sm">
          {skill.output && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Output
              </h4>
              <p>{skill.output}</p>
            </div>
          )}

          {skill.cases.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Casos de uso
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {skill.cases.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {skill.comoUsar && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Como usar
              </h4>
              <p>{skill.comoUsar}</p>
            </div>
          )}

          {skill.subSkills && skill.subSkills.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Sub-skills
              </h4>
              <ul className="space-y-1">
                {skill.subSkills.map((s, i) => (
                  <li key={i}>
                    <span className="font-mono text-[12px]">{s.nome}</span>
                    {s.descricao && (
                      <span className="text-muted-foreground">
                        {' '}— {s.descricao}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skill.linkRepo && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">
                Repositório
              </h4>
              <a
                href={skill.linkRepo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir repositório em nova aba"
                className="inline-flex items-center gap-1.5 text-primary hover:underline break-all"
              >
                {skill.linkRepo}
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            </div>
          )}

          {(skill.fonte || skill.versao) && (
            <div className="flex gap-4 text-[12px] text-muted-foreground">
              {skill.fonte && <span>Fonte: {skill.fonte}</span>}
              {skill.versao && <span>Versão: {skill.versao}</span>}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
