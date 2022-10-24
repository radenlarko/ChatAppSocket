import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';

type Props = NativeStackScreenProps<StackParamList, 'Messaging'>;

const Messaging = ({navigation}: Props) => {
  return (
    <View>
      <Text>Messaging</Text>
    </View>
  );
};

export default Messaging;

const styles = StyleSheet.create({});
