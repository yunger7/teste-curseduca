import { useNavigate } from 'react-router-dom';
import {
  Header as MantineHeader,
  Container,
  Group,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  createStyles,
} from '@mantine/core';
import {
  TbSun as IconSun,
  TbMoon as IconMoon,
  TbBrandGithub as IconGithub,
  TbLogout as IconLogout,
} from 'react-icons/tb';

import { Logo } from './Logo';

const useStyles = createStyles(theme => ({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backfaceVisibility: 'hidden',
    backdropFilter: 'saturate(180%) blur(5px)',
    backgroundColor: theme.fn.rgba(
      theme.colorScheme === 'light' ? theme.white : theme.black,
      theme.colorScheme === 'light' ? 0.8 : 0.5
    ),
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

export const Header = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  function logout() {
    localStorage.removeItem('cosmos-access-token');
    localStorage.removeItem('cosmos-refresh-token');
    localStorage.removeItem('cosmos-user-id');

    navigate('/');
  }

  return (
    <MantineHeader className={classes.header} height={60} p="xs">
      <Container className={classes.container} size="xl">
        <Logo />
        <Group spacing="sm">
          <Tooltip label="GitHub" position="bottom">
            <ActionIcon
              variant="default"
              component="a"
              href="https://github.com/yunger7/teste-curseduca"
              target="_blank"
            >
              <IconGithub size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={colorScheme === 'dark' ? 'Tema claro' : 'Tema escuro'}
            position="bottom"
          >
            <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
              {colorScheme === 'dark' ? (
                <IconSun size={18} />
              ) : (
                <IconMoon size={18} />
              )}
            </ActionIcon>
          </Tooltip>
          {localStorage.getItem('cosmos-user-id') && (
            <Tooltip label="Sair" position="bottom">
              <ActionIcon variant="default" onClick={() => logout()}>
                <IconLogout size={18} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Container>
    </MantineHeader>
  );
};
