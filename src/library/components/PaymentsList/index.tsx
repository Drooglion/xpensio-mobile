import React, { Fragment } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
// import { graphql } from 'react-apollo';
import {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  View,
} from 'native-base';
// import UserAvatar from 'react-native-user-avatar';
import { capitalize, chain, isNil, isEmpty } from 'lodash';

import EmptyList from 'library/components/EmptyList';
// import STORE_QUERIES from 'library/store/queries';

import StringUtils from 'library/utils/StringUtils';
import DateUtils from 'library/utils/DateUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';

const PaymentsList = () => {
  const { t } = useTranslation();
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

  // renderOriginalAmount = (originalAmount, originalCurrency) => {
  //   const {
  //     companyConfiguration: { currency },
  //   } = this.props;
  //   return isNil(originalAmount) || originalCurrency === currency ? null : (
  //     <Text allowFontScaling={false} style={styles.originalAmount}>
  //       {`${NumberUtils.formatCurrency(originalCurrency, originalAmount)}/`}
  //     </Text>
  //   );
  // };

  // renderItem = item => {
  //   if (item.isSection) {
  //     this.renderDateHeader(item);
  //   }

  //   this.renderItemRow(item);
  // };

  const renderSection = (title: string) => (
    <ListItem itemHeader noBorder noIndent style={styles.listItem}>
      <Text style={styles.headerText}>{title}</Text>
    </ListItem>
  );

  // renderItemRow = (item, key) => {
  //   const {
  //     onItemClick,
  //     companyConfiguration: { currency },
  //     refetch,
  //   } = this.props;
  //   const avatar = !isNil(item.image) ? (
  //     <Thumbnail small source={{ uri: item.image }} />
  //   ) : (
  //     <UserAvatar
  //       size={R.metrics.avatar}
  //       name={StringUtils.getInitials(item.merchantName)}
  //       fontDecrease="2"
  //       colors={R.colors.avatars}
  //     />
  //   );

  //   let status = null;
  //   if (StringUtils.paymentStatus(item.status) !== 'APPROVED') {
  //     status = (
  //       <Text style={styles.missing}>
  //         {capitalize(StringUtils.paymentStatus(item.status))}
  //       </Text>
  //     );
  //   } else if (isEmpty(item.attachments)) {
  //     status = <Text style={styles.missing}>{R.strings.missingReceipt}</Text>;
  //   }

  //   return (
  //     <ListItem
  //       noBorder
  //       noIndent
  //       avatar
  //       button
  //       onPress={() => onItemClick(item, refetch)}
  //       style={styles.listItem}
  //       key={key}>
  //       <Left style={styles.itemLeft}>{avatar}</Left>
  //       <Body style={styles.itemBody}>
  //         <Text
  //           allowFontScaling={false}
  //           numberOfLines={1}
  //           ellipsizeMode="tail"
  //           style={styles.name}>
  //           {item.merchantName}
  //         </Text>
  //         <Text style={styles.time}>
  //           {DateUtils.formatTime(item.createdAt)}
  //         </Text>
  //         {status}
  //         {/*
  //           (item.comment !== null) ? (
  //             <View style={styles.commentBox}>
  //               <Text style={styles.comment}>{item.comment.description}</Text>
  //               <Text style={styles.team}>{item.comment.author}</Text>
  //             </View>
  //           ) : null
  //           */}
  //       </Body>
  //       <Right style={styles.itemRight}>
  //         {this.renderOriginalAmount(
  //           item.originalAmount,
  //           item.originalCurrency,
  //         )}
  //         <Text allowFontScaling={false} style={styles.amount}>
  //           {NumberUtils.formatCurrency(currency, item.amountTotal)}
  //         </Text>
  //       </Right>
  //     </ListItem>
  //   );
  // };

  const renderItemRows = (items: any) => {
    const itemSectionTitle = items[0]?.createdAtFormatted;
    const itemSection = renderSection(itemSectionTitle);
    // const itemRows = items.map((item, i) => renderItemRow(item, i));
    return (
      <Fragment>
        {itemSection}
        {/* {itemRows} */}
      </Fragment>
    );
  };

  const renderFooter = () => {
    return false ? <ActivityIndicator color={R.colors.primary} /> : null;
  };

  const data = [
    { title: 'mo', createdAtFormatted: 'July 4, 2021' },
    { title: 'mo', createdAtFormatted: 'July 4, 2021' },
    { title: 'mo', createdAtFormatted: 'July 4, 2021' },
  ];

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
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onEndReached={() => {}}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => renderItemRows(item)}
      />
    </View>
  );
};

export default PaymentsList;
