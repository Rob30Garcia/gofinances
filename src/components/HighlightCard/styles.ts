import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFValue(300)}px;
  background: ${({ theme }) =>  theme.colors.shape};

  padding: 20px;
  padding-bottom: ${RFValue(42)}px;
  border-radius: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`
  margin-top: 38px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
`;

export const LastTransition = styled.Text`
  color: ${({ theme }) => theme.colors.texts};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
