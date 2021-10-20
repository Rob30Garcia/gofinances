import React, { useState } from 'react';
import { Modal } from 'react-native';

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
import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categorySelectModalOpen, setCategorySelectModalOpen] = useState<boolean>(false)
  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria"
  });
  
  function handleTransactionType( type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenCategorySelectModal() {
    setCategorySelectModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setCategorySelectModalOpen(false);
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
            title={category.name}
            onPress={handleOpenCategorySelectModal}
          />
        </Fields>

        <Button title="Enviar"/>
      </Form>

      <Modal
        visible={categorySelectModalOpen}
      >
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategorySelectModal}
        />
      </Modal>

    </Container>
  );
}
