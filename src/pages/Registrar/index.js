import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import biometria from '~/services/biometria';

import { registroPessoaRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

import estados from '~/pages/_layouts/default/estados';

export default function Registrar() {
  const [result, setResult] = useState('');
  const dispatch = useDispatch();

  async function returnBiometria() {
    const response = await biometria.get('api/public/v1/captura/Enroll/1');
    setResult(response.data);
  }

  function handleSubmit(data) {
    dispatch(registroPessoaRequest(data));
  }
  return (
    <Container>
      <header>
        <strong>Registrar Pessoas</strong>
      </header>

      <Form onSubmit={handleSubmit}>
        <h4> Nome: </h4>
        <Input name="name" placeholder="Nome completo" autocomplete="off" />
        <h4> CPF: </h4>
        <Input name="cpf" placeholder="CPF" autocomplete="off" />
        <h4> UF: </h4>
        <Select name="uf_origem" placeholder="UF origem" options={estados} />

        <hr />

        <h4> Clique no botão para registrar a biometria </h4>

        <Input name="template1" placeholder="Template" value={result} />
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
