import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Home from '~/pages/Home';
import ConsultarBio from '~/pages/ConsultarBio';
import ConsultarCPF from '~/pages/ConsultarCPF';
import Registrar from '~/pages/Registrar';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/home" component={Home} isPrivate />
      <Route path="/consultarbio" component={ConsultarBio} isPrivate />
      <Route path="/consultarcpf" component={ConsultarCPF} isPrivate />
      <Route path="/registrar" component={Registrar} isPrivate />
    </Switch>
  );
}
