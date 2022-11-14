import { Outlet } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

import { Header } from './components/Header';
import { theme } from './styles/theme';

import type { ColorScheme } from '@mantine/core';

export const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'cosmos-color-scheme',
    defaultValue: 'dark',
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
        <NotificationsProvider autoClose={4000}>
          <Header />
          <Outlet />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
