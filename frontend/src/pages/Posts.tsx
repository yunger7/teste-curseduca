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
        console.log(data);
        setPosts(data);
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
      <Container size="md" my="xl">
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

  return (
    <Container size="md" my="xl">
      {posts?.map(post => (
        <Post post={post} key={post.id} />
      ))}
      <NewPostButton />
    </Container>
  );
};
