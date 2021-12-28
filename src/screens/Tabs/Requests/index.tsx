import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
  Text,
} from 'native-base';

import Header from 'library/components/Header';
import { useTranslation } from 'react-i18next';
// import MyRequests from 'library/components/MyRequests';
// import TeamRequests from 'library/components/TeamRequests';
import TabSelection from 'library/components/TabSelection';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { Image, SectionList, TextInput, TouchableOpacity } from 'react-native';
import R from '../../../res/R';
import { Icon } from 'native-base';

const DATA = [
  {
    id: 1,
    date: 'TODAY',
    data: [
      {
        id: 123,
        title: 'Facebook Ads',
        description: 'New campaign',
        amount: 10000,
        status: 'PENDING',
        comment: {
          author: 'Dominick Danao',
          content: 'Give details on where will it be used.',
        },
      },
      {
        id: 456,
        title: 'Philippines Airlines',
        description: 'Us Expansion',
        amount: 25000,
        status: 'DENIED',
      },
      {
        id: 789,
        title: 'Lazada.com',
        description: 'Brand Video',
        amount: 2500,
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 2,
    date: 'YESTERDAY',
    data: [
      {
        id: 1234,
        title: 'Facebook Ads',
        description: 'New campaign',
        amount: 10000,
        status: 'PENDING',
        comment: {
          author: 'Dominick Danao',
          content: 'Give details on where will it be used.',
        },
      },
      {
        id: 4567,
        title: 'Philippines Airlines',
        description: 'Us Expansion',
        amount: 25000,
        status: 'DENIED',
      },
      {
        id: 8901,
        title: 'Lazada.com',
        description: 'Brand Video',
        amount: 2500,
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 3,
    date: '2021-12-26',
    data: [
      {
        id: 12345,
        title: 'Facebook Ads',
        description: 'New campaign',
        amount: 10000,
        status: 'PENDING',
        comment: {
          author: 'Dominick Danao',
          content: 'Give details on where will it be used.',
        },
      },
      {
        id: 6789,
        title: 'Philippines Airlines',
        description: 'Us Expansion',
        amount: 25000,
        status: 'DENIED',
      },
      {
        id: 12300,
        title: 'Lazada.com',
        description: 'Brand Video',
        amount: 2500,
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 4,
    date: '2021-12-25',
    data: [
      {
        id: 45600,
        title: 'Facebook Ads',
        description: 'New campaign',
        amount: 10000,
        status: 'PENDING',
        comment: {
          author: 'Dominick Danao',
          content: 'Give details on where will it be used.',
        },
      },
      {
        id: 78900,
        title: 'Philippines Airlines',
        description: 'Us Expansion',
        amount: 25000,
        status: 'DENIED',
      },
      {
        id: 12000,
        title: 'Lazada.com',
        description: 'Brand Video',
        amount: 2500,
        status: 'APPROVED',
      },
    ],
  },
];

const Requests = ({ navigation }) => {
  const { t } = useTranslation();
  let tab: {} | undefined | null = {};
  const actAsAdmin: boolean = false;
  const tabs = !actAsAdmin ? [t('myRequests')] : [t('myRequests'), t('team')];

  const onItemClick = item => {};

  const goToTabPage = page => {
    tab.goToPage(page);
  };

  const currencyFomart = number => {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const [dataFiltered, setDataFiltered] = useState(DATA);

  const searchData = text => {
    const result = DATA.map(item => ({
      ...item,
      data: item.data.filter(dat =>
        dat.title.toLowerCase().includes(text.toLowerCase()),
      ),
    })).filter(item => item.data.length > 0);

    setDataFiltered(result);
  };

  const RenderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <View style={styles.requestContentContainer}>
          <View style={styles.iconContainer}>
            <Icon name="partly-sunny-outline" style={styles.icon} />
          </View>
          <View style={styles.requestTitleContainer}>
            <Text style={styles.txtTitle}>{item.title}</Text>
            <Text style={styles.txtDescription}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.requestAmountContainer}>
          <Text style={styles.txtAmount}>
            {'\u20B1'}
            {currencyFomart(item.amount)}
          </Text>
          <Text
            style={[
              styles.txtStatus,
              {
                color:
                  item.status === 'PENDING'
                    ? R.colors.pending
                    : item.status === 'APPROVED'
                    ? R.colors.success
                    : item.status === 'DENIED'
                    ? R.colors.error
                    : '',
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
      {item.comment ? (
        <View style={styles.commentContainer}>
          <Text style={styles.commentDetails}>"{item.comment.content}"</Text>
          <Text style={styles.commentAuthor}>{item.comment.author}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('requests')} />
        <View style={{ flexGrow: 1 }}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={e => {
              tab = e;
            }}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              {/* <MyRequests onItemClick={onItemClick} /> */}
              <View style={styles.listContainer}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    onChangeText={text => searchData(text)}
                  />
                  <Icon name="search-sharp" style={styles.searchIcon} />
                </View>
                <TouchableOpacity>
                  <Image
                    source={require('../../../res/images/ic_filter.png')}
                  />
                </TouchableOpacity>
              </View>
              <SectionList
                showsVerticalScrollIndicator={false}
                style={styles.sectionContainer}
                stickySectionHeadersEnabled={false}
                sections={dataFiltered}
                keyExtractor={(item, index) => item + index}
                renderItem={RenderItem}
                renderSectionHeader={({ section: { date } }) => (
                  <Text style={styles.txtHeader}>{date}</Text>
                )}
              />
            </Tab>
            {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                {/* <TeamRequests onItemClick={onItemClick} /> */}
              </Tab>
            )}
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Requests;
