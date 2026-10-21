
export const skills = [
  {
    id: 'html',
    name: 'HTML',
    icon: '🌍',
    color: '#d4af37',
    description: 'Structure the web with semantic markup.',
    difficulty: 1,
    requiredXP: 0,
    lessonIds: ['html-1', 'html-2', 'html-3', 'html-4', 'html-5'],
    codeverseLabel: 'HTML REALM',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '✨',
    color: '#0284c7',
    description: 'Style and lay out interfaces with confidence.',
    difficulty: 1,
    requiredXP: 100,
    lessonIds: ['css-1', 'css-2', 'css-3', 'css-4', 'css-5'],
    codeverseLabel: 'CSS CITADEL',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    color: '#b45309',
    description: 'Bring pages to life with logic and interactivity.',
    difficulty: 2,
    requiredXP: 200,
    lessonIds: [
      'js-1', 'js-2', 'js-3', 'js-4', 'js-5', 'js-6', 'js-7', 'js-8',
    ],
    codeverseLabel: 'JAVASCRIPT PALACE',
  },
  {
    id: 'react',
    name: 'React',
    icon: '👑',
    color: '#4338ca',
    description: 'Build interactive UIs with components and state.',
    difficulty: 3,
    requiredXP: 300,
    lessonIds: ['react-1', 'react-2', 'react-3', 'react-4', 'react-5', 'react-6'],
    codeverseLabel: 'REACT THRONE',
  },
];

export const skillOrder = ['html', 'css', 'javascript', 'react'];
