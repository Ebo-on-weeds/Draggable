import { Fragment } from 'react';
import './app.css';
import { Provider } from 'react-redux';
import STORE from '@/config/redux/store';
import { RouterProvider } from '@tanstack/react-router';
import { ROUTER, QUERY_CLIENT } from './routing/main';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <Fragment>
      <Provider store={STORE}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <MantineProvider>
            <Notifications />
            <RouterProvider router={ROUTER} />
            <div>App Component</div>
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
