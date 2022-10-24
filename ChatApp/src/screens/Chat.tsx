import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../utils/styles';
import socket from '../utils/socket';
import {dataRooms} from '../utils/dataRooms';
import ChatComponent from '../components/ChatComponent';
import ModalCreateGroup from '../components/ModalCreateGroup';
import {DataRooms} from '../types/chat';

type Props = NativeStackScreenProps<StackParamList, 'Chat'>;

const Chat = ({navigation}: Props) => {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState<DataRooms[]>([]);

  useLayoutEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://192.168.0.102:4000/api');
        const dataJson = await response.json();

        if (dataJson.length === 0) {
          setRooms(dataRooms);
          return;
        }

        setRooms(dataJson);
      } catch (err) {
        console.log('error get chat: ', err);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    console.log('socket: ', socket);
    socket.on('roomsList', rooms => {
      setRooms(rooms);
    });
  }, [socket]);

  const handleCreateGroup = () => setVisible(true);

  return (
    <>
      <SafeAreaView style={styles.chatscreen}>
        <View style={styles.chattopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.chatheading}>Chats</Text>
            <Pressable onPress={handleCreateGroup}>
              <Feather name="edit" size={24} color="green" />
            </Pressable>
          </View>
        </View>
        <View style={styles.chatlistContainer}>
          {rooms.length > 0 ? (
            <FlatList
              data={rooms}
              renderItem={({item}) => <ChatComponent item={item} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.chatemptyContainer}>
              <Text style={styles.chatemptyText}>No rooms created!</Text>
              <Text>Click the icon above to create a Chat room</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
      {visible && <ModalCreateGroup setVisible={setVisible} />}
    </>
  );
};

export default Chat;
