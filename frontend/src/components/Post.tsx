import { Card, Text, Badge, Group, Skeleton } from '@mantine/core';

export type PostData = {
  id: string;
  title: string;
  content?: string;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
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
        <Text color="dimmed" size="sm">
          Criado em: {new Date(post.createdAt).toLocaleString()}
        </Text>
        <Text color="dimmed" size="sm">
          Atualizado em: {new Date(post.updatedAt).toLocaleString()}
        </Text>
      </Card>
    );
  }

  return null;
};
