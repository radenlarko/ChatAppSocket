import {
  Button,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import {styles} from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const [username, setUsername] = useState('');

  const storeUsername = async () => {
    try {
      //👇🏻 async function - saves the username to AsyncStorage
      //   redirecting to the Chat page
      await AsyncStorage.setItem('username', username);
      navigation.navigate('Chat');
    } catch (e) {
      Alert.alert('Error! While saving username');
    }
  };

  //👇🏻 checks if the input field is empty
  const handleSignIn = () => {
    if (username.trim()) {
      //👇🏻 calls AsyncStorage function
      storeUsername();
    } else {
      Alert.alert('Username is required.');
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          navigation.navigate('Chat');
        }
      } catch (e) {
        console.error('Error while loading username!');
      }
    };
    getUsername();
  }, []);

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign In</Text>
        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your username"
            onChangeText={val => setUsername(val)}
            style={styles.logininput}
          />
        </View>
        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
