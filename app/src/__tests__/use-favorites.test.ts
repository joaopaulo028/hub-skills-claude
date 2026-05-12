import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/use-favorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa vazio quando localStorage está vazio', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.size).toBe(0);
    expect(result.current.isFavorite('any')).toBe(false);
  });

  it('toggle adiciona quando ausente', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-1'));
    expect(result.current.isFavorite('skill-1')).toBe(true);
    expect(result.current.favorites.size).toBe(1);
  });

  it('toggle remove quando presente', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-1'));
    act(() => result.current.toggle('skill-1'));
    expect(result.current.isFavorite('skill-1')).toBe(false);
    expect(result.current.favorites.size).toBe(0);
  });

  it('persiste em localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggle('skill-a'));
    act(() => result.current.toggle('skill-b'));
    const raw = localStorage.getItem('hub-skills:favorites');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed).toEqual(expect.arrayContaining(['skill-a', 'skill-b']));
  });

  it('hidrata a partir de localStorage', () => {
    localStorage.setItem('hub-skills:favorites', JSON.stringify(['x', 'y']));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorite('x')).toBe(true);
    expect(result.current.isFavorite('y')).toBe(true);
    expect(result.current.favorites.size).toBe(2);
  });
});
