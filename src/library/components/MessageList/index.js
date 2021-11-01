import React from 'react';
import { FlatList } from 'react-native';

import MessageItem from '../MessageItem';

const MessageList = ({
  messages,
  user,
}) => {
  const keyExtractor = item => item.id;
  const renderItem = ({ item }) => (
    <MessageItem
      inbound={item.user.id !== user.id}
      message={item}
    />
  );

  return (
    <FlatList
      inverted
      showsVerticalScrollIndicator
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default MessageList;
