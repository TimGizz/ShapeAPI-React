import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { MemePage } from '../pages';
import { AuthPage } from '../pages';
import { HomePage } from '../pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/meme-api',
        element: <MemePage />,
      },
      {
        path: '/auth-api',
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
