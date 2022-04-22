import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import _isEmpty from 'lodash/isEmpty';

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
import VirtualCards from 'library/components/VirtualCards';
import PlasticCards from 'library/components/PlasticCards';
import useGetMyCards from 'hooks/api/private/card/useGetMyCards';
import { ICard, ICardRequest, ICardUser } from 'types/Card';
import { IUserCompany } from 'types/User';

const MyCards = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const tab = useRef<any>(null);
  const tabs = [t('virtual'), t('plastic')];
  const {
    data,
    refetch,
    isRefetching,
    isLoading: loading,
    error,
  } = useGetMyCards({});
  const [user, setUser] = useState<ICardUser>();
  const [company, setCompany] = useState<IUserCompany>();
  const [virtualCards, setVirtualCards] = useState<ICard[]>([]);
  const [plasticCards, setPlasticCards] = useState<ICard[]>([]);
  const [pendingVirtualCardRequests, setPendingVirtualCardRequests] = useState<
    ICardRequest[]
  >([]);
  const [pendingPlasticCardRequests, setPendingPlasticCardRequests] = useState<
    ICardRequest[]
  >([]);

  useEffect(() => {
    if (data) {
      const { cards } = data;
      if (!_isEmpty(cards)) {
        setVirtualCards(data.getVirtualCards());
        setPlasticCards(data.getPhysicalCards());
        setPendingVirtualCardRequests(data.getPendingVirtualCards());
        setPendingPlasticCardRequests(data.getPendingPhysicalCards());
      }

      setUser(data.user);
      setCompany(data.company);
    }

    return () => {
      setVirtualCards([]);
      setPlasticCards([]);
      setPendingVirtualCardRequests([]);
      setPendingPlasticCardRequests([]);
    };
  }, [data]);

  const onItemClick = item => {};

  const goToTabPage = (page: any) => {
    console.log('page', page);
    if (tab.current) {
      tab.current.goToPage(page);
    }
  };

  const onRequestPlasticCard = () => {};

  const openScannerHandler = (card: ICard) => {
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
        ) : error ? (
          <View>
            <Text>{error}</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.tabsContainer}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }>
            <Tabs
              initialPage={0}
              ref={tab}
              locked
              tabContainerStyle={styles.tabContainer}
              tabBarUnderlineStyle={styles.tabUnderline}>
              <Tab heading={<TabHeading />}>
                {!_isEmpty(virtualCards) ? (
                  <VirtualCards
                    user={user}
                    company={company}
                    virtualCards={virtualCards}
                    hasPendingRequest={!_isEmpty(pendingVirtualCardRequests)}
                  />
                ) : (
                  <EmptyVirtualCard
                    isDisabled={!_isEmpty(pendingVirtualCardRequests)}
                    requested={!_isEmpty(pendingVirtualCardRequests)}
                  />
                )}
              </Tab>
              <Tab heading={<TabHeading />}>
                {!_isEmpty(plasticCards) ? (
                  <PlasticCards
                    user={user}
                    company={company}
                    plasticCards={plasticCards}
                    onOpenScanner={openScannerHandler}
                  />
                ) : (
                  <EmptyPlasticCard
                    disabled={!_isEmpty(pendingPlasticCardRequests)}
                    requested={!_isEmpty(pendingPlasticCardRequests)}
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
