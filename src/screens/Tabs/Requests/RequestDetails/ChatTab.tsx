import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Icon,
  Item,
  Input,
  Footer,
  FooterTab,
  View,
} from 'native-base';

import MessageList from 'library/components/MessageList';
import { Request } from 'library/utils/Firebase';
import R from 'res/R';
import styles from './styles';
import { IRequest } from 'types/Request';
import { IUser } from 'types/User';

type ChatTabProps = {
  request: IRequest;
  user: IUser;
};

const ChatTab = ({ request, user }: ChatTabProps) => {
  const messagesRef = Request.collection()
    .doc(request.id)
    .collection('messages');
  let unsubscribeMessages = () => {};

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);

  const onCollectionUpdate = async (querySnapshot: any) => {
    if (querySnapshot.docChanges.length) {
      const msgs = await Request.getMessages(request.id);
      const m = [];
      await Promise.all(
        querySnapshot.docChanges.map(
          async ({ type, doc }: { type: any; doc: any }) => {
            if (type === 'added') {
              m.push({ id: doc.id, ...doc.data() });
            }
          },
        ),
      );

      setMessages([...msgs].sort((a, b) => b.createdAt - a.createdAt));
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeMessages = messagesRef
      .where('createdAt', '>', Date.now())
      .onSnapshot(onCollectionUpdate);
    return () => {
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
  }, []);

  const fetchMessages = async () => {
    const m = await Request.getMessages(request.id);
    setMessages(m.sort((a, b) => b.createdAt - a.createdAt));
  };

  const sendMessage = async () => {
    if (message) {
      const messagePayload = {
        createdAt: Date.now(),
        message,
        user,
      };

      setMessage('');

      await messagesRef.add(messagePayload);
    }
  };

  return (
    <Fragment>
      <View style={styles.chatTab}>
        <MessageList messages={messages} user={user} />
      </View>
      <Footer style={styles.footer}>
        <FooterTab style={[styles.footerTab, styles.footerForm]}>
          <Item style={styles.messageInput}>
            <Input
              autoCorrect={false}
              selectionColor={R.colors.cursor}
              placeholder={R.strings.writeAMessage}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
              value={message}
            />
          </Item>
          <Button style={styles.formButton} transparent onPress={sendMessage}>
            <Icon style={styles.icon} name="md-send" />
          </Button>
        </FooterTab>
      </Footer>
    </Fragment>
  );
};

export default ChatTab;
