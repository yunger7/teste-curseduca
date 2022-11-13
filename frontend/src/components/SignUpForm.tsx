import { TextInput, PasswordInput, Button } from '@mantine/core';

export const SignUpForm = () => {
  return (
    <form>
      <TextInput required label="Nome" placeholder="E.T. Bilu" />
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
