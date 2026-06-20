import { describe, it, expect, beforeEach } from 'vitest';
import { sanitizeText, clampNumber } from '../utils/validation';

describe('sanitizeText', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(42)).toBe('');
    expect(sanitizeText({})).toBe('');
  });

  it('strips HTML tags', () => {
    expect(sanitizeText('<script>alert("xss")</script>hello')).toBe('alert("xss")hello');
    expect(sanitizeText('<b>bold</b>')).toBe('bold');
    expect(sanitizeText('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
    expect(sanitizeText('\n\thello\n')).toBe('hello');
  });

  it('enforces max length', () => {
    const longString = 'a'.repeat(300);
    expect(sanitizeText(longString, 200).length).toBe(200);
    expect(sanitizeText(longString, 50).length).toBe(50);
  });

  it('uses default max length of 200', () => {
    const longString = 'a'.repeat(300);
    expect(sanitizeText(longString).length).toBe(200);
  });

  it('passes through clean short strings unchanged', () => {
    expect(sanitizeText('hello world')).toBe('hello world');
    expect(sanitizeText('plant-based meal')).toBe('plant-based meal');
  });
});

describe('clampNumber', () => {
  it('returns the value when within range', () => {
    expect(clampNumber(5, 0, 10)).toBe(5);
    expect(clampNumber(0, 0, 10)).toBe(0);
    expect(clampNumber(10, 0, 10)).toBe(10);
  });

  it('clamps to min when value is below range', () => {
    expect(clampNumber(-5, 0, 10)).toBe(0);
    expect(clampNumber(-100, 0, 10)).toBe(0);
  });

  it('clamps to max when value is above range', () => {
    expect(clampNumber(15, 0, 10)).toBe(10);
    expect(clampNumber(1000, 0, 10)).toBe(10);
  });

  it('returns min for NaN', () => {
    expect(clampNumber(NaN, 0, 10)).toBe(0);
    expect(clampNumber('abc', 5, 20)).toBe(5);
  });

  it('handles string numbers', () => {
    expect(clampNumber('7', 0, 10)).toBe(7);
    expect(clampNumber('15', 0, 10)).toBe(10);
  });
});
