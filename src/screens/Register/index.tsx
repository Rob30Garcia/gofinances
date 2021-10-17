import React from 'react';

import { 
  Container,
  Header,
  Title, 
  Form
} from './styles';

import { Input } from '../../components/Form/Input';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastrar</Title>
      </Header>

      <Form>
        <Input 
          placeholder="Nome"
        />

        <Input 
          placeholder="Preço"
        />
      </Form>

    </Container>
  );
}
