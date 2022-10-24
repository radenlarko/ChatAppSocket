import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import {Chat, Login, Messaging} from '../screens';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Messaging" component={Messaging} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
