# Routing Guide

This document explains how to add routes with **@tanstack/react-router**, when to register them under `AUTH_ROUTE` or `NO_AUTH_ROUTE`, how to read URL params, and how to prefetch data before rendering.

## Folder Overview

```
src/app/routing/
  layouts.tsx     // Layout components shared by multiple routes
  main.ts         // Route registration and loader bindings
  middleware.ts   // optional route guards
  routes/         // Feature route definitions
    authenticated/
    not-authenticated/
```

Routes live in modular files inside the `routes/` folder and are grouped by access level (`authenticated` vs `not-authenticated`).

## Adding a Route

1. **Choose the folder** (`routes/authenticated` or `routes/not-authenticated`).
2. Create a file that calls `createRoute` (from `@tanstack/react-router`) and exports the route.
3. Import the route into `main.ts` and attach it to the correct parent (`AUTH_ROUTE` or `NO_AUTH_ROUTE`).
4. Supply the component (usually `src/pages/<feature>/index.tsx`) and optional loader/beforeLoad hooks.

### Example

```ts
// src/app/routing/routes/authenticated/dashboard.route.tsx
import { createRoute } from '@tanstack/react-router';
import DashboardPage from '@pages/dashboard';
import { AUTH_ROUTE } from '../../main';

export const dashboardRoute = createRoute({
  getParentRoute: () => AUTH_ROUTE,
  path: '/dashboard',
  component: DashboardPage,
});
```

In `main.ts`, add the route as a child when building the route tree:

```ts
import { dashboardRoute } from './routes/authenticated/dashboard.route';

const ROUTE_TREE = ROOT_ROUTE.addChildren([
  AUTH_ROUTE.addChildren([
    dashboardRoute,
    // ...other authenticated routes
  ]),
  NO_AUTH_ROUTE.addChildren([]),
]);
```

## Choosing the Parent Route

- **`AUTH_ROUTE`**: Choose this parent for routes that require an authenticated session. The middleware runs before load and the `AuthRoute` layout is applied.
- **`NO_AUTH_ROUTE`**: Use this parent for public routes (landing, login, password reset). They bypass auth middleware and render inside `NoAuthRoute`.

Both parents are defined in `main.ts` via `createRoute`. You attach feature routes to them using `addChildren` when constructing `ROUTE_TREE`.

## URL Params

Define params inside the route path, then access them via TanStack Router helpers.

```ts
import { createRoute } from '@tanstack/react-router';
import ProjectPage from '@pages/project';
import { AUTH_ROUTE } from '../../main';

export const projectRoute = createRoute({
  getParentRoute: () => AUTH_ROUTE,
  path: '/project/$projectId',
  component: ProjectPage,
});
```

Inside the page, use the generated hook to read params:

```tsx
import { projectRoute } from '@app/routing/routes/authenticated/project.route';
import { useParams } from '@tanstack/react-router';

const { projectId } = useParams({ from: projectRoute.id });
```

## Prefetching Data

Use React Query prefetching to fetch data before the UI renders.

### React Query Prefetching

Alternatively, prefetch inside a loader or middleware:

```ts
import { queryClient } from '@app/routing/main';

export const projectRoute = createRoute({
  getParentRoute: () => AUTH_ROUTE,
  path: '/project/$userId',
  loader: async ({ params, context }) => {
    await context.queryClient.prefetchQuery({
      queryKey: ['project', params.userId],
      queryFn: () => repo.fetchByUserId(params.userId),
    });

    return context.queryClient.getQueryData(['project', params.userId]);
  },
  component: ProjectPage,
});
```

with using queryClient we can prefetch the data by returning the queried data or when we request the data using useQuery with the same queryKey our preloaded data will arrive to use because it wil be cached

## Summary

1. Create the route file under the appropriate access folder.
2. Register it in `main.ts` inside `AUTH_ROUTE` or `NO_AUTH_ROUTE` arrays.
3. Use params directly in the path and read them with `useParams`.
4. Prefetch data using routes with React Query to render ready-to-use data if necessary.

Following this structure keeps the routing layer organized, makes guard logic explicit, and ensures data is ready when the UI loads.
