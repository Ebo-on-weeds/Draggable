# {\_any} API Services

This folder contains the {\_any} page communication layer. Each file maps a {\_any} endpoint to the shared `Handler` class (`src/config/api/handler.ts`). Rather than creating sub-folders, we keep files flat and name them `<feature>-service.ts`.

## Naming Convention

- File pattern: `projects-service.ts`, `notifications-service.ts`, etc.
- Export a single constant per file using the shared `Handler` class.
- Response and request types come from `src/pages/{_any}/types`.

## Example: `projects-service.ts`

```ts
import {} Handler } from '@config/api/handler';
import { API_ENDPOINTS } from '@config/api/api-endpoints';
import type { ProjectResponse, ProjectRequest } from '@pages/{_any}/types/project';

export const PROJECT_SERVICE = new Handler<ProjectResponse, ProjectRequest>(API_ENDPOINTS.PROJECTS);
```

## How to Use

- **Hooks**: Call the service inside React Query `useQuery` hooks for data fetching.

## CRUD Helpers

The `Handler` instances expose the following methods:

- `findAll(offset?, limit?)`
- `findOne(id)`
- `create(payload, contentType?)`
- `update(payload, method, id, contentType?)`
- `delete(id)`

## Prefetching Example

```ts
import { queryClient } from '@app/routing/main';
import { PROJECT_SERVICE } from './projects-service';

export async function preloadProject(projectId: string) {
  await queryClient.prefetchQuery({
    queryKey: ['project', projectId],
    queryFn: () => PROJECT_SERVICE.findOne(projectId),
  });
}
```

Keeping services as simple instantiations of the shared `Handler` class ensures consistency across the any page and makes it straightforward to add new endpoints.
