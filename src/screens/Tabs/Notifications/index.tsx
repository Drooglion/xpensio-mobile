import React, { useEffect, useState } from 'react';
import { Container, StyleProvider, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { has } from 'lodash';

import NotificationUtils from 'library/utils/NotificationUtils';
import NotificationsList from 'library/components/NotificationsList';
import NOTIFICATIONS from 'library/api/Notifications';
import Header from 'library/components/Header';
import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import ListLoader from 'library/components/ListLoader';
import theme from 'native-base-theme/variables/theme';

import styles from './styles';

const Notifications = () => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setNotifications([
      {
        timestamp: 1642458000000,
        image:
          'https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco,dpr_1/ckhdg6rldsa3hakgsx1r',
        user: {
          firstName: 'Vanessa',
          lastName: 'Liwanag',
        },
        message:
          'Vanessa Liwanag has approved your request - Philippine Airlines Tickets.',
        read: false,
      },
      {
        timestamp: 1642445640000,
        image: 'https://avatars.githubusercontent.com/u/2374569?v=4',
        user: {
          firstName: 'Dominick',
          lastName: 'Danao',
        },
        message:
          'Dominick Danao has approved your request - Postman Pro License.',
        read: false,
      },
      {
        timestamp: 1642384920000,
        image:
          'https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco,dpr_1/ckhdg6rldsa3hakgsx1r',
        user: {
          firstName: 'Vanessa',
          lastName: 'Liwanag',
        },
        message: 'Vanessa Liwanag has approved your request - Macbook Pro.',
        read: true,
      },
      {
        timestamp: 1642102140000,
        image:
          'https://pbs.twimg.com/profile_images/2490713091/zte33n566zeyyipyss63.jpeg',
        user: {
          firstName: 'Niño',
          lastName: 'Galpo',
        },
        message: 'Niño Galpo has requested a plastic card.',
        read: true,
      },
      {
        timestamp: 1642132920000,
        image: null,
        user: {
          firstName: 'Mark',
          lastName: 'Ronquillo',
        },
        message:
          'Mark Ronquillo has requested a budget for 16" Samsung Monitor.',
        read: true,
      },
      {
        timestamp: 1641864780000,
        image: null,
        user: {
          firstName: 'Mark',
          lastName: 'Ronquillo',
        },
        message:
          'Mark Ronquillo has requested a budget for Mechanical keyboard.',
        read: true,
      },
      {
        timestamp: 1641802620000,
        image: 'https://avatars.githubusercontent.com/u/2374569?v=4',
        user: {
          firstName: 'Dominick',
          lastName: 'Danao',
        },
        message: 'Dominick Danao has approved your request for plastic card.',
        read: true,
      },
    ]);
  }, []);

  const refetch = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

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
          {loading ? (
            <ListLoader />
          ) : notifications.length > 0 ? (
            <NotificationsList
              data={notifications}
              isRefreshing={loading}
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
