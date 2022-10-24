import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';

type Props = NativeStackScreenProps<StackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Go To Chat"
        onPress={() => navigation.navigate('Messaging')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
