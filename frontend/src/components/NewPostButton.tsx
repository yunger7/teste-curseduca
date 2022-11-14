import { Link } from 'react-router-dom';
import { Affix, Tooltip, ActionIcon } from '@mantine/core';
import { TbPlus as IconNew } from 'react-icons/tb';

export const NewPostButton = () => {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Tooltip label="Criar post">
        <ActionIcon
          component={Link}
          size="xl"
          color="grape"
          variant="filled"
          radius="md"
          aria-label="Criar post"
          to="/posts/new"
        >
          <IconNew size={24} />
        </ActionIcon>
      </Tooltip>
    </Affix>
  );
};
