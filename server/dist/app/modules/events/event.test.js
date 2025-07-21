"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_utils_1 = require("./event.utils");
describe('categorizeEvent', () => {
    it('categorizes events with work keywords as "work"', () => {
        expect((0, event_utils_1.categorizeEvent)('Meeting with client')).toBe('work');
        expect((0, event_utils_1.categorizeEvent)('Project deadline')).toBe('work');
        expect((0, event_utils_1.categorizeEvent)('Client presentation')).toBe('work');
    });
    it('categorizes events with personal keywords as "personal"', () => {
        expect((0, event_utils_1.categorizeEvent)('Birthday celebration')).toBe('personal');
        expect((0, event_utils_1.categorizeEvent)('Family gathering')).toBe('personal');
        expect((0, event_utils_1.categorizeEvent)('Anniversary dinner')).toBe('personal');
    });
    it('categorizes events with no matching keywords as "other"', () => {
        expect((0, event_utils_1.categorizeEvent)('Casual meetup')).toBe('other');
        expect((0, event_utils_1.categorizeEvent)('Shopping trip')).toBe('other');
    });
    it('includes notes in categorization', () => {
        expect((0, event_utils_1.categorizeEvent)('Client meeting', 'Discuss project')).toBe('work');
        expect((0, event_utils_1.categorizeEvent)('Family vacation', 'Trip to the beach')).toBe('personal');
    });
});
