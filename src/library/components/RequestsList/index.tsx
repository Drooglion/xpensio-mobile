import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { chain } from 'lodash';
import { ListItem, Text, Left, Body, Right, View } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import { useTranslation } from 'react-i18next';

import SwipeButtons from 'library/components/SwipeButtons';
import EmptyList from 'library/components/EmptyList';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';
import { IRequest, IRequestsSection } from 'types/Request';

export interface RequestListProps {
  data: IRequest[];
  currency: string;
  onItemClick(item: IRequest): void;
  sectionBy?: string;
  loading?: boolean;
  loadMore(): void;
  isRefreshing: boolean;
  onApproveRequest(id: string): void;
  onDenyRequest(id: string): void;
  onRefresh(): void;
  teamRequest?: boolean;
}

const defaultProps: RequestListProps = {
  data: [],
  currency: 'php',
  onItemClick: () => {},
  sectionBy: undefined,
  loading: false,
  loadMore: () => {},
  isRefreshing: false,
  onApproveRequest: () => {},
  onDenyRequest: () => {},
  onRefresh: () => {},
  teamRequest: false,
};

const RequestsList = ({
  data,
  currency,
  sectionBy,
  loading,
  isRefreshing,
  teamRequest,
  onItemClick,
  loadMore,
  onRefresh,
  onApproveRequest,
  onDenyRequest,
}: RequestListProps) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<IRequest[][] | IRequestsSection[][]>();

  useEffect(() => {
    if (items) {
      console.log({ items });
    }
  }, [items]);

  useEffect(() => {
    if (data) {
      if (sectionBy === 'status') {
        const pendings = data.filter(item => item.status === 0).sort();
        const pastRequests = data.filter(item => item.status !== 0).sort();
        setItems([pendings, pastRequests]);
      } else {
        const myRequests = data.map(item => ({
          ...item,
          createdAtFormatted: DateUtils.getSectionHeaderDate(item.createdAt),
        }));
        const allCreatedAt = chain(myRequests)
          .map('createdAtFormatted')
          .uniq()
          .value();
        const sectionedData = allCreatedAt.map(createdAt =>
          myRequests.filter(item => item.createdAtFormatted === createdAt),
        );
        setItems(sectionedData);
      }
    }
  }, [data, sectionBy]);

  const renderSection = (title: string) => (
    <ListItem itemHeader noBorder noIndent style={styles.listItem}>
      <Text style={styles.headerText}>{title}</Text>
    </ListItem>
  );

  const renderItemRow = (item: IRequest, key: any) => {
    const statusColor = {
      color: HelperUtils.statusColor(item.status) || '#000',
    };
    const disabled = item.status !== 0 || !teamRequest;
    const avatar = (
      <UserAvatar
        size={R.metrics.avatar}
        name={StringUtils.getInitials(item.title)}
        bgColors={R.colors.avatars}
      />
    );

    return (
      <SwipeButtons
        disabled={disabled}
        key={key}
        onApprove={() => onApproveRequest(item.id)}
        onDeny={() => onDenyRequest(item.id)}>
        <ListItem
          noBorder
          noIndent
          avatar
          button
          onPress={() => onItemClick(item)}
          style={styles.listItem}>
          <Left style={styles.itemLeft}>{avatar}</Left>
          <Body style={styles.itemBody}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.name}>
              {item.title}
            </Text>
            <Text style={styles.time}>{item.description}</Text>
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
            <Text allowFontScaling={false} style={styles.amount}>
              {NumberUtils.formatCurrency(currency, item.amount)}
            </Text>
            <Text
              allowFontScaling={false}
              uppercase
              style={StyleSheet.flatten([styles.status, statusColor])}>
              {StringUtils.formatStatus(item.status)}
            </Text>
          </Right>
        </ListItem>
      </SwipeButtons>
    );
  };

  const renderItemRows = ({
    item: row,
  }: {
    item: IRequest[] | IRequestsSection[];
  }) => {
    let component = null;
    if (row) {
      console.log({ row });
      if (row[0]) {
        const itemSectionTitle =
          sectionBy === 'status'
            ? sectionTitleByStatus(row[0].status)
            : // @ts-ignore
              row[0].createdAtFormatted;
        const itemSection = renderSection(itemSectionTitle);
        const itemRows = row.map((item, i) => renderItemRow(item, i));
        component = (
          <Fragment>
            {itemSection}
            {itemRows}
          </Fragment>
        );
      }
    }
    return component;
  };

  const sectionTitleByStatus = (status: number) => {
    return items && status === 0
      ? `NEEDS APPROVAL (${items[0]?.length})`
      : 'PAST REQUESTS';
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator color={R.colors.primary} /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyList image={R.images.empty_requests} text={t('noRequests')} />
        }
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
        renderItem={renderItemRows}
      />
    </View>
  );
};

RequestsList.defaultProps = defaultProps;

export default RequestsList;
