import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import biometria from '~/services/biometria';

import { Container } from './styles';

const schema = Yup.object().shape({
  template1: Yup.string().required('Entre com a biometria'),
});

export default function ConsultarBio() {
  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  const [input, setInput] = useState('');

  async function returnBiometria() {
    const response = await biometria.get('api/public/v1/captura/Capturar/1');
    setInput(response.data);
    console.tron.log(response.data);
  }

  async function consultar() {
    const response = await api.post('consultabio', {
      template1: input, // apenas para testes
    });
    setResult(response.data);
    console.tron.log(response.data);
  }

  return (
    <Container>
      <header>
        <strong>Consultar por Biometria</strong>
      </header>
      <h3> Aperte o botão para checar a Biometria e depois em consultar</h3>
      <Form schema={schema} onSubmit={consultar}>
        <hr />

        <Input
          name="template1"
          placeholder="Template"
          value={input}
          autoComplete="off"
        />
        <hr />
        <button type="button" onClick={returnBiometria}>
          Checar
        </button>
        <hr />
        <hr />
        <div>
          <button type="submit">Consultar</button>
        </div>
      </Form>

      <span value={result} />
    </Container>
  );
}
