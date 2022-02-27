import React from 'react';
import { FlatList } from 'react-native';
import { IUser } from 'types/User';

import MessageItem from '../MessageItem';

type MessageListProps = {
  messages: any[];
  user: IUser;
};

const MessageList = ({ messages, user }: MessageListProps) => {
  const keyExtractor = (item: any) => item.id;
  const renderItem = ({ item }: { item: any }) => (
    <MessageItem inbound={item.user.id !== user.id} message={item} />
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
