import React, { useEffect, useRef, useState } from 'react';
import { Container, Tabs, Tab, TabHeading, StyleProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Header from 'library/components/Header';
import { useTranslation } from 'react-i18next';
import TabSelection from 'library/components/TabSelection';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import EmptyVirtualCard from 'library/components/EmptyVirtualCard';
import Loading from 'library/components/Loading';
import { RefreshControl, ScrollView } from 'react-native';
import EmptyPlasticCard from 'library/components/EmptyPlasticCard';
import { PlasticCardType, VirtualCardType } from 'library/types/Cards';
import VirtualCards from 'library/components/VirtualCards';
import { CompanyType } from 'library/types/User';
import PlasticCards from 'library/components/PlasticCards';

const dummyVirtualCards: VirtualCardType[] = [
  {
    last4: '4242',
    expiryMonth: '11',
    expiryYear: '2024',
    cardholder: 'John Appleseed',
    status: 1,
  },
  {
    last4: '5551',
    expiryMonth: '6',
    expiryYear: '2024',
    cardholder: 'John Appleseed',
    status: 0,
  },
];

const dummyPlasticCards: PlasticCardType[] = [
  {
    last4: '5079',
    cardholder: 'John Appleseed',
    status: -1,
  },
];

const MyCards = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const tab = useRef<any>(null);
  const tabs = [t('virtual'), t('plastic')];
  const [company, setCompany] = useState<CompanyType>();
  const [virtualCards, setVirtualCards] = useState<VirtualCardType[]>([]);
  const [plasticCards, setPlasticCards] = useState<PlasticCardType[]>([]);
  const [pendingVirtualCardRequests, setPendingVirtualCardRequests] = useState<
    any[]
  >([]);
  const [pendingPlasticCardRequests, setPendingPlasticCardRequests] = useState<
    any[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    setCompany({
      companyName: 'Xpensio Corp',
      companyAddress: '19F Marco Polo Sapphire Rd Ortigas Ctr Pasig City',
    });
    setVirtualCards(dummyVirtualCards);
    setPlasticCards(dummyPlasticCards);
    setLoading(false);

    return () => {
      setVirtualCards([]);
      setPendingVirtualCardRequests([]);
    };
  }, []);

  const onItemClick = item => {};

  const goToTabPage = (page: any) => {
    console.log('page', page);
    if (tab.current) {
      tab.current.goToPage(page);
    }
  };

  const onRefreshData = () => {};

  const onRequestVirtualCard = () => {};

  const onRequestPlasticCard = () => {};

  const openScannerHandler = (card: PlasticCardType) => {
    console.log('scan', card);
    if (navigation) {
      navigation.navigate('Scanner', { card });
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('myCards')} />
        <TabSelection tabs={tabs} onChange={goToTabPage} />
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            contentContainerStyle={styles.tabsContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefreshData}
              />
            }>
            <Tabs
              initialPage={0}
              ref={tab}
              locked
              tabContainerStyle={styles.tabContainer}
              tabBarUnderlineStyle={styles.tabUnderline}>
              <Tab heading={<TabHeading />}>
                {virtualCards.length > 0 ? (
                  <VirtualCards
                    company={company}
                    virtualCards={virtualCards}
                    hasPendingRequest={pendingVirtualCardRequests.length > 0}
                    onRequestCard={onRequestVirtualCard}
                  />
                ) : (
                  <EmptyVirtualCard
                    disabled={pendingVirtualCardRequests.length > 0}
                    requested={pendingVirtualCardRequests.length > 0}
                    onRequestCard={onRequestVirtualCard}
                  />
                )}
              </Tab>
              <Tab heading={<TabHeading />}>
                {plasticCards.length > 0 ? (
                  <PlasticCards
                    plasticCards={plasticCards}
                    company={company}
                    onOpenScanner={openScannerHandler}
                  />
                ) : (
                  <EmptyPlasticCard
                    disabled={pendingPlasticCardRequests.length > 0}
                    requested={pendingPlasticCardRequests.length > 0}
                    onRequestCard={onRequestPlasticCard}
                  />
                )}
              </Tab>
            </Tabs>
          </ScrollView>
        )}
      </Container>
    </StyleProvider>
  );
};

export default MyCards;
