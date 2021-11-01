/* eslint-disable import/no-unresolved */
import React from 'react';
import { Text, View } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import * as Animatable from 'react-native-animatable';


import R from 'res/R';

import styles from './styles';

const MessageItem = ({
  inbound,
  message,
}) => {
  const { message: messageContent, user } = message;
  const renderAvatar = () => (
    inbound ? (
      <Animatable.View
        animation="zoomIn"
        duration={500}
        style={styles.avatarContainer}
      >
        <UserAvatar
          style={{
            borderColor: 'violet',
            borderWidth: 0.5,
          }}
          size={28}
          name={`${user.firstName} ${user.lastName}`}
          src={user.photoUrl}
          color={R.colors.primary}
        />
      </Animatable.View>
    ) : null
  );

  const textStyle = [
    styles.messageText,
    inbound ? styles.textInbound : styles.textOutbound
  ];

  const messageStyle = inbound
    ? styles.messageInbound
    : styles.messageOutbound;

  return (
    <View style={styles.messageContainer}>
      <Animatable.View
        animation="fadeInUp"
        duration={200}
        style={messageStyle}
      >
        <Text style={textStyle}>
          {messageContent}
        </Text>
      </Animatable.View>
    </View>
  );
};

export default MessageItem;
