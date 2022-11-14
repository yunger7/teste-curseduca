import { useState } from 'react';
import { Affix, Tooltip, ActionIcon } from '@mantine/core';
import { TbPlus as IconNew } from 'react-icons/tb';

import { PostModal, PostInfo } from './PostModal';
import { createAxiosClient } from '../services/createAxiosClient';

const client = createAxiosClient();

export const NewPostButton = () => {
  const [opened, setOpened] = useState(false);

  async function handleSubmit({ title, content }: PostInfo) {
    try {
      await client.post('/posts', { title, content });
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Tooltip label="Criar post">
          <ActionIcon
            size="xl"
            color="grape"
            variant="filled"
            radius="md"
            aria-label="Criar post"
            onClick={() => setOpened(true)}
          >
            <IconNew size={24} />
          </ActionIcon>
        </Tooltip>
      </Affix>
      <PostModal
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmit={handleSubmit}
        actionName="Criar post"
      />
    </>
  );
};
