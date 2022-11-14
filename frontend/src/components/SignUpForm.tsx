import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { createAxiosClient } from '../services/createAxiosClient';

import type { FormEvent } from 'react';

type SignUpAPIResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

const client = createAxiosClient();

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await client.post<SignUpAPIResponse>(
        '/auth/signup',
        { name, email, password },
        { authorization: false }
      );

      localStorage.setItem('invo-access-token', data.accessToken);
      localStorage.setItem('invo-refresh-token', data.refreshToken);
      localStorage.setItem('invo-user-id', data.userId);

      navigate('/posts');
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Wops! Parece que alguma coisa deu errado :(',
        message:
          'Não foi possível realizar seu cadastro, tente novamente mais tarde.',
        color: 'red',
      });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        label="Nome"
        placeholder="E.T. Bilu"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
