import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { Layout } from './pages/Layout';
import { Root } from './pages/Root';
import { Posts } from './pages/Posts';
import { PostDetails } from './pages/PostDetails';
import { Error } from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: '/posts',
        element: <Posts />,
      },
      {
        path: '/posts/:postId',
        element: <PostDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
