import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilteredSkills } from '@/hooks/use-filtered-skills';
import type { Filters, Skill } from '@/types';

const skill = (overrides: Partial<Skill>): Skill => ({
  id: 'x',
  nome: 'Skill X',
  tipo: 'nativa',
  status: 'instalada',
  descricao: 'descrição',
  output: 'output',
  cases: ['caso 1'],
  tags: ['dev'],
  ...overrides,
});

const filters = (overrides: Partial<Filters> = {}): Filters => ({
  types: [],
  statuses: [],
  tags: [],
  onlyFavorites: false,
  query: '',
  ...overrides,
});

describe('useFilteredSkills', () => {
  const skills: Skill[] = [
    skill({ id: '1', nome: 'Alpha', tipo: 'nativa', status: 'instalada', tags: ['dev'] }),
    skill({ id: '2', nome: 'Beta', tipo: 'plugin', status: 'wishlist', tags: ['design'] }),
    skill({ id: '3', nome: 'Gamma', tipo: 'customizada', status: 'instalada', tags: ['dev', 'produtividade'] }),
    skill({ id: '4', nome: 'Delta', tipo: 'nativa', status: 'wishlist', tags: ['conteudo'] }),
  ];

  it('sem filtros retorna tudo', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters(), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1', '2', '3', '4']);
  });

  it('filtra por type (OR entre selecionados)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['nativa', 'plugin'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1', '2', '4']);
  });

  it('filtra por status', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ statuses: ['wishlist'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['2', '4']);
  });

  it('filtra por tag (OR entre selecionadas)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ tags: ['design'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['2']);
  });

  it('combina filtros (AND entre dimensões)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['nativa'], statuses: ['wishlist'] }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['4']);
  });

  it('busca por query no nome (case-insensitive)', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ query: 'ALPHA' }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['1']);
  });

  it('busca por query em cases', () => {
    const custom = skill({ id: '99', nome: 'Tau', cases: ['unique-case-string'], tags: ['outro'] });
    const { result } = renderHook(() => useFilteredSkills([...skills, custom], filters({ query: 'unique-case' }), new Set()));
    expect(result.current.map((s) => s.id)).toEqual(['99']);
  });

  it('onlyFavorites filtra pelo Set de IDs favoritados', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ onlyFavorites: true }), new Set(['2', '4'])));
    expect(result.current.map((s) => s.id)).toEqual(['2', '4']);
  });

  it('retorna array vazio quando nada bate', () => {
    const { result } = renderHook(() => useFilteredSkills(skills, filters({ types: ['plugin'], statuses: ['instalada'] }), new Set()));
    expect(result.current).toEqual([]);
  });
});
