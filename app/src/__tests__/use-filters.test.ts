import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from '@/hooks/use-filters';

describe('useFilters', () => {
  it('estado inicial é vazio', () => {
    const { result } = renderHook(() => useFilters());
    expect(result.current.filters).toEqual({
      types: [],
      statuses: [],
      tags: [],
      onlyFavorites: false,
      query: '',
    });
  });

  it('setType alterna inclusão/remoção', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setType('nativa'));
    expect(result.current.filters.types).toEqual(['nativa']);
    act(() => result.current.setType('plugin'));
    expect(result.current.filters.types).toEqual(['nativa', 'plugin']);
    act(() => result.current.setType('nativa'));
    expect(result.current.filters.types).toEqual(['plugin']);
  });

  it('setStatus alterna corretamente', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setStatus('instalada'));
    expect(result.current.filters.statuses).toEqual(['instalada']);
  });

  it('setTag alterna corretamente', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setTag('dev'));
    expect(result.current.filters.tags).toEqual(['dev']);
  });

  it('setQuery atualiza string', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.setQuery('teste'));
    expect(result.current.filters.query).toBe('teste');
  });

  it('toggleFavoritesOnly inverte boolean', () => {
    const { result } = renderHook(() => useFilters());
    act(() => result.current.toggleFavoritesOnly());
    expect(result.current.filters.onlyFavorites).toBe(true);
    act(() => result.current.toggleFavoritesOnly());
    expect(result.current.filters.onlyFavorites).toBe(false);
  });

  it('reset zera tudo', () => {
    const { result } = renderHook(() => useFilters());
    act(() => {
      result.current.setType('nativa');
      result.current.setQuery('teste');
      result.current.toggleFavoritesOnly();
    });
    act(() => result.current.reset());
    expect(result.current.filters).toEqual({
      types: [],
      statuses: [],
      tags: [],
      onlyFavorites: false,
      query: '',
    });
  });
});
