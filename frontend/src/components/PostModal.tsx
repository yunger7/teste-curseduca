import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, TextInput, Button, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import type { FormEvent } from 'react';

export type PostInfo = {
  title: string;
  content?: string;
};

type PostModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: PostInfo) => Promise<void>;
  actionName: string;
  initialValue?: PostInfo;
};

export const PostModal = (props: PostModalProps) => {
  const { opened, onClose, onSubmit, actionName, initialValue } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState(initialValue?.title || '');
  const [content, setContent] = useState(initialValue?.content || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit({ title, content });

      setTitle('');
      setContent('');

      navigate(0);
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Wops! Parece que alguma coisa deu errado :(',
        message:
          'Não foi possível concluir a ação, tente novamente mais tarde.',
        color: 'red',
      });
    }

    setLoading(false);
  }

  return (
    <Modal opened={opened} onClose={onClose} title={actionName}>
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Título"
          disabled={loading}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea
          label="Conteúdo"
          minRows={4}
          disabled={loading}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button fullWidth type="submit" mt="xl" loading={loading}>
          {actionName}
        </Button>
      </form>
    </Modal>
  );
};
