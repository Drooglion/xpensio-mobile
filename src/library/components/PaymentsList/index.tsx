import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
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
import { capitalize, chain, isNil, isEmpty } from 'lodash';

import EmptyList from 'library/components/EmptyList';

import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';
import { IPayment, IPaymentSection } from 'types/Payment';

type Props = {
  onItemClick: (payment: IPayment) => void;
  data: IPayment[];
  showName: boolean;
};

const PaymentsList = ({ onItemClick, data, showName }: Props) => {
  const { t } = useTranslation();
  const currency = 'php';
  const [items, setItems] = useState<IPaymentSection[][]>();

  useEffect(() => {
    if (data) {
      const myPayments = data.map(item => ({
        ...item,
        createdAtFormatted: DateUtils.getSectionHeaderDate(item.createdAt),
      }));
      const allCreatedAt = chain(myPayments)
        .map('createdAtFormatted')
        .uniq()
        .value();
      const sectionedData = allCreatedAt.map(createdAt =>
        myPayments.filter(item => item.createdAtFormatted === createdAt),
      );
      console.log('sections', sectionedData);
      setItems(sectionedData);
    }
  }, [data]);

  // componentDidMount() {
  //   const { data } = this.props;
  //   this.formatData(data);
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { data } = nextProps;
  //   this.formatData(data);
  // }

  // formatData = data => {
  //   const myPayments = data.map(item => ({
  //     ...item,
  //     createdAtFormatted: DateUtils.getSectionHeaderDate(item.createdAt),
  //   }));
  //   const allCreatedAt = chain(myPayments)
  //     .map('createdAtFormatted')
  //     .uniq()
  //     .value();
  //   const sectionedData = allCreatedAt.map(createdAt =>
  //     myPayments.filter(item => item.createdAtFormatted === createdAt),
  //   );
  //   this.setState({ data: sectionedData });
  // };

  const renderOriginalAmount = (
    originalAmount: number,
    originalCurrency: string,
  ) => {
    return isNil(originalAmount) ||
      originalCurrency.toLowerCase() === currency ? null : (
      <Text allowFontScaling={false} style={styles.originalAmount}>
        {`${NumberUtils.formatCurrency(originalCurrency, originalAmount)}/`}
      </Text>
    );
  };

  const renderSection = (title: string) => (
    <ListItem itemHeader noBorder noIndent style={styles.listItem}>
      <Text style={styles.headerText}>{title}</Text>
    </ListItem>
  );

  const renderItemRow = (item: IPayment, key: any) => {
    const avatar = !isNil(item.merchantLogo) ? (
      <Thumbnail small source={{ uri: item.merchantLogo }} />
    ) : (
      <UserAvatar
        size={R.metrics.avatar}
        name={StringUtils.getInitials(item.merchantName)}
        bgColors={R.colors.avatars}
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
      status = <Text style={styles.missing}>{R.strings.missingReceipt}</Text>;
    }

    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        onPress={() => onItemClick(item)}
        style={styles.listItem}
        key={key}>
        <Left style={styles.itemLeft}>{avatar}</Left>
        <Body style={styles.itemBody}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.name}>
            {item.merchantName}
          </Text>
          <Text style={styles.time}>
            {showName
              ? `${item.user.firstName} ${
                  item.user.lastName
                } ??? ${DateUtils.formatTime(item.createdAt)}`
              : DateUtils.formatTime(item.createdAt)}
          </Text>
          {status}
          {/*
            (item.comment !== null) ? (
              <View style={styles.commentBox}>
                <Text style={styles.comment}>{item.comment.description}</Text>
                <Text style={styles.team}>{item.comment.author}</Text>
              </View>
            ) : null
            */}
        </Body>
        <Right style={styles.itemRight}>
          {renderOriginalAmount(
            item.originalAmount ? parseFloat(item.originalAmount) : 0,
            item.originalCurrency,
          )}
          <Text allowFontScaling={false} style={styles.amount}>
            {NumberUtils.formatCurrency(currency, item.amountTotal)}
          </Text>
        </Right>
      </ListItem>
    );
  };

  const renderItemRows = ({ item: row }: { item: IPaymentSection[] }) => {
    const itemSectionTitle = row[0]?.createdAtFormatted;
    const itemSection = renderSection(itemSectionTitle);

    return (
      <Fragment>
        {itemSection}
        {row.map((item: any, i: any) => renderItemRow(item, i))}
      </Fragment>
    );
  };

  const renderFooter = () => {
    return false ? <ActivityIndicator color={R.colors.primary} /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
        ListEmptyComponent={
          <EmptyList image={R.images.empty_payments} text={t('noPayments')} />
        }
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onEndReached={() => {}}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
        renderItem={renderItemRows}
      />
    </View>
  );
};

export default PaymentsList;
