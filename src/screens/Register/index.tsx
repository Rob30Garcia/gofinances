import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Modal,
  TouchableWithoutFeedback,
  Keyboard, 
  Alert
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

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

type NavigationProps = {
  navigate: (screen: string) => void;
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

  const navigation = useNavigation<NavigationProps>();

  const dataKey = '@gofinances:transactions';
  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria"
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  function handleTransactionType( type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenCategorySelectModal() {
    setCategorySelectModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setCategorySelectModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      
      return Alert.alert('Selecione a transação.');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione uma categoria.')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria"
      });

      navigation.navigate('Listagem');
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível salvar.")      
    }
  }

  useEffect(() => {
    async function LoadingData() {
      const response = await AsyncStorage.getItem(dataKey);
      
      //console.log(response);
    }

    LoadingData();
  }, []); 

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
                onPress={() => handleTransactionType('positive')}
                isActive={transactionType === 'positive'}
              /> 

              <TransactionTypeButton 
                type="down"
                title="Outcome"
                onPress={() => handleTransactionType('negative')}
                isActive={transactionType === 'negative'}
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
