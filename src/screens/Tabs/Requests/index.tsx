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

const DATATEAM = [
  {
    id: 1,
    label: 'NEEDS APPROVAL (3)',
    data: [
      {
        id: 123,
        title: 'Apple Macbook Pro',
        description: 'New Laptop',
        amount: 89990,
        status: 'PENDING',
        comment: {
          author: 'Dominick Danao',
          content: 'Will be used by new product designer',
          image:
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        },
      },
      {
        id: 456,
        title: 'Linkedin Pre-Registration',
        description: 'Us Expansion',
        amount: 12000,
        status: 'PENDING',
        comment: {
          author: 'Mitch Belen',
          content: 'For promoting in LinkedIn to connect with companies',
          image: '',
        },
      },
      {
        id: 789,
        title: 'Github License',
        description: 'Repository',
        amount: 15000,
        status: 'PENDING',
        comment: {
          author: 'Jerick Coneras',
          content: 'Collaboration tool for engineers',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
      },
    ],
  },
  {
    id: 2,
    label: 'PAST REQUESTS',
    data: [
      {
        id: 1234,
        title: 'AWS Subscription',
        description: 'New campaign',
        amount: 7500,
        status: 'DENIED',
        comment: {
          author: 'Jerick Coneras',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
      },
      {
        id: 4567,
        title: 'Postman License',
        description: 'Us Expansion',
        amount: 3000,
        status: 'APPROVED',
        comment: {
          author: 'Jon Danao',
          image: '',
        },
      },
      {
        id: 8901,
        title: 'PandaDoc',
        description: 'Brand Video',
        amount: 8000,
        status: 'APPROVED',
        comment: {
          author: 'Dominick Danao',
          image:
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        },
      },
      {
        id: 6543,
        title: 'Mailchimp',
        description: 'Brand Video',
        amount: 3000,
        status: 'CANCELLED',
        comment: {
          author: 'Mitch Belen',
          image: '',
        },
      },
      {
        id: 6348,
        title: 'Digital Ocean',
        description: 'Brand Video',
        amount: 2000,
        status: 'APPROVED',
        comment: {
          author: 'Jerick Coneras',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
      },
    ],
  },
];

const Requests = ({ navigation }) => {
  const { t } = useTranslation();
  let tab: {} | undefined | null = {};
  const actAsAdmin: boolean = true;
  const tabs = !actAsAdmin ? [t('myRequests')] : [t('myRequests'), t('team')];

  const onItemClick = item => {};

  const goToTabPage = page => {
    tab.goToPage(page);
  };

  const currencyFomart = number => {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const [dataFiltered, setDataFiltered] = useState(DATA);
  const [dataFilteredTeam, setDataFilteredTeam] = useState(DATATEAM);

  const searchData = text => {
    const result = DATA.map(item => ({
      ...item,
      data: item.data.filter(dat =>
        dat.title.toLowerCase().includes(text.toLowerCase()),
      ),
    })).filter(item => item.data.length > 0);

    setDataFiltered(result);
  };

  const RenderItemMyRequest = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Request Details')}>
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

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const RenderItemTeamRequest = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Request Details')}>
      <View style={styles.itemContainer}>
        <View style={styles.requestContentContainer}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: generateColor() },
            ]}>
            {item.comment.image ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: item.comment.image,
                }}
              />
            ) : (
              <Text style={styles.noAvatar}>
                {item.comment.author.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <View style={styles.requestTitleContainer}>
            <Text numberOfLines={1} style={styles.txtTitleTeam}>
              {item.title}
            </Text>
            <Text style={styles.txtDescription}>{item.comment.author}</Text>
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
                    : item.status === 'DENIED' || item.status === 'CANCELLED'
                    ? R.colors.error
                    : '',
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
      {item.comment.content ? (
        <View style={styles.noteContainer}>
          <Text style={styles.noteDetails}>"{item.comment.content}"</Text>
        </View>
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('requests')} count={3} />
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
                renderItem={RenderItemMyRequest}
                renderSectionHeader={({ section: { date } }) => (
                  <Text style={styles.txtHeader}>{date}</Text>
                )}
              />
            </Tab>
            {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                {/* <TeamRequests onItemClick={onItemClick} /> */}
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
                  sections={DATATEAM}
                  keyExtractor={(item, index) => item + index}
                  renderItem={RenderItemTeamRequest}
                  renderSectionHeader={({ section: { label } }) => (
                    <Text style={styles.txtHeader}>{label}</Text>
                  )}
                />
              </Tab>
            )}
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Requests;
