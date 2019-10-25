import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
// import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import biometria from '~/services/biometria';

import { Container } from './styles';

// const schema = Yup.object().shape({
//   template1: Yup.string().required('Entre com a biometria'),
// });

export default function ConsultarBio() {
  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  // const [input, setInput] = useState('');

  // async function returnBiometria() {
  //   const response = await biometria.get('api/public/v1/captura/Capturar/1');
  //   setInput(response.data);
  //   console.tron.log(response.data);
  // }

  async function consultar() {
    try {
      const responseBack = await api.get('templates');
      const digitais = responseBack.data;

      const responseApi = await biometria.post('Verificar', digitais);
      console.tron.log(responseApi.data);
      const template1 = responseApi.data;
      console.tron.log(template1);

      const pessoa = await api.post('consultabio', {
        template1,
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
      <Form initialData={result} onSubmit={consultar}>
        <h3> Aperte o botão para checar a Biometria</h3>
        <hr />

        <h4>Nome:</h4>
        <Input name="name" disabled />
        <h4>CPF:</h4>
        <Input name="cpf" disabled />
        <h4>Estado de origem:</h4>
        <Input name="uf_origem" disabled />
        <h4>Pendência:</h4>
        <Input name="pendencia" disabled />
        <h4>Estado da pendência:</h4>
        <Input name="uf_pendencia" disabled />

        <hr />
        <div>
          <button type="submit">Consultar</button>
        </div>
      </Form>

      <span value={result} />
    </Container>
  );
}
