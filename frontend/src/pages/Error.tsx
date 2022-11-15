import { Center, Text, Title } from '@mantine/core';

export const Error = () => {
  return (
    <Center sx={{ height: 'calc(100% - 60px)', flexDirection: 'column' }}>
      <Title order={2} align="center">
        {'(╯°□°）╯︵ ┻━┻'}
      </Title>
      <Text color="dimmed" align="center" mt="sm">
        Wops! Parece que alguma coisa deu errado!
      </Text>
    </Center>
  );
};
