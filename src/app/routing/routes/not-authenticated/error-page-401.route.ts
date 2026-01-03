import { createRoute } from '@tanstack/react-router';
import ErrorPage401 from '../../../error-handling/client-errors/401';
import { AUTH_ROUTE } from '../../main';
const ERROR_PAGE_401_ROUTE = createRoute({
  getParentRoute: () => AUTH_ROUTE,
  path: '/not-authorized',
  component: ErrorPage401,
});
export { ERROR_PAGE_401_ROUTE };
