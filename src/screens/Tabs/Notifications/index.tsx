import React, { useEffect, useState } from 'react';
import { Container, StyleProvider, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { has, isEmpty } from 'lodash';
import _isEmpty from 'lodash/isEmpty';

import Header from 'library/components/Header';
import NotificationsList from 'library/components/NotificationsList';
import HelperUtils from 'library/utils/HelperUtils';
import getTheme from 'native-base-theme/components';
import ListLoader from 'library/components/ListLoader';
import theme from 'native-base-theme/variables/theme';
import useFetchNotifications from 'hooks/api/private/notification/useFetchNotifications';

import styles from './styles';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';
import Account from 'models/Account';
import { IUser } from 'types/User';

const Notifications = () => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const { data: notifications, isLoading, refetch } = useFetchNotifications();

  const [user, setUser] = useState<IUser>();

  useFetchAccount({
    onSuccess: (account: Account) => {
      setUser(account.user);
    },
    onError: err => {
      console.error(err);
    },
  });

  const markAsRead = async (id: string) => {};

  const itemClickHandler = async (item: any) => {
    try {
      const { notificationId, metadata } = item;

      /* post notification as read */
      if (!item.read) {
        //const variables = { input: { key: notificationId } };
        await markAsRead(notificationId);
      }

      if (has(metadata, 'id')) {
        /* handle notification */
        /* NotificationUtils.handleNotification({
          message: item.message,
          metadata,
          navigator,
        }); */
      }
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      console.log('Error: ', { error });
    }
  };

  console.log();

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('notifications')} linkToProfile user={user} />
        <View style={styles.content}>
          {isLoading || !notifications ? (
            <ListLoader />
          ) : (
            <NotificationsList
              data={notifications}
              isRefreshing={isLoading}
              onRefresh={refetch}
              onItemClick={itemClickHandler}
            />
          )}
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Notifications;
