import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

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
  Highlights
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/50270104?v=4'}}/>
            <User>
              <UserGretting >Olá,</UserGretting>
              <UserName>Robert</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <Highlights>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </Highlights>
    </Container>
  );
}