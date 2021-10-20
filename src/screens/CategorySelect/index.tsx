import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { 
  Container,
  Header, 
  Title, 
  Category,
  Icon,
  Name,
  Separator
} from './styles';

import {categories } from '../../utils/categories';

export function CategorySelect() {
  return (
    <Container>
      <Header>
        <Title>
          Category
        </Title>
      </Header>

      <FlatList 
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}