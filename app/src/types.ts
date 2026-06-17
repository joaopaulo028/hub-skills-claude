export type SkillType = 'nativa' | 'plugin' | 'customizada';
export type SkillStatus = 'instalada' | 'wishlist';
export type SkillDomain = 'dev' | 'design' | 'produtividade' | 'dados' | 'conteudo' | 'outro';

export interface SubSkill {
  nome: string;
  descricao?: string;
}

export interface Skill {
  id: string;
  nome: string;
  tipo: SkillType;
  status: SkillStatus;
  descricao: string;
  output: string;
  cases: string[];
  tags: SkillDomain[];
  linkRepo?: string;
  subSkills?: SubSkill[];
  comoUsar?: string;
  fonte?: string;
  versao?: string;
}

export interface Repositorio {
  id: string;
  nome: string;
  descricao: string;
  url: string;
}

export interface SkillsDataset {
  repositorios: Repositorio[];
  skills: Skill[];
}

export interface Filters {
  types: SkillType[];
  statuses: SkillStatus[];
  tags: SkillDomain[];
  onlyFavorites: boolean;
  query: string;
}

export interface FilterCounts {
  types: Record<SkillType, number>;
  statuses: Record<SkillStatus, number>;
  tags: Record<SkillDomain, number>;
  favorites: number;
}
