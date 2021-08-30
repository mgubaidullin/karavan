import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import {RouteDesigner} from "./components/RouteDesigner";

const routes = [
    { path: '/', component: RouteDesigner,},
];

ReactDOM.render(
  <Router forceRefresh={true}>
    <Switch>
      {routes.map((route) => (
        <Route exact path={route.path} render={() => <route.component />} key={route.path} />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root')
);