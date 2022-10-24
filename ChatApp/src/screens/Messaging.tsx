import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../utils/styles';
import socket from '../utils/socket';
import {Messages} from '../types/chat';
import MessageComponent from '../components/MessageComponent';

type Props = NativeStackScreenProps<StackParamList, 'Messaging'>;

const Messaging = ({route, navigation}: Props) => {
  const [chatMessages, setChatMessages] = useState<Messages[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  //👇🏻 Access the chatroom's name and id
  const {name, id, messages} = route.params || {};

  //👇🏻 This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({title: name});
    getUsername();
    socket.emit('findRoom', id);
    socket.on('foundRoom', roomChats => setChatMessages(roomChats));
  }, [name]);

  /*👇🏻 
    This function gets the time the user sends a message, then 
    logs the username, message, and the timestamp to the console.
 */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    if (user) {
      socket.emit('newMessage', {
        message,
        room_id: id,
        user,
        timestamp: {hour, mins},
      });
    }
  };

  useEffect(() => {
    socket.on('foundRoom', roomChats => setChatMessages(roomChats));
  }, [socket]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          placeholder="type message"
          onChangeText={value => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
