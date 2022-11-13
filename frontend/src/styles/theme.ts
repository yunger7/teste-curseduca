import type { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'grape',
  defaultGradient: { from: 'grape', to: 'blue' },
  cursorType: 'pointer',
  globalStyles: theme => ({
    'html, body, #root': {
      height: '100%',
    },
  }),
};
