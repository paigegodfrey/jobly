import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Companies from './Companies';
import Jobs from './Jobs';
import Company from './Company';
import Profile from './Profile';
import PrivateRoute from "./PrivateRoute";

const Routes = ({ register, login }) => {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register register={register} />
        </Route>
        <Route exact path="/login">
          <Login login={login} />
        </Route>
        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>
        <PrivateRoute path="/companies/:handle">
          <Company />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default Routes;