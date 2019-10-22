import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, 'O CPF precisa ter no mínimo 11 dígitos')
    .required('Digite um CPF válido'),
});

export default function ConsultarCPF() {
  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  function Limpar() {
    window.location.reload();
  }

  const [input, setInput] = useState('');

  async function consultar(data, { resetForm }) {
    const response = await api.post('consultacpf', {
      cpf: input,
    });
    setResult(response.data);
    resetForm();
  }
  return (
    <Container>
      <header>
        <strong>Consultar por CPF</strong>
      </header>
      <h3> Digite o CPF e depois clique em Consultar</h3>
      <Form schema={schema} onSubmit={consultar}>
        <Input
          name="cpf"
          value={input}
          placeholder="CPF"
          onInput={e => setInput(e.target.value)}
          autocomplete="off"
        />
        <button type="submit">Consultar</button>
        <hr />
      </Form>
      <h4> Resultado da Busca:</h4>
      <Form initialData={result}>
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
      </Form>
      <button type="submit" onClick={Limpar}>
        Limpar
      </button>
    </Container>
  );
}
