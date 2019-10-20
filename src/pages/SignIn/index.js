/* eslint-disable import/no-unresolved */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  username: Yup.string().required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha contem no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }

  return (
    <>
      <strong> Nada Consta Virtual Jurídico</strong>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <img src={logo} alt="NCVJ" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="username" type="username" placeholder="Login" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
      </Form>
    </>
  );
}
