import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Page from './components/page';
import Home from './components/home';

const AppRoutes = (
      <Route name="page" path = "/" handler={Page}>
      <Route name="home" path ="/Home" handler={Home}/>
      </Route>
);

export default AppRoutes;
