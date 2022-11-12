import { Outlet } from 'react-router-dom';
import { Title, Container } from '@mantine/core';

export const Layout = () => {
  return (
    <Container size="lg">
      <Outlet />
    </Container>
  );
};
