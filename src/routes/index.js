import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import HelpOrders from '../pages/HelpOrders';
import Matriculations from '../pages/Matriculations';
import Plans from '../pages/Plans';
import Students from '../pages/Students';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/helporders" component={HelpOrders} isPrivate />
      <Route path="/matriculations" component={Matriculations} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/students" component={Students} isPrivate />
    </Switch>
  );
}
