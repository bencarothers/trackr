import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

const AppRoutes = (
  <Route path="/" component={Master}>
    <Route path="home" component={Home} />
    </Route>
    <Route path="dash" component={Home} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

export default AppRoutes;
