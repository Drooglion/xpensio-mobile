import React, { useEffect, useState } from 'react';
import { Container, StyleProvider, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { has } from 'lodash';

import Header from 'library/components/Header';
import NotificationsList from 'library/components/NotificationsList';
import HelperUtils from 'library/utils/HelperUtils';
import getTheme from 'native-base-theme/components';
import ListLoader from 'library/components/ListLoader';
import theme from 'native-base-theme/variables/theme';
import useFetchNotifications from 'hooks/api/private/notification/useFetchNotifications';

import styles from './styles';

const Notifications = () => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const { data: notifications, isLoading, refetch } = useFetchNotifications();

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

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('notifications')} linkToProfile />
        <View style={styles.content}>
          {isLoading ? (
            <ListLoader />
          ) : notifications.length > 0 ? (
            <NotificationsList
              data={notifications}
              isRefreshing={isLoading}
              onRefresh={refetch}
              onItemClick={itemClickHandler}
            />
          ) : null}
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Notifications;
