/* eslint-disable import/no-unresolved */
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
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
import {
  capitalize,
  chain,
  isNil,
  isEmpty
} from 'lodash';

import EmptyList from 'library/components/EmptyList';
import STORE_QUERIES from 'library/store/queries';

import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';

class PaymentsList extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { data } = this.props;
    this.formatData(data);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.formatData(data);
  }

  formatData = (data) => {
    const myPayments = data.map(item => ({
      ...item, createdAtFormatted: DateUtils.getSectionHeaderDate(item.createdAt)
    }));
    const allCreatedAt = chain(myPayments).map('createdAtFormatted').uniq().value();
    const sectionedData = allCreatedAt.map(
      createdAt => myPayments.filter(item => item.createdAtFormatted === createdAt)
    );
    this.setState({ data: sectionedData });
  }

  renderOriginalAmount = (originalAmount, originalCurrency) => {
    const { companyConfiguration: { currency } } = this.props;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Text
        allowFontScaling={false}
        style={styles.originalAmount}
      >
        {`${NumberUtils.formatCurrency(originalCurrency, originalAmount)}/`}
      </Text>
    );
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
      onItemClick,
      companyConfiguration: { currency },
      refetch,
    } = this.props;
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
          name={StringUtils.getInitials(item.merchantName)}
          fontDecrease="2"
          colors={R.colors.avatars}
        />
      );

    let status = null;
    if (StringUtils.paymentStatus(item.status) !== 'APPROVED') {
      status = (
        <Text style={styles.missing}>
          {capitalize(StringUtils.paymentStatus(item.status))}
        </Text>
      );
    } else if (isEmpty(item.attachments)) {
      status = (
        <Text style={styles.missing}>
          {R.strings.missingReceipt}
        </Text>
      );
    }

    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        onPress={() => onItemClick(item, refetch)}
        style={styles.listItem}
        key={key}
      >
        <Left style={styles.itemLeft}>{avatar}</Left>
        <Body style={styles.itemBody}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.name}
          >
            {item.merchantName}
          </Text>
          <Text style={styles.time}>{DateUtils.formatTime(item.createdAt)}</Text>
          { status }
          {
            /*
            (item.comment !== null) ? (
              <View style={styles.commentBox}>
                <Text style={styles.comment}>{item.comment.description}</Text>
                <Text style={styles.team}>{item.comment.author}</Text>
              </View>
            ) : null
            */
          }
        </Body>
        <Right style={styles.itemRight}>
          { this.renderOriginalAmount(item.originalAmount, item.originalCurrency) }
          <Text
            allowFontScaling={false}
            style={styles.amount}
          >
            {NumberUtils.formatCurrency(currency, item.amountTotal)}
          </Text>
        </Right>
      </ListItem>
    );
  }

  renderItemRows = (items) => {
    const itemSectionTitle = items[0].createdAtFormatted;
    const itemSection = this.renderSection(itemSectionTitle);
    const itemRows = items.map((item, i) => this.renderItemRow(item, i));
    return (
      <Fragment>
        { itemSection }
        { itemRows }
      </Fragment>
    );
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
              image={R.images.empty_payments}
              text={R.strings.noPayments}
            />
          )}
          data={data}
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

PaymentsList.propTypes = {
  data: PropTypes.instanceOf(Array),
  onItemClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  refetch: PropTypes.func.isRequired,
};

PaymentsList.defaultProps = {
  data: [],
  isRefreshing: false,
  onRefresh: () => {},
};

export default graphql(
  STORE_QUERIES.companyConfiguration, {
    props: ({ data: { companyConfiguration } }) => ({
      companyConfiguration
    })
  }
)(PaymentsList);
