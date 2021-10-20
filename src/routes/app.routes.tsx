import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const { Navigator, Screen} = createBottomTabNavigator();

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.texts,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 72,
          paddingVertical: 20,
          paddingBottom: 30
        }
      }}
    >
      <Screen 
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium,
            fontSize: 14,
          },
          tabBarIcon:(({size, color}) => (
            <Feather 
              name="list"
              size={size}
              color={color}
            /> 
          ))
        }}
      />

      <Screen 
        name="Casdatrar"
        component={Register}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium,
            fontSize: 14,
          },
          tabBarIcon:(({size, color}) => (
            <Feather 
              name="dollar-sign"
              size={size}
              color={color}
            /> 
          ))
        }}
      />

      <Screen 
        name="Resumo"
        component={Register}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium,
            fontSize: 14,
          },
          tabBarIcon:(({size, color}) => (
            <Feather 
              name="pie-chart"
              size={size}
              color={color}
            /> 
          ))
        }}
      />
    </Navigator>
  ); 
}