export const categorizeEvent = (
  title: string,
  notes?: string
): 'Work' | 'Personal' | 'Other' => {
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
    return 'Work';
  } else if (personalKeywords.some(keyword => text.includes(keyword))) {
    return 'Personal';
  } else {
    return 'Other';
  }
};
