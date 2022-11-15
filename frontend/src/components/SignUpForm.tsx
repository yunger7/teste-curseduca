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

      localStorage.setItem('cosmos-access-token', data.accessToken);
      localStorage.setItem('cosmos-refresh-token', data.refreshToken);
      localStorage.setItem('cosmos-user-id', data.userId);

      navigate('/posts');
    } catch (error: any) {
      console.log(error);

      if (error.name == 'AxiosError' && error.response.status == 403) {
        showNotification({
          title: 'Wops! Parece que alguma coisa deu errado :(',
          message:
            'Esse email já está registrado, mude o email e tente novamente.',
          color: 'red',
          autoClose: 5000,
        });
      } else {
        showNotification({
          title: 'Wops! Parece que alguma coisa deu errado :(',
          message:
            'Não foi possível realizar seu cadastro, tente novamente mais tarde.',
          color: 'red',
        });
      }
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        label="Nome"
        placeholder="X Æ A-12"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextInput
        required
        type="email"
        label="Email"
        placeholder="armstrong@lua.com"
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
