/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  flattenDeep,
  isEmpty,
  chain,
  isNil
} from 'lodash';
import {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  View,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar';

import SwipeButtons from 'library/components/SwipeButtons';
import EmptyList from 'library/components/EmptyList';
import STORE_QUERIES from 'library/store/queries';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';

class RequestsList extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.formatData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.formatData(nextProps);
  }

  formatData = ({ data, sectionBy }) => {
    if (sectionBy === 'status') {
      const pendings = data.filter(item => item.status === 0).sort();
      const pastRequests = data.filter(item => item.status !== 0).sort();
      this.setState({ data: [pendings, pastRequests] });
    } else {
      const myRequests = data.map(item => ({
        ...item, createdAt: DateUtils.getSectionHeaderDate(item.createdAt)
      }));
      const allCreatedAt = chain(myRequests).map('createdAt').uniq().value();
      const sectionedData = allCreatedAt.map(
        createdAt => myRequests.filter(item => item.createdAt === createdAt)
      );
      this.setState({ data: sectionedData });
    }
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
      <Text style={styles.headerText}>
        {title}
      </Text>
    </ListItem>
  )

  renderItemRow = (item, key) => {
    const {
      onApproveRequest,
      onDenyRequest,
      onItemClick,
      teamRequest,
      companyConfiguration: { currency },
      refetch,
    } = this.props;
    const statusColor = { color: HelperUtils.statusColor(item.status) };
    const disabled = item.status !== 0 || !teamRequest;
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
          name={StringUtils.getInitials(item.category.name)}
          fontDecrease="2"
          colors={R.colors.avatars}
        />
      );

    return (
      <SwipeButtons
        disabled={disabled}
        key={key}
        onApprove={() => onApproveRequest(item.id)}
        onDeny={() => onDenyRequest({ id: item.id, reason: '' })}
      >
        <ListItem
          noBorder
          noIndent
          avatar
          button
          onPress={() => onItemClick(item, refetch)}
          style={styles.listItem}
        >
          <Left style={styles.itemLeft}>{avatar}</Left>
          <Body style={styles.itemBody}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.name}
            >
              {item.title}
            </Text>
            {/* <Text style={styles.time}>{item.description}</Text> */}
            {
              // (item.comment !== null) ? (
              //   <View style={styles.commentBox}>
              //     <Text style={styles.comment}>{item.comment.description}</Text>
              //     <Text style={styles.team}>{item.comment.author}</Text>
              //   </View>
              // ) : null
            }
          </Body>
          <Right style={styles.itemRight}>
            <Text
              allowFontScaling={false}
              style={styles.amount}
            >
              { NumberUtils.formatCurrency(currency, item.amount) }
            </Text>
            <Text
              allowFontScaling={false}
              uppercase
              style={StyleSheet.flatten([styles.status, statusColor])}
            >
              {StringUtils.formatStatus(item.status)}
            </Text>
          </Right>
        </ListItem>
      </SwipeButtons>
    );
  }

  renderItemRows = (items) => {
    let component = null;
    if (!isEmpty(items)) {
      const { sectionBy } = this.props;
      const itemSectionTitle = sectionBy === 'status'
        ? this.sectionTitleByStatus(items[0].status)
        : items[0].createdAt;
      const itemSection = this.renderSection(itemSectionTitle);
      const itemRows = items.map((item, i) => this.renderItemRow(item, i));
      component = (
        <Fragment>
          { itemSection }
          { itemRows }
        </Fragment>
      );
    }
    return component;
  }

  sectionTitleByStatus = (status) => {
    const { data } = this.state;
    return status === 0 ? `NEEDS APPROVAL (${data[0].length})` : 'PAST REQUESTS';
  }

  renderFooter = () => {
    const { loading } = this.props;
    return loading ? (
      <ActivityIndicator color={R.colors.primary} />
    ) : null;
  }

  render() {
    const { data } = this.state;
    const { loadMore, isRefreshing, onRefresh } = this.props;
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
              image={R.images.empty_requests}
              text={R.strings.noRequests}
            />
          )}
          data={isEmpty(flattenDeep(data)) ? [] : data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={1}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            this.renderItemRows(item)
          )}
        />
      </View>
    );
  }
}

RequestsList.propTypes = {
  // data: PropTypes.instanceOf(Array),
  onItemClick: PropTypes.func.isRequired,
  sectionBy: PropTypes.string,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  isRefreshing: PropTypes.bool,
  onApproveRequest: PropTypes.func,
  onDenyRequest: PropTypes.func,
  onRefresh: PropTypes.func,
  refetch: PropTypes.func,
  teamRequest: PropTypes.bool,
};

RequestsList.defaultProps = {
  sectionBy: 'date',
  loading: false,
  loadMore: () => {},
  isRefreshing: false,
  onApproveRequest: () => {},
  onDenyRequest: () => {},
  onRefresh: () => {},
  teamRequest: false,
  refetch: () => {},
};

export default graphql(
  STORE_QUERIES.companyConfiguration, {
    props: ({ data: { companyConfiguration } }) => ({
      companyConfiguration
    })
  }
)(RequestsList);
