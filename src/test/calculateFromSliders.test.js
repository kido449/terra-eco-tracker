import { describe, it, expect } from 'vitest';
import { calculateFromSliders } from '../utils/calculations';

const defaultSliders = {
  meatMeals: 7,
  milesDriven: 100,
  thermostat: 72,
  flights: 2,
};

describe('calculateFromSliders', () => {
  it('returns meat, driving, thermostat, flights, and total', () => {
    const result = calculateFromSliders(defaultSliders);
    expect(result).toHaveProperty('meat');
    expect(result).toHaveProperty('driving');
    expect(result).toHaveProperty('thermostat');
    expect(result).toHaveProperty('flights');
    expect(result).toHaveProperty('total');
  });

  it('total equals sum of all categories', () => {
    const result = calculateFromSliders(defaultSliders);
    expect(result.total).toBe(result.meat + result.driving + result.thermostat + result.flights);
  });

  // ─── Meat calculation ──────────────────────────────────────
  it('meat: 7 meals/week * 52 weeks * 3.3 kg = 1201 (rounded)', () => {
    const result = calculateFromSliders({ ...defaultSliders, meatMeals: 7 });
    expect(result.meat).toBe(Math.round(7 * 52 * 3.3));
  });

  it('zero meat meals results in zero meat CO2', () => {
    const result = calculateFromSliders({ ...defaultSliders, meatMeals: 0 });
    expect(result.meat).toBe(0);
  });

  // ─── Driving calculation ───────────────────────────────────
  it('driving: 100 mi/week * 52 weeks * 0.21 = 1092', () => {
    const result = calculateFromSliders({ ...defaultSliders, milesDriven: 100 });
    expect(result.driving).toBe(Math.round(100 * 52 * 0.21));
  });

  it('zero miles driven results in zero driving CO2', () => {
    const result = calculateFromSliders({ ...defaultSliders, milesDriven: 0 });
    expect(result.driving).toBe(0);
  });

  // ─── Thermostat calculation ────────────────────────────────
  it('thermostat at 68°F produces base HVAC of 2500', () => {
    const result = calculateFromSliders({ ...defaultSliders, thermostat: 68 });
    expect(result.thermostat).toBe(2500);
  });

  it('each degree above 68 adds 3% to HVAC', () => {
    const at68 = calculateFromSliders({ ...defaultSliders, thermostat: 68 });
    const at72 = calculateFromSliders({ ...defaultSliders, thermostat: 72 });
    // 72 - 68 = 4 degrees * 3% = 12% increase
    expect(at72.thermostat).toBe(Math.round(2500 * (1 + 4 * 0.03)));
  });

  it('thermostat below 68 reduces HVAC cost', () => {
    const at60 = calculateFromSliders({ ...defaultSliders, thermostat: 60 });
    // 60 - 68 = -8 degrees * 3% = -24%
    expect(at60.thermostat).toBe(Math.round(2500 * (1 + (-8) * 0.03)));
  });

  // ─── Flights calculation ───────────────────────────────────
  it('each flight adds 800 kg', () => {
    const f0 = calculateFromSliders({ ...defaultSliders, flights: 0 });
    const f10 = calculateFromSliders({ ...defaultSliders, flights: 10 });
    expect(f10.flights - f0.flights).toBe(8000);
  });

  it('zero flights results in zero flight CO2', () => {
    const result = calculateFromSliders({ ...defaultSliders, flights: 0 });
    expect(result.flights).toBe(0);
  });

  // ─── Edge cases ────────────────────────────────────────────
  it('all sliders at zero results in baseline thermostat only', () => {
    const result = calculateFromSliders({ meatMeals: 0, milesDriven: 0, thermostat: 68, flights: 0 });
    expect(result.meat).toBe(0);
    expect(result.driving).toBe(0);
    expect(result.flights).toBe(0);
    expect(result.thermostat).toBe(2500);
    expect(result.total).toBe(2500);
  });

  it('all values are rounded integers', () => {
    const result = calculateFromSliders(defaultSliders);
    expect(Number.isInteger(result.meat)).toBe(true);
    expect(Number.isInteger(result.driving)).toBe(true);
    expect(Number.isInteger(result.thermostat)).toBe(true);
    expect(Number.isInteger(result.flights)).toBe(true);
    expect(Number.isInteger(result.total)).toBe(true);
  });
});
