import { createRoute } from '@tanstack/react-router';
import { AUTH_ROUTE } from '../../main';
import EditorPage from '@/pages/editor';

export const EDITOR_ROUTE = createRoute({
  getParentRoute: () => AUTH_ROUTE,
  path: '/',
  component: EditorPage,
});
