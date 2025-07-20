export const categorizeEvent = (
  title: string,
  notes?: string
): 'work' | 'personal' | 'other' => {
  const text = (title + ' ' + (notes || '')).toLowerCase();

  const workKeywords = ['meeting', 'project', 'client', 'work', 'deadline'];
  const personalKeywords = [
    'birthday',
    'family',
    'anniversary',
    'personal',
    'friends',
  ];

  if (workKeywords.some(keyword => text.includes(keyword))) {
    return 'work';
  } else if (personalKeywords.some(keyword => text.includes(keyword))) {
    return 'personal';
  } else {
    return 'other';
  }
};
