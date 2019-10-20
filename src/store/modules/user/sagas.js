import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { registroPessoaSuccess, registroPessoaFailure } from './actions';

export function* registroPessoa({ payload }) {
  try {
    // const { name, cpf, uf_origem, template } = payload.data;

    const response = yield call(api.post, 'pessoas', payload.data);

    toast.success('Pessoa cadastrada com sucesso! ');

    yield put(registroPessoaSuccess(response.data));
  } catch (err) {
    toast.err('Falha no cadastramento');
    yield put(registroPessoaFailure());
  }
}

export default all([
  takeLatest('@user/REGISTRO_PESSOA_REQUEST', registroPessoa),
]);
