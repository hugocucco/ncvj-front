import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from 'react-toastify';
import { isCPF } from 'brazilian-values';
import { cpfMask } from '../_layouts/default/mask';
import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(14, 'O CPF precisa ter 11 dígitos')
    .required('Digite um CPF válido'),
});

export default function ConsultarCPF() {
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  const [input, setInput] = useState('');
  const [cpf, setCPF] = useState('');

  function Limpar() {
    window.location.reload();
  }

  async function consultar(data, { resetForm }) {
    try {
      setLoading(true);
      if (!isCPF(cpf)) {
        toast.error('CPF inválido!');
        setLoading(false);
      } else {
        const response = await api.post('consultacpf', {
          cpf: input,
        });
        setResult(response.data);
        setLoading(false);
        resetForm();
      }
    } catch (err) {
      toast.error('CPF não encontrado na base de dados.');
      setInput('');
      setLoading(false);
    }
  }

  function ConditionalRender() {
    if (result.name === '') {
      return (
        <>
          <Form schema={schema} onSubmit={consultar}>
            <h3> Digite o CPF e depois clique em Consultar</h3>
            <hr />
            <Input
              name="cpf"
              value={(input, cpfMask(cpf))}
              placeholder="CPF"
              onInput={e => setInput(e.target.value)}
              autoComplete="off"
              onChange={e => setCPF(e.target.value)}
            />
            <hr />
            <hr />
            <button type="submit">Consultar</button>
            <hr />
          </Form>
        </>
      );
    }

    return (
      <>
        <Form initialData={result}>
          <h3> Resultado da Busca:</h3>
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
        </Form>
        <button type="submit" onClick={Limpar}>
          Nova Consulta
        </button>
      </>
    );
  }
  return (
    <LoadingOverlay
      active={loading}
      styles={{
        overlay: base => ({
          ...base,
          background: 'rgb(0, 0, 0) transparent',
        }),
      }}
      spinner
      text="Buscando CPF..."
    >
      <Container>
        <header>
          <strong>Consultar por CPF</strong>
        </header>
        {ConditionalRender()}
      </Container>
    </LoadingOverlay>
  );
}
