import {Text, View, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DataRooms, Messages} from '../types/chat';
import {StackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../utils/styles';

type Navigation = NativeStackNavigationProp<StackParamList, 'Chat'>;

interface Props {
  item: DataRooms;
}

const ChatComponent = ({item}: Props) => {
  const navigation = useNavigation<Navigation>();
  const [messages, setMessages] = useState({} as Messages);

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    if (item.messages.length !== 0) {
      setMessages(item.messages[item.messages.length - 1]);
    }
  }, []);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      id: item.id,
      name: item.name,
      messages: [],
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : 'Tap to start chatting'}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : 'now'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
