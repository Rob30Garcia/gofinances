import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';

import { 
  Container,
  Header,
  Title, 
  Form,
  Fields,
  TransactionType
} from './styles';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categorySelectModalOpen, setCategorySelectModalOpen] = useState<boolean>(false)
  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria"
  });

  const {
    control,
    handleSubmit
  } = useForm();
  
  function handleTransactionType( type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenCategorySelectModal() {
    setCategorySelectModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setCategorySelectModalOpen(false);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastrar</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            control={control}
            placeholder="Nome"
            name="name"
          />

          <InputForm 
            control={control} 
            placeholder="Preço"
            name="amount"
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

        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
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
