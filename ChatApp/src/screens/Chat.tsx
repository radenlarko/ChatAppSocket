import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../utils/styles';
import {dataRooms} from '../utils/dataRooms';
import ChatComponent from '../components/ChatComponent';
import ModalCreateGroup from '../components/ModalCreateGroup';

type Props = NativeStackScreenProps<StackParamList, 'Chat'>;

const Chat = ({navigation}: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={styles.chatscreen}>
        <View style={styles.chattopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.chatheading}>Chats</Text>
            <Pressable onPress={() => setVisible(true)}>
              <Feather name="edit" size={24} color="green" />
            </Pressable>
          </View>
        </View>
        <View style={styles.chatlistContainer}>
          {dataRooms.length > 0 ? (
            <FlatList
              data={dataRooms}
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
