import { initializeSyntheticData } from '@/lib/syntheticData';

describe('syntheticData', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('initializeSyntheticData writes to localStorage and returns program arrays', () => {
    const result = initializeSyntheticData();
    expect(result).toBeDefined();
    expect(Array.isArray(result.programs)).toBe(true);
    expect(Array.isArray(result.programDetails)).toBe(true);
    expect(result.programs.length).toBeGreaterThanOrEqual(1);
    expect(result.programDetails.length).toBeGreaterThanOrEqual(1);
    expect(window.localStorage.getItem('programs')).not.toBeNull();
    expect(window.localStorage.getItem('programDetails')).not.toBeNull();
  });

  test('initializeSyntheticData returns stored values when present', () => {
    const fakePrograms = [{ id: 'P1' }];
    const fakeDetails = [{ id: 'P1' }];
    window.localStorage.setItem('programs', JSON.stringify(fakePrograms));
    window.localStorage.setItem('programDetails', JSON.stringify(fakeDetails));
    const result = initializeSyntheticData();
    expect(result.programs).toEqual(fakePrograms);
    expect(result.programDetails).toEqual(fakeDetails);
  });
});
