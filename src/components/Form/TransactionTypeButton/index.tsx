import React from 'react';

import { 
  Container,
  Icon,
  Title, 
} from './styles';

interface Props {
  type: 'up' | 'down';
  title: string;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export function TransactionTypeButton({ 
  title,
  type 
}: Props) {
  return (
    <Container >
      <Icon 
        name={icons[type]}
        type={type}
      />
      <Title>
        {title}
      </Title>
    </Container>
  );
}