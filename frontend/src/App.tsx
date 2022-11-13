import { Outlet } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider, Container } from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';

import { Header } from './components/Header';
import { theme } from './styles/theme';

import type { ColorScheme } from '@mantine/core';

export const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'invo-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...theme, colorScheme }}
      >
        <Header />
        <Container size="lg">
          <Outlet />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
