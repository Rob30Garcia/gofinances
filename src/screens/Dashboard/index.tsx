import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  Icon,
  Highlights,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps; 
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);    

    //typing transactions
    const transactions = response ? JSON.parse(response) : [];    

    let entriesSum = 0;
    let expensiveSum = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {   
        
        item.type === 'positive' ? 
          entriesSum += Number(item.amount) : 
          expensiveSum += Number(item.amount);
        
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });

    setData(transactionsFormatted);      

    const total = entriesSum - expensiveSum;

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensive: {
        amount: expensiveSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });

    setIsLoading(false);
  } 

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      { isLoading ? 
        <LoadingContainer> 
          <ActivityIndicator color={theme.colors.primary} size='large'/>
        </LoadingContainer> : 
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/50270104?v=4'}}/>
                <User>
                  <UserGretting >Ol??,</UserGretting>
                  <UserName>Robert</UserName>
                </User>
              </UserInfo>
              
              <LogoutButton>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <Highlights>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction="??ltima entrada dia 13 de abril"
            />

            <HighlightCard
              type="down"
              title="Sa??das"
              amount={highlightData.expensive.amount}
              lastTransaction="??ltima sa??da dia 03 de abril"
            />

            <HighlightCard 
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="01 ?? 16 de abril"
            />
          </Highlights>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList 
              data={data} 
              keyExtractor={(item) => { return item.id }}
              renderItem={({ item }) => 
                <TransactionCard data={item} />
              }
            />

          </Transactions>
        </>
      }
    </Container>
  );
}