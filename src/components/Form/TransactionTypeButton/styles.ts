import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  type: 'up' | 'down';
}

export const Container = styled.View`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;

  border: 1.5px solid ${({ theme }) => theme.colors.texts_light};
  border-radius: 5px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme }) => 
    type === 'up' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
