import { describe, it, expect } from 'vitest';
import { getTier, getGreeting } from '../context/useStore';

describe('getTier', () => {
  it('returns "Eco Beginner" for score < 20', () => {
    expect(getTier(0)).toBe('Eco Beginner');
    expect(getTier(19)).toBe('Eco Beginner');
  });

  it('returns "Eco Starter" for score 20-39', () => {
    expect(getTier(20)).toBe('Eco Starter');
    expect(getTier(39)).toBe('Eco Starter');
  });

  it('returns "Eco Explorer" for score 40-59', () => {
    expect(getTier(40)).toBe('Eco Explorer');
    expect(getTier(59)).toBe('Eco Explorer');
  });

  it('returns "Eco Warrior" for score 60-79', () => {
    expect(getTier(60)).toBe('Eco Warrior');
    expect(getTier(79)).toBe('Eco Warrior');
  });

  it('returns "Eco Champion" for score >= 80', () => {
    expect(getTier(80)).toBe('Eco Champion');
    expect(getTier(100)).toBe('Eco Champion');
  });

  it('handles boundary values exactly', () => {
    expect(getTier(19)).toBe('Eco Beginner');
    expect(getTier(20)).toBe('Eco Starter');
    expect(getTier(39)).toBe('Eco Starter');
    expect(getTier(40)).toBe('Eco Explorer');
    expect(getTier(59)).toBe('Eco Explorer');
    expect(getTier(60)).toBe('Eco Warrior');
    expect(getTier(79)).toBe('Eco Warrior');
    expect(getTier(80)).toBe('Eco Champion');
  });
});

describe('getGreeting', () => {
  it('returns a string starting with "Good"', () => {
    const result = getGreeting();
    expect(result).toMatch(/^Good (morning|afternoon|evening)$/);
  });
});
