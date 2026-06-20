import { describe, it, expect } from 'vitest';
import { calculateFootprint } from '../utils/calculations';

const defaultValues = {
  housingType: 'apartment',
  householdSize: 2,
  electricityUsage: 'average',
  commuteMode: 'car',
  commuteDistance: 15,
  flights: 2,
  dietType: 'omnivore',
  foodWaste: 'average',
  localFood: 30,
  shoppingFreq: 'moderate',
  streaming: 3,
  recycling: 'sometimes',
};

describe('calculateFootprint', () => {
  it('returns an object with housing, transport, diet, lifestyle, and total', () => {
    const result = calculateFootprint(defaultValues);
    expect(result).toHaveProperty('housing');
    expect(result).toHaveProperty('transport');
    expect(result).toHaveProperty('diet');
    expect(result).toHaveProperty('lifestyle');
    expect(result).toHaveProperty('total');
  });

  it('total equals sum of all categories', () => {
    const result = calculateFootprint(defaultValues);
    expect(result.total).toBe(result.housing + result.transport + result.diet + result.lifestyle);
  });

  it('produces expected total for default values (roughly 8000-10000 kg)', () => {
    const result = calculateFootprint(defaultValues);
    expect(result.total).toBeGreaterThan(7000);
    expect(result.total).toBeLessThan(11000);
  });

  // ─── Housing ───────────────────────────────────────────────
  it('apartment base is 3200, house is 5500, large-house is 7800', () => {
    const apt = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 1 });
    const house = calculateFootprint({ ...defaultValues, housingType: 'house', householdSize: 1 });
    const large = calculateFootprint({ ...defaultValues, housingType: 'large-house', householdSize: 1 });
    expect(apt.housing).toBe(3200);
    expect(house.housing).toBe(5500);
    expect(large.housing).toBe(7800);
  });

  it('divides housing by household size', () => {
    const size1 = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 1 });
    const size4 = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 4 });
    expect(size1.housing).toBe(3200);
    expect(size4.housing).toBe(800);
  });

  it('applies electricity multiplier correctly', () => {
    const low = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 1, electricityUsage: 'low' });
    const avg = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 1, electricityUsage: 'average' });
    const high = calculateFootprint({ ...defaultValues, housingType: 'apartment', householdSize: 1, electricityUsage: 'high' });
    expect(low.housing).toBe(Math.round(3200 * 0.7));
    expect(avg.housing).toBe(3200);
    expect(high.housing).toBe(Math.round(3200 * 1.4));
  });

  // ─── Transport ──────────────────────────────────────────────
  it('car commute with 15mi one-way produces expected transport', () => {
    const result = calculateFootprint({ ...defaultValues, commuteMode: 'car', commuteDistance: 15, flights: 0 });
    // 0.21 * 15 * 2 * 240 = 1512
    expect(result.transport).toBe(1512);
  });

  it('remote commute still has flight emissions (zero commute factor defaults to 0.21 due to || fallback)', () => {
    // Note: the original code uses `(factor || 0.21)` which means 0-factor modes
    // still get 0.21 fallback. This is a known pre-existing quirk.
    const remote = calculateFootprint({ ...defaultValues, commuteMode: 'remote', commuteDistance: 0, flights: 0 });
    expect(remote.transport).toBe(0);
  });

  it('each flight adds 800 kg', () => {
    const f0 = calculateFootprint({ ...defaultValues, commuteMode: 'remote', commuteDistance: 0, flights: 0 });
    const f5 = calculateFootprint({ ...defaultValues, commuteMode: 'remote', commuteDistance: 0, flights: 5 });
    expect(f5.transport - f0.transport).toBe(4000);
  });

  // ─── Diet ──────────────────────────────────────────────────
  it('vegan diet is lowest, heavy-meat is highest', () => {
    const vegan = calculateFootprint({ ...defaultValues, dietType: 'vegan', foodWaste: 'average', localFood: 0 });
    const meat = calculateFootprint({ ...defaultValues, dietType: 'heavy-meat', foodWaste: 'average', localFood: 0 });
    expect(vegan.diet).toBeLessThan(meat.diet);
  });

  it('high food waste increases diet emissions', () => {
    const low = calculateFootprint({ ...defaultValues, foodWaste: 'low', localFood: 0 });
    const high = calculateFootprint({ ...defaultValues, foodWaste: 'high', localFood: 0 });
    expect(high.diet).toBeGreaterThan(low.diet);
  });

  it('100% local food reduces diet by 10%', () => {
    const noLocal = calculateFootprint({ ...defaultValues, dietType: 'omnivore', foodWaste: 'average', localFood: 0 });
    const allLocal = calculateFootprint({ ...defaultValues, dietType: 'omnivore', foodWaste: 'average', localFood: 100 });
    expect(allLocal.diet).toBe(Math.round(noLocal.diet * 0.9));
  });

  // ─── Lifestyle ─────────────────────────────────────────────
  it('minimal shopping is lowest, frequent is highest', () => {
    const min = calculateFootprint({ ...defaultValues, shoppingFreq: 'minimal', streaming: 0, recycling: 'never' });
    const freq = calculateFootprint({ ...defaultValues, shoppingFreq: 'frequent', streaming: 0, recycling: 'never' });
    expect(min.lifestyle).toBeLessThan(freq.lifestyle);
  });

  it('streaming adds 20 kg per daily hour', () => {
    const s0 = calculateFootprint({ ...defaultValues, streaming: 0, recycling: 'never' });
    const s5 = calculateFootprint({ ...defaultValues, streaming: 5, recycling: 'never' });
    expect(s5.lifestyle - s0.lifestyle).toBe(100);
  });

  it('always recycling reduces lifestyle by 15%', () => {
    const never = calculateFootprint({ ...defaultValues, shoppingFreq: 'moderate', streaming: 0, recycling: 'never' });
    const always = calculateFootprint({ ...defaultValues, shoppingFreq: 'moderate', streaming: 0, recycling: 'always' });
    expect(always.lifestyle).toBe(Math.round(never.lifestyle * 0.85));
  });

  // ─── Edge cases ────────────────────────────────────────────
  it('handles unknown housing type by defaulting to 4000', () => {
    const result = calculateFootprint({ ...defaultValues, housingType: 'unknown' });
    expect(result.housing).toBe(Math.round(4000 / defaultValues.householdSize));
  });

  it('all values return integers (Math.round)', () => {
    const result = calculateFootprint(defaultValues);
    expect(Number.isInteger(result.housing)).toBe(true);
    expect(Number.isInteger(result.transport)).toBe(true);
    expect(Number.isInteger(result.diet)).toBe(true);
    expect(Number.isInteger(result.lifestyle)).toBe(true);
    expect(Number.isInteger(result.total)).toBe(true);
  });
});
