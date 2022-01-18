import React, { Fragment, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ListItem, Text, Left, Body, Thumbnail, View } from 'native-base';
import UserAvatar from 'react-native-user-avatar';

import EmptyList from 'library/components/EmptyList';

import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import R from 'res/R';
import styles from './styles';
import { NotificationType } from 'library/types/Notifications';

export interface NotificationsListProps {
  data: NotificationType[];
  isRefreshing: boolean;
  onRefresh(): void;
  onItemClick(item: any): void;
}

const NotificationsList = ({
  data,
  isRefreshing,
  onRefresh,
  onItemClick,
}: NotificationsListProps) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      formatData(data);
    }
  }, [data]);

  const formatData = (d: NotificationType[]) => {
    const myNotifications = d.map(item => ({
      ...item,
      date: DateUtils.formatNotificationDate(item.timestamp, 4),
    }));

    const unreadItems = myNotifications.filter(item => item.read === false);
    const readItems = myNotifications.filter(item => item.read === true);

    const sectionedData = [];
    if (unreadItems.length > 0) {
      sectionedData.push(unreadItems);
    }
    if (readItems.length > 0) {
      sectionedData.push(readItems);
    }

    setItems(sectionedData);
  };

  const renderSection = (title: string) => (
    <ListItem itemHeader noBorder noIndent style={styles.listItem}>
      <Text style={styles.headerText} uppercase>
        {title}
      </Text>
    </ListItem>
  );

  const renderItemRow = (item: any, key: number) => {
    const disabled = item.status !== 0;
    const listItemStyle = !item.read
      ? [styles.listItem, { backgroundColor: R.colors.notifUnread }]
      : styles.listItem;

    const avatar = item.image ? (
      <Thumbnail small source={{ uri: item.image }} />
    ) : (
      <UserAvatar
        size={R.metrics.avatar}
        name={StringUtils.getInitials(item.user.firstName)}
        bgColors={R.colors.avatars}
      />
    );

    return (
      <ListItem
        key={key}
        noBorder
        noIndent
        avatar
        button
        onPress={() => onItemClick(item)}
        style={listItemStyle}>
        <Left style={styles.itemLeft}>{avatar}</Left>
        <Body style={styles.itemBody}>
          <Text
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.message}>
            {item.message}
          </Text>
          <Text style={styles.time}>
            {DateUtils.formatNotificationDate(item.timestamp, 4)}
          </Text>
        </Body>
      </ListItem>
    );
  };

  const renderItemRows = (rows: any) => {
    const header = rows[0].read ? R.strings.earlier : `NEW (${rows.length})`;
    const itemSection = renderSection(header);
    const itemRows = rows.map((item: any, i: number) => renderItemRow(item, i));

    return (
      <Fragment>
        {itemSection}
        {itemRows}
      </Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyList
            image={R.images.empty_notifications}
            text={R.strings.noNotifications}
          />
        }
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => renderItemRows(item)}
      />
    </View>
  );
};

NotificationsList.defaultProps = {
  data: [],
  onItemClick: () => {},
  isRefreshing: false,
  onRefresh: () => {},
};

export default NotificationsList;
