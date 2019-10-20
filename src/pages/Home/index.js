import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <header>
        <strong>Nada Consta Virtual Jurídico</strong>
      </header>
      <hr />
      <Link to="/registrar">
        <strong>Registrar Pessoas</strong>
      </Link>

      <hr />
      <hr />

      <Link to="/consultarbio">
        <strong>Consultar por Biometria</strong>
      </Link>

      <hr />
      <hr />

      <Link to="/consultarcpf">
        <strong>Consultar por CPF</strong>
      </Link>
    </Container>
  );
}
