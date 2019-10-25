import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import biometria from '~/services/biometria';

import { registroPessoaRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

import estados from '~/pages/_layouts/default/estados';

const schema = Yup.object().shape({
  name: Yup.string().required('Digite um nome'),
  cpf: Yup.string()
    .min(11, 'O CPF precisa ter no mínimo 11 dígitos')
    .required('Digite um CPF válido'),
  uf_origem: Yup.string().required('Insira um estado de origem'),
  template1: Yup.string().required('Entre com a biometria'),
});

export default function Registrar() {
  const dispatch = useDispatch();
  const [result, setResult] = useState('');

  async function returnBiometria() {
    const response = await biometria.get('Enroll/1');
    setResult(response.data);
  }

  function handleSubmit(data) {
    dispatch(registroPessoaRequest(data));
    // console.tron.log({ name, cpf, uf_origem, template1 });
  }
  return (
    <Container>
      <header>
        <strong>Registrar Pessoas</strong>
      </header>

      <Form schema={schema} onSubmit={handleSubmit}>
        <h4> Nome: </h4>
        <Input name="name" placeholder="Nome completo" autoComplete="off" />
        <h4> CPF: </h4>
        <Input name="cpf" placeholder="CPF" autoComplete="off" />
        <h4> UF: </h4>
        <Select name="uf_origem" options={estados} />

        <hr />

        <h4> Clique no botão para registrar a biometria </h4>

        <Input name="template1" placeholder="Template" value={result} />
        <hr />
        <button type="button" onClick={returnBiometria}>
          Gravar biometria
        </button>

        <hr />
        <hr />

        <div>
          <button type="submit"> Registrar </button>
        </div>
      </Form>
    </Container>
  );
}
