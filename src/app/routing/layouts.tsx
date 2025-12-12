import { Outlet } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

const NoAuthRoute = () => {
  <Fragment>
    <Outlet />
  </Fragment>;
};

const AuthRoute = () => {
  <Fragment>
    <Outlet />
  </Fragment>;
};

const RootRoute = () => {
  <Fragment>
    <Outlet />
  </Fragment>;
};

export { NoAuthRoute, AuthRoute, RootRoute };
