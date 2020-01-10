import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import HelpOrders from '../pages/HelpOrders';

import Matriculations from '../pages/Matriculations';
import RegisterMatriculation from '../pages/Matriculations/Register';

import Plans from '../pages/Plans';
import RegisterPlan from '../pages/Plans/Register';
import EditPlan from '../pages/Plans/Edit';

import Students from '../pages/Students';
import RegisterStudent from '../pages/Students/Register';
import EditStudent from '../pages/Students/Edit';

import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/helporders" component={HelpOrders} isPrivate />

      <Route path="/matriculations" component={Matriculations} isPrivate />
      <Route
        path="/registermatriculation"
        component={RegisterMatriculation}
        isPrivate
      />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registerplan" component={RegisterPlan} isPrivate />
      <Route path="/editplan" component={EditPlan} isPrivate />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/registerstudent" component={RegisterStudent} isPrivate />
      <Route path="/editstudent" component={EditStudent} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
