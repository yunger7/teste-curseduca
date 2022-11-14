import {
  createStyles,
  Box,
  Center,
  Card,
  Text,
  Divider,
  Stack,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { Logo } from '../components/Logo';
import { SignUpForm } from '../components/SignUpForm';
import { LoginForm } from '../components/LoginForm';

const useStyles = createStyles(theme => {
  const backgroundColor =
    theme.colorScheme === 'dark' ? theme.black : theme.white;

  return {
    root: {
      height: 'calc(100% - 60px)',
      background: theme.fn.radialGradient(
        theme.colors[theme.primaryColor]['6'],
        backgroundColor,
        backgroundColor
      ),
    },

    wrapper: {
      width: '100%',
      height: '100%',
      backdropFilter: 'blur(16px) saturate(180%)',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.black, 0.5)
          : theme.fn.rgba(theme.white, 0.5),
    },

    card: {
      width: '100%',
      maxWidth: theme.breakpoints.xs,
      marginTop: theme.spacing.lg,
    },
  };
});

export const Root = () => {
  const { classes } = useStyles();
  const [currentForm, toggleForm] = useToggle(['signup', 'login']);

  return (
    <Box className={classes.root}>
      <Center className={classes.wrapper}>
        <Card withBorder shadow="xl" p="xl" className={classes.card}>
          <Stack align="center" spacing={0}>
            <Logo iconSize={64} fontSize={34} />
            <Text mt="xs">Conectando universos.</Text>
          </Stack>
          <Divider my="md" />
          {currentForm === 'signup' ? <SignUpForm /> : <LoginForm />}
          <Text mt="md" size="sm" align="center">
            {currentForm === 'signup' ? (
              <>
                Já possui cadastro?{' '}
                <Text
                  span
                  inherit
                  variant="link"
                  onClick={() => toggleForm()}
                  sx={{ cursor: 'pointer' }}
                >
                  Fazer login
                </Text>
              </>
            ) : (
              <>
                Não possui uma conta?{' '}
                <Text
                  span
                  inherit
                  variant="link"
                  onClick={() => toggleForm()}
                  sx={{ cursor: 'pointer' }}
                >
                  Cadastre-se
                </Text>
              </>
            )}
          </Text>
        </Card>
      </Center>
    </Box>
  );
};
