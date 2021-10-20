import React, { useState } from 'react';

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
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  
  function handleTransactionType( type: 'up' | 'down') {
    setTransactionType(type);
  }

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
              onPress={() => handleTransactionType('up')}
              isActive={transactionType === 'up'}
            /> 

            <TransactionTypeButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionType('down')}
              isActive={transactionType === 'down'}
            /> 

          </TransactionType>

          <CategorySelectButton 
            title="Categoria"
          />
        </Fields>

        <Button title="Enviar"/>
      </Form>

    </Container>
  );
}
