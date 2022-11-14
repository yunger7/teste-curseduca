import { useState } from 'react';
import { Card, Text, Badge, Group, Skeleton, ActionIcon } from '@mantine/core';
import { TbEdit as IconEdit, TbTrash as IconDelete } from 'react-icons/tb';

import { PostModal, PostInfo } from './PostModal';
import { DeleteModal } from './DeleteModal';
import { createAxiosClient } from '../services/createAxiosClient';

const client = createAxiosClient();

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
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  async function editPost(data: PostInfo) {
    try {
      await client.put(`/posts/${post?.id}`, data);
    } catch (error) {
      throw error;
    }
  }

  async function deletePost() {
    try {
      await client.delete(`/posts/${post?.id}`);
    } catch (error) {
      throw error;
    }
  }

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
      <>
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
            {localStorage.getItem('cosmos-user-id') === post.userId && (
              <Group>
                <ActionIcon
                  color="grape"
                  variant="outline"
                  onClick={() => setEditModalOpened(true)}
                >
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                  color="grape"
                  variant="outline"
                  onClick={() => setDeleteModalOpened(true)}
                >
                  <IconDelete size={18} />
                </ActionIcon>
              </Group>
            )}
          </Group>
        </Card>
        <PostModal
          opened={editModalOpened}
          onClose={() => setEditModalOpened(false)}
          onSubmit={editPost}
          actionName="Editar post"
          initialValue={{
            title: post.title,
            content: post.content,
          }}
        />
        <DeleteModal
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          onConfirm={deletePost}
        />
      </>
    );
  }

  return null;
};
