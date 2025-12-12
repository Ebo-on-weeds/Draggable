import type UserDetails from '@/types/user-details';
import type {
  EnhancedStore,
  UnknownAction,
  Tuple,
  StoreEnhancer,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import type { ParsedLocation } from '@tanstack/react-router';

interface MiddlewareParameters {
  context: {
    redux: EnhancedStore<
      {
        userDetails: UserDetails;
      },
      UnknownAction,
      Tuple<
        [
          StoreEnhancer<{
            dispatch: ThunkDispatch<
              {
                userDetails: UserDetails;
              },
              undefined,
              UnknownAction
            >;
          }>,
          StoreEnhancer,
        ]
      >
    >;
  };
  location: ParsedLocation;
}

const middleware = async ({ context, location }: MiddlewareParameters) => {
  await keepTrack({ context, location });
};

/**
 * saves the visited routes in local storage
 * - so after login, user can be redirected to the last visited route
 *
 * - _NOT TESTED BUT HOPE IT WORKS_
 *
 * @author Ibrahim A Alagbare
 */
const keepTrack = async ({ location }: MiddlewareParameters) => {
  let routesStack: Array<string> = [];

  const SAVED_ROUTES = JSON.parse(localStorage.getItem('routesStack') || '[]');

  //if there are saved routes, use them
  if (SAVED_ROUTES.length > 0) {
    routesStack = SAVED_ROUTES;
  }

  //clean up
  if (routesStack.length > 20) {
    routesStack = [];
  }

  //save current route if it's different from the last one
  if (routesStack.at(-1) !== location.pathname) {
    routesStack.push(location.pathname);
  }

  //don't push any auth routes
  if (
    location.pathname == '/signIn' ||
    location.pathname == '/register' ||
    location.pathname == '/forgotPassword'
  ) {
    return;
  }

  //don't push error boundaries routes
  if (location.pathname == '/notFound' || location.pathname == '/forbidden') {
    return;
  }

  localStorage.setItem('routesStack', JSON.stringify(routesStack));
};

export default middleware;
