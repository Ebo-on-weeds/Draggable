# {\_any} Page Hooks

Hooks in this folder encapsulate {\_any}-specific stateful logic. They fetch data from the page repositories, orchestrate view state (loading, error, derived values), and expose a simplified interface for the page components.

## Core Principles

- **One hook per concern**: Each hook should wrap a distinct piece of {\_any} behavior.
- **Repository-first**: Use the concrete repositories from `src/pages/{_any}/api` instead of calling API clients directly.
- **Keep hooks light**: Keep side effects and branching easy to follow so components can rely on predictable outputs.
- **Avoid shared state leaks**: Hooks are scoped to the {\_any} page; place truly global hooks under `src/hooks` instead.

## Data Fetching Guidance

for remote data.

- **Limit hooks to two `useQuery` calls**. If a scenario needs more than two queries, consider composing multiple hooks together or running additional queries directly from the component using `useQueries` or `useQuery` instances in the correct context.
- Co-locate any `useMutation` hooks with the data they mutate.
- Memoize derived data with `useMemo` only when necessary.

## Example

```ts
// src/pages/{_any}/hooks/use-project-summary.ts
import { useQuery } from '@tanstack/react-query';
import { PROJECT_SERVICE } from '../api/project-service';
import type { ProjectDetails } from '../types/project';

const repo = new ProjectRepo();

export function useProjectSummary(userId: string) {
  const projectQuery = useQuery({
    queryKey: ['project', userId],
    queryFn: () => PROJECT_SERVICE.findOne(userId),
  });

  // If more data is needed, keep the total query count ≤ 2.

  return {
    project: projectQuery.data,
    loading: projectQuery.isLoading,
    error: projectQuery.error,
    refresh: projectQuery.refetch,
  };
}
```

## When to Use `useQueries`

If the page requires several independent data sets, prefer using individual hooks for each dataset at the component layer:

```tsx
// src/pages/{_any}/index.tsx
import { useProjectSummary } from './hooks/use-project-summary';
import { useTeamMembers } from './hooks/use-team-members';

export default function {_any}Page() {
 const project = useProjectSummary('current-user');
 const team = useTeamMembers('current-user');

 // The component orchestrates multiple hooks but each hook stays concise.

 return (
  <section>
   {/* Render with project  */}
  </section>
 );
}
```

## Best Practices

- Return stable references (memoized callbacks/objects) when hooks are used inside dependency arrays.
- Expose derived booleans (e.g., `isLoading`, `isEmpty`) to simplify component logic.
- Guard against stale closures when triggers depend on props or state (use refs if necessary).
- Document each hook’s inputs/outputs with JSDoc or TypeScript types.

By keeping hooks focused and limiting the number of queries per hook, we maintain readability and performance while leaving composition flexibility to the page components.
