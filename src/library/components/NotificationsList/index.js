/* eslint-disable import/no-unresolved */

import React, { Component, Fragment } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash';
import {
  ListItem,
  Text,
  Left,
  Body,
  Thumbnail,
  View,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar';

import EmptyList from 'library/components/EmptyList';

import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import R from 'res/R';
import styles from './styles';

export default class NotificationsList extends Component {
  state = { data: {} };

  componentWillMount() {
    const { data } = this.props;
    this.formatData(data);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.formatData(data);
  }

  formatData = (data) => {
    const myNotifications = data.map(item => ({
      ...item, date: DateUtils.formatNotificationDate(item.timestamp, 4)
    }));

    const unreadItems = myNotifications.filter(item => item.read === false);
    const readItems = myNotifications.filter(item => item.read === true);

    const sectionedData = [];
    if (!isEmpty(unreadItems)) {
      sectionedData.push(unreadItems);
    }
    if (!isEmpty(readItems)) {
      sectionedData.push(readItems);
    }

    this.setState({ data: sectionedData });
  }

  renderItem = (item) => {
    if (item.isSection) {
      this.renderDateHeader(item);
    }

    this.renderItemRow(item);
  }

  renderSection = title => (
    <ListItem
      itemHeader
      noBorder
      noIndent
      style={styles.listItem}
    >
      <Text style={styles.headerText} uppercase>
        {title}
      </Text>
    </ListItem>
  )

  renderItemRow = (item, key) => {
    const { onItemClick } = this.props;
    const disabled = item.status !== 0;
    const listItemStyle = !item.read ? (
      [styles.listItem, { backgroundColor: R.colors.notifUnread }]
    ) : styles.listItem;

    const avatar = (!isNil(item.image))
      ? (
        <Thumbnail
          small
          source={{ uri: item.image }}
        />
      )
      : (
        <UserAvatar
          size={R.metrics.avatar}
          name={StringUtils.getInitials(item.user.firstName)}
          fontDecrease="2"
          colors={R.colors.avatars}
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
        style={listItemStyle}
      >
        <Left style={styles.itemLeft}>{avatar}</Left>
        <Body style={styles.itemBody}>
          <Text
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.message}
          >
            {item.message}
          </Text>
          <Text style={styles.time}>
            {DateUtils.formatNotificationDate(item.timestamp, 4)}
          </Text>
        </Body>
      </ListItem>
    );
  }

  renderItemRows = (items) => {
    const header = items[0].read ? R.strings.earlier : `NEW (${items.length})`;
    const itemSection = this.renderSection(header);
    const itemRows = items.map((item, i) => this.renderItemRow(item, i));

    return (
      <Fragment>
        { itemSection }
        { itemRows }
      </Fragment>
    );
  }

  render() {
    const { isRefreshing, onRefresh } = this.props;
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          )}
          ListEmptyComponent={(
            <EmptyList
              image={R.images.empty_notifications}
              text={R.strings.noNotifications}
            />
          )}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            this.renderItemRows(item)
          )}
        />
      </View>
    );
  }
}

NotificationsList.propTypes = {
  data: PropTypes.instanceOf(Array),
  onItemClick: PropTypes.func,
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

NotificationsList.defaultProps = {
  data: [],
  onItemClick: () => {},
  isRefreshing: false,
  onRefresh: () => {},
};
