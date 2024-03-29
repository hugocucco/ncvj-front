import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import LoadingOverlay from 'react-loading-overlay';
import * as Yup from 'yup';
import { isCPF } from 'brazilian-values';
import { toast } from 'react-toastify';
import { cpfMask } from '../_layouts/default/mask';

import biometria from '~/services/biometria';

import { registroPessoaRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

import estados from '~/pages/_layouts/default/estados';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'O nome precisa ter no minimo 4 letras.')
    .required('Digite um nome'),
  cpf: Yup.string()
    .min(14, 'O CPF precisa ter no mínimo 11 dígitos')
    .required('Digite um CPF válido'),
  uf_origem: Yup.string().required('Insira um estado de origem'),
  template1: Yup.string().required('Entre com a biometria'),
});

export default function Registrar() {
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  const [loadingBio, setLoadingBio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cpf, setCPF] = useState('');

  async function returnBiometria() {
    setLoadingBio(true);
    const response = await biometria.get('Enroll/1');
    setResult(response.data);
    setLoadingBio(false);
  }

  function handleSubmit(data) {
    setLoading(true);
    if (!isCPF(cpf)) {
      toast.error('CPF inválido!');
      setLoading(false);
    } else {
      dispatch(registroPessoaRequest(data));
      setLoading(false);
    }
  }

  return (
    <LoadingOverlay
      active={loadingBio}
      styles={{
        overlay: base => ({
          ...base,
          background: 'rgb(0, 0, 0) transparent',
        }),
      }}
      spinner
      text="Aguardando biometria..."
    >
      <Container>
        <header>
          <strong>Registrar Pessoas</strong>
        </header>

        <Form schema={schema} onSubmit={handleSubmit}>
          <h4> Nome: </h4>
          <Input name="name" placeholder="Nome completo" autoComplete="off" />
          <h4> CPF: </h4>
          <Input
            name="cpf"
            value={cpfMask(cpf)}
            placeholder="CPF"
            autoComplete="off"
            onChange={e => setCPF(e.target.value)}
          />
          <h4> UF: </h4>
          <Select name="uf_origem" options={estados} />
          <hr />
          <h4> Clique no botão para registrar a biometria </h4>
          <Input name="template1" placeholder="Biometria" value={result} />
          <hr />
          <button type="button" onClick={returnBiometria}>
            Gravar Biometria
          </button>
          <hr />
          <hr />
          <div>
            <button type="submit">
              {' '}
              {loading ? 'Enviando...' : 'Registrar'}{' '}
            </button>
          </div>
        </Form>
      </Container>
    </LoadingOverlay>
  );
}
