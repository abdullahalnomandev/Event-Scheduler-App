import { categorizeEvent } from './event.utils';

describe('categorizeEvent', () => {
  it('categorizes events with work keywords as "work"', () => {
    expect(categorizeEvent('Meeting with client')).toBe('work');
    expect(categorizeEvent('Project deadline')).toBe('work');
    expect(categorizeEvent('Client presentation')).toBe('work');
  });

  it('categorizes events with personal keywords as "personal"', () => {
    expect(categorizeEvent('Birthday celebration')).toBe('personal');
    expect(categorizeEvent('Family gathering')).toBe('personal');
    expect(categorizeEvent('Anniversary dinner')).toBe('personal');
  });

  it('categorizes events with no matching keywords as "other"', () => {
    expect(categorizeEvent('Casual meetup')).toBe('other');
    expect(categorizeEvent('Shopping trip')).toBe('other');
  });

  it('includes notes in categorization', () => {
    expect(categorizeEvent('Client meeting', 'Discuss project')).toBe('work');
    expect(categorizeEvent('Family vacation', 'Trip to the beach')).toBe(
      'personal'
    );
  });
});
