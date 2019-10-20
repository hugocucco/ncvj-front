import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import biometria from '~/services/biometria';

import { Container } from './styles';

// import testBio from './test'; // apenas para testes

export default function ConsultarBio() {
  const [result, setResult] = useState('');

  async function returnBiometria() {
    const response = await biometria.get('api/public/v1/captura/Capturar/1');
    setResult(response.data);
  }

  async function consultar() {
    const response = await api.post('consultabio', {
      template1: result, // apenas para testes
    });
    setResult(response.data);
  }

  return (
    <Container>
      <header>
        <strong>Consultar por Biometria</strong>
      </header>
      <h3> Aperte o botão para checar a Biometria e depois em consultar</h3>
      <Form>
        <hr />

        <Input
          name="template1"
          placeholder="Template"
          value={result}
          autocomplete="off"
        />
        <hr />
        <button type="button" onClick={returnBiometria}>
          Checar
        </button>
        <hr />
        <hr />
        <div>
          <button type="button" onClick={consultar}>
            Consultar
          </button>
        </div>
      </Form>

      <span value={result} />
    </Container>
  );
}
