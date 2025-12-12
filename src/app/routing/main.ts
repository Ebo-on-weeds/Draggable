import STORE from '@/config/redux/store';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, createRoute, createRouter } from '@tanstack/react-router';
import { AuthRoute, NoAuthRoute } from './layouts';
import middleware from './middleware';
import { EDITOR_ROUTE } from './routes/authenticated/editor.route';

export const QUERY_CLIENT = new QueryClient();

const ROOT_ROUTE = createRootRouteWithContext<{
  redux: typeof STORE;
  queryClient: typeof QUERY_CLIENT;
}>()({
  component: () => AuthRoute,
  beforeLoad: async (args) => await middleware({ context: args.context, location: args.location }),
  errorComponent: () => null,
  notFoundComponent: () => null,
});

export const AUTH_ROUTE = createRoute({
  getParentRoute: () => ROOT_ROUTE,
  component: () => AuthRoute,
  id: 'auth',
});

export const NO_AUTH_ROUTE = createRoute({
  getParentRoute: () => ROOT_ROUTE,
  component: () => NoAuthRoute,
  id: 'no-auth',
});

const ROUTE_TREE = ROOT_ROUTE.addChildren([
  AUTH_ROUTE.addChildren([EDITOR_ROUTE]),
  NO_AUTH_ROUTE.addChildren([]),
]);

export const ROUTER = createRouter({
  routeTree: ROUTE_TREE,
  scrollRestoration: true,
  defaultPreload: false,
  context: {
    redux: STORE,
    queryClient: QUERY_CLIENT,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof ROUTER;
  }
}
