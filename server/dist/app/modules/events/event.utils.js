"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEvent = void 0;
const categorizeEvent = (title, notes) => {
    const text = (title + ' ' + (notes || '')).toLowerCase();
    const workKeywords = ['meeting', 'project', 'client', 'deadline', 'report'];
    const personalKeywords = [
        'birthday',
        'family',
        'anniversary',
        'party',
        'holiday',
    ];
    if (workKeywords.some(keyword => text.includes(keyword))) {
        return 'work';
    }
    if (personalKeywords.some(keyword => text.includes(keyword))) {
        return 'personal';
    }
    return 'other';
};
exports.categorizeEvent = categorizeEvent;
