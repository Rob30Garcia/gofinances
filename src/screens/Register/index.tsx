import React from 'react';

import { 
  Container,
  Header,
  Title, 
  Form,
  Fields,
  TransactionType
} from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastrar</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Preço"
          />

          <TransactionType>

            <TransactionTypeButton 
              type="up"
              title="Income"
            /> 

            <TransactionTypeButton 
              type="down"
              title="Outcome"
            /> 

          </TransactionType>
        </Fields>

        <Button title="Enviar"/>
      </Form>

    </Container>
  );
}
