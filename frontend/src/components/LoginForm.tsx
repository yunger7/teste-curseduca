import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { createAxiosClient } from '../services/createAxiosClient';

import type { FormEvent } from 'react';

const client = createAxiosClient();

type LoginAPIResponse = {
  accessToken: string;
  refreshToken: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await client.post<LoginAPIResponse>(
        '/auth/login',
        { email, password },
        { authorization: false }
      );

      localStorage.setItem('invo-access-token', data.accessToken);
      localStorage.setItem('invo-refresh-token', data.refreshToken);

      navigate('/posts');
    } catch (error: any) {
      console.log(error);
      if (error.name == 'AxiosError' && error.response.status == 403) {
        showNotification({
          title: 'Wops! Parece que alguma coisa deu errado :(',
          message:
            'Suas credenciais estão inválidas! Verifique seu email/senha e tente novamente.',
          color: 'red',
          autoClose: 5000,
        });
      }
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        type="email"
        label="Email"
        placeholder="bilu@saturno.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <PasswordInput
        required
        label="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button fullWidth type="submit" mt="xl" loading={loading}>
        Cadastrar
      </Button>
    </form>
  );
};
