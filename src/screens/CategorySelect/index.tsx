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

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: Props) {
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