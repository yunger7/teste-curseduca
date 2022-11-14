import { Card, Text, Badge, Group, Skeleton, ActionIcon } from '@mantine/core';
import { TbEdit as IconEdit, TbTrash as IconDelete } from 'react-icons/tb';

export type PostData = {
  id: string;
  title: string;
  content?: string;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
  userId: string;
  user: {
    name: string;
  };
};

type PostProps = {
  post?: PostData;
  loading?: boolean;
};

export const Post = ({ post, loading }: PostProps) => {
  if (loading) {
    return (
      <Card withBorder mb="xl">
        <Skeleton mb="lg" height={24} />
        <Skeleton mt="xs" height={8} />
        <Skeleton mt="xs" height={8} width="75%" />
        <Skeleton mt="xs" height={8} width="90%" />
      </Card>
    );
  }

  if (post) {
    return (
      <Card withBorder mb="xl">
        <Group>
          <Text weight={600}>{post.title}</Text>
          <Badge size="sm" variant="outline" mb={-2}>
            {post.user.name}
          </Badge>
        </Group>
        {post.content && <Text mb="xs">{post.content}</Text>}
        <Group position="apart" spacing="xs" sx={{ alignItems: 'flex-end' }}>
          <div>
            <Text color="dimmed" size="sm">
              Criado em: {new Date(post.createdAt).toLocaleString()}
            </Text>
            <Text color="dimmed" size="sm">
              Atualizado em: {new Date(post.updatedAt).toLocaleString()}
            </Text>
          </div>
          {localStorage.getItem('invo-user-id') === post.userId && (
            <Group>
              <ActionIcon color="grape" variant="outline">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="grape" variant="outline">
                <IconDelete size={18} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </Card>
    );
  }

  return null;
};
