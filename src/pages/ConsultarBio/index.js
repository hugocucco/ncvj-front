import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from 'react-toastify';
import api from '~/services/api';
import biometria from '~/services/biometria';

import { Container } from './styles';

export default function ConsultarBio() {
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  async function consultar() {
    try {
      setLoading(true);
      const responseBack = await api.get('templates');
      const digitais = responseBack.data;

      const responseApi = await biometria.post('Verificar', digitais);

      if (responseApi.data === 'Digital não encontrada') {
        setLoading(false);
        toast.error('Digital não encontrada na base de dados, tente novamente');
      }

      const template1 = responseApi.data;

      const pessoa = await api.post('consultabio', {
        template1,
      });
      setResult(pessoa.data);
      setLoading(false);
    } catch (err) {
      toast.error('Digital não encontrada');
      setLoading(false);
    }
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
      text="Aguardando biometria..."
    >
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
    </LoadingOverlay>
  );
}
