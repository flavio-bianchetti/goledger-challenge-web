import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RacesProvider from './context/RacesProvider';

const renderWithRouterAndProvider = (component, route = '/') => {
  const history = createMemoryHistory();
  history.push(route);
  return ({ ...render(
    <RacesProvider>
      <Router history={ history }>
        {component}
      </Router>
    </RacesProvider>,
  ),
  history });
};

export default renderWithRouterAndProvider;
