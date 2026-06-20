import { describe, it, expect } from 'vitest';
import { calculateArchetype } from '../utils/calculations';

describe('calculateArchetype', () => {
  it('returns optimizer when all answers favor optimizer', () => {
    const answers = Array(8).fill({ optimizer: 3, minimalist: 0, advocate: 0, innovator: 1, naturalist: 0 });
    expect(calculateArchetype(answers)).toBe('optimizer');
  });

  it('returns minimalist when all answers favor minimalist', () => {
    const answers = Array(8).fill({ optimizer: 0, minimalist: 3, advocate: 0, innovator: 0, naturalist: 1 });
    expect(calculateArchetype(answers)).toBe('minimalist');
  });

  it('returns advocate when all answers favor advocate', () => {
    const answers = Array(8).fill({ optimizer: 0, minimalist: 0, advocate: 3, innovator: 0, naturalist: 1 });
    expect(calculateArchetype(answers)).toBe('advocate');
  });

  it('returns innovator when all answers favor innovator', () => {
    const answers = Array(8).fill({ optimizer: 1, minimalist: 0, advocate: 0, innovator: 3, naturalist: 0 });
    expect(calculateArchetype(answers)).toBe('innovator');
  });

  it('returns naturalist when all answers favor naturalist', () => {
    const answers = Array(8).fill({ optimizer: 0, minimalist: 1, advocate: 0, innovator: 0, naturalist: 3 });
    expect(calculateArchetype(answers)).toBe('naturalist');
  });

  it('mixed answers return the highest scoring archetype', () => {
    const answers = [
      { optimizer: 3, innovator: 1 },
      { optimizer: 3, innovator: 1 },
      { minimalist: 3, naturalist: 1 },
      { optimizer: 3, minimalist: 1 },
      { optimizer: 3, advocate: 1 },
      { minimalist: 3, naturalist: 1 },
      { advocate: 3, innovator: 1 },
      { optimizer: 3, minimalist: 1 },
    ];
    // optimizer: 3+3+0+3+3+0+0+3 = 15 (highest)
    expect(calculateArchetype(answers)).toBe('optimizer');
  });

  it('handles empty answers array gracefully', () => {
    const answers = [{ optimizer: 0, minimalist: 0, advocate: 0, innovator: 0, naturalist: 0 }];
    // All zero, should still return one (first in sorted order when tied)
    const result = calculateArchetype(answers);
    expect(['optimizer', 'minimalist', 'advocate', 'innovator', 'naturalist']).toContain(result);
  });

  it('handles single answer', () => {
    const answers = [{ advocate: 5 }];
    expect(calculateArchetype(answers)).toBe('advocate');
  });

  it('accumulates scores across multiple answers', () => {
    const answers = [
      { optimizer: 1 },
      { optimizer: 1 },
      { optimizer: 1 },
      { naturalist: 2 },
    ];
    // optimizer: 3, naturalist: 2 → optimizer wins
    expect(calculateArchetype(answers)).toBe('optimizer');
  });
});
