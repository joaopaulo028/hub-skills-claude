import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readJSON, writeJSON } from '@/lib/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('readJSON retorna fallback quando chave não existe', () => {
    expect(readJSON('missing', ['fallback'])).toEqual(['fallback']);
  });

  it('writeJSON e readJSON roundtrip', () => {
    writeJSON('test', { a: 1, b: [2, 3] });
    expect(readJSON('test', null)).toEqual({ a: 1, b: [2, 3] });
  });

  it('readJSON retorna fallback quando JSON está corrompido', () => {
    localStorage.setItem('broken', '{not json');
    expect(readJSON('broken', 'fallback')).toBe('fallback');
  });

  it('writeJSON não lança quando localStorage falha (private mode)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => writeJSON('any', { x: 1 })).not.toThrow();
  });

  it('readJSON não lança quando localStorage falha', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(readJSON('any', 'safe')).toBe('safe');
  });
});
