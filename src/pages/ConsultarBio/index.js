import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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
    try {
      const responseBack = await api.get('templates');
      console.tron.log(responseBack.data);
      const digitais = responseBack.data;

      const responseApi = await biometria.post('Verificar', {
        digitais,
      });
      console.tron.log(responseApi.data);
      const resultado = responseApi.data;

      const pessoa = await api.post('consultabio', {
        resultado,
      });
      console.tron.log(pessoa.data);
      setResult(pessoa.data);
    } catch (err) {
      console.tron.log(err);
      toast.error('Digital não encontrada na base de dados, tente novamente');
    }
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
