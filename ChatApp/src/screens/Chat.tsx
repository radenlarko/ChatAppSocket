import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';

type Props = NativeStackScreenProps<StackParamList, 'Chat'>;

const Chat = ({navigation}: Props) => {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
