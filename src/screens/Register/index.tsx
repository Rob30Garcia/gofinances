import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Modal,
  TouchableWithoutFeedback,
  Keyboard, 
  Alert
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório.'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico.')
  .positive('O valor não pode ser negativo.')
  .required('O valor é obrigatório')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categorySelectModalOpen, setCategorySelectModalOpen] = useState<boolean>(false)
  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria"
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  console.log(errors);
  
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
    if(!transactionType) {
      
      return Alert.alert('Selecione a transação.');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione uma categoria.')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name
    }

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm 
              control={control} 
              placeholder="Preço"
              name="amount"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}
