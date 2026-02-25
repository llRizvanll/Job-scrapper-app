export const durations = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 500,
} as const;

export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const transitions = {
  colors: `color ${durations.base}ms ${easings.easeInOut}, background-color ${durations.base}ms ${easings.easeInOut}, border-color ${durations.base}ms ${easings.easeInOut}`,
  transform: `transform ${durations.base}ms ${easings.easeOut}`,
  opacity: `opacity ${durations.base}ms ${easings.easeInOut}`,
  shadow: `box-shadow ${durations.base}ms ${easings.easeInOut}`,
  all: `all ${durations.base}ms ${easings.easeInOut}`,
  fast: `all ${durations.fast}ms ${easings.easeInOut}`,
  slow: `all ${durations.slow}ms ${easings.easeInOut}`,
} as const;

export const animations = {
  spin: {
    keyframes:
      '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
    animation: `spin 1s linear infinite`,
  },
  fadeIn: {
    keyframes: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
    animation: `fadeIn ${durations.base}ms ${easings.easeInOut}`,
  },
  slideUp: {
    keyframes:
      '@keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
    animation: `slideUp ${durations.base}ms ${easings.easeOut}`,
  },
  slideDown: {
    keyframes:
      '@keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
    animation: `slideDown ${durations.base}ms ${easings.easeOut}`,
  },
} as const;

