import { TextInput, PasswordInput, Button } from '@mantine/core';

export const LoginForm = () => {
  return (
    <form>
      <TextInput
        required
        type="email"
        label="Email"
        placeholder="bilu@saturno.com"
      />
      <PasswordInput required label="Senha" />
      <Button fullWidth mt="xl">
        Cadastrar
      </Button>
    </form>
  );
};
