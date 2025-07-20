export const categorizeEvent = (
  title: string,
  notes?: string
): 'work' | 'personal' | 'other' => {
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
