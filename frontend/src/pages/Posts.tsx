import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Center, Container } from '@mantine/core';

import { Post, PostData } from '../components/Post';
import { NewPostButton } from '../components/NewPostButton';
import { createAxiosClient } from '../services/createAxiosClient';

const client = createAxiosClient();

export const Posts = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    async function getPosts() {
      setLoading(true);

      try {
        const { data } = await client.get<PostData[]>('/posts');

        const sortedPosts = data.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        setPosts(sortedPosts);
      } catch (error: any) {
        console.log(error);

        if (error.name == 'AxiosError' && error.response.status == 401) {
          navigate('/');
        }

        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, []);

  if (loading) {
    return (
      <Container size="md" py="xl">
        {[...Array(5)].map((_, i) => (
          <Post loading key={i} />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <Center sx={{ height: 'calc(100% - 60px)' }}>
        <Text color="dimmed" align="center">
          {'(╯°□°）╯︵ ┻━┻'}
          <br />
          Wops! Não foi possível buscar seus posts
        </Text>
      </Center>
    );
  }

  if (posts && posts.length <= 0) {
    return (
      <Center sx={{ height: 'calc(100% - 60px)' }}>
        <Text color="dimmed" align="center">
          {'(￣﹏￣；)'}
          <br />
          Parece que ainda não há nenhum post.
        </Text>
        <NewPostButton />
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      {posts?.map(post => (
        <Post post={post} key={post.id} />
      ))}
      <NewPostButton />
    </Container>
  );
};
