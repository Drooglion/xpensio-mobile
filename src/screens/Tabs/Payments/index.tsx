import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  Button,
  ListItem,
  Text,
  Icon,
} from 'native-base';
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import Header from 'library/components/Header';
import BalanceHeader from 'library/components/BalanceHeader';
import MyPayments from 'library/components/MyPayments';
import TeamPayments from 'library/components/TeamPayments';
import TabSelection from 'library/components/TabSelection';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

// import StringUtils from 'library/utils/StringUtils';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { useResource } from 'contexts/resourceContext';
import useFetchMyPayments from 'hooks/api/private/payments/useFetchMyPayments';
import { IPayment } from 'types/Payment';
import ListLoader from 'library/components/ListLoader';
import useGetWalletBalance from 'hooks/api/private/account/useGetWalletBalance';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import useFetchTeamPayments from 'hooks/api/private/payments/useFetchTeamPayments';
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';
import useGetTeams from 'hooks/api/private/profile/useGetTeams';
import { ITeam, TeamRole } from 'types/Team';
import FilterBottomSheet from 'library/components/FilterBottomSheet';

const Payments = () => {
  const tab = useRef<any>(null);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [teamPayments, setTeamPayments] = useState<IPayment[]>([]);
  const { data: account, isLoading: accountLoading } = useFetchAccount({});
  const { data: teams, isLoading: teamsLoading } = useGetTeams();
  const { isLoading: paymentsLoading } = useFetchMyPayments({
    onSuccess: data => setPayments(data.items),
  });
  /* const { isLoading: teamPaymentsLoading } = useFetchTeamPayments({
    onSuccess: data => setTeamPayments(data.items),
  }); */
  const { mutate: fetchTeamPayments, isLoading: teamPaymentsLoading } =
    useFetchTeamPayments();
  const [userId, setUserId] = useState<string>();
  const [teamsDropdown, setTeamsDropdown] = useState<ITeam[]>([]);
  const [teamId, setTeamId] = useState<string>();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const { data: balance, isLoading: loading } = useGetWalletBalance(userId);
  const { state } = useResource();
  const { actAsAdmin } = state;

  const tabs = !actAsAdmin ? [t('myPayments')] : [t('myPayments'), t('team')];

  const fetchPayments = useCallback(
    async (id?: string) => {
      await fetchTeamPayments(
        { id },
        {
          onSuccess(data) {
            setTeamPayments(data);
          },
        },
      );
    },
    [fetchTeamPayments],
  );

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('USER_ID');
      if (id) {
        setUserId(id);
      }
    };
    fetchPayments();

    getUserId();
  }, [fetchPayments]);

  useEffect(() => {
    if (account && teams) {
      console.log({ account });
      if (account.role === 1) {
        let items: ITeam[] = [];
        items.push({ id: 'all', name: 'All' });
        teams
          .sort((a, b) => a.name.localeCompare(b.name))
          .forEach(i => {
            items.push({ id: i.id, name: i.name });
          });
        /* items.concat(
          teams
            .map(i => {
              return { id: i.id, name: i.name };
            })
            .sort((a, b) => a.name.localeCompare(b.name)),
        ); */
        console.log({ items });
        setTeamsDropdown(items);
      } else {
        setTeamsDropdown(
          teams
            .map(i => {
              return { id: i.id, name: i.name };
            })
            .sort((a, b) => a.name.localeCompare(b.name)),
        );
      }
    }
  }, [account, teams]);

  useEffect(() => {
    if (teamsDropdown.length > 0) {
      if (teamId) {
        const selected = teamsDropdown.filter(i => i.id === teamId);
        if (selected[0]) {
          setSelectedTeam(selected[0]);
        } else {
          setSelectedTeam(teamsDropdown[0]);
        }
      } else {
        setSelectedTeam(teamsDropdown[0]);
      }
    }
  }, [teamsDropdown, teamId]);

  useEffect(() => {
    if (!teamId) {
      fetchPayments();
    } else if (teamId === 'all') {
      fetchPayments();
    } else {
      fetchPayments(teamId);
    }
  }, [teamId, fetchPayments]);

  const goToTabPage = (page: any) => {
    console.log('page', page);
    if (tab.current) {
      tab.current.goToPage(page);
    }
  };

  const dismissFilter = () => {
    setShowFilter(false);
  };

  const applyFilter = () => {
    if (selectedTeam) {
      setTeamId(selectedTeam.id);
    }
    setShowFilter(false);
  };

  const onTeamPress = (team: ITeam) => {
    console.log('selected', team);
    setSelectedTeam(team);
  };

  const filterContent = (value: ITeam[]) => (
    <FlatList
      data={value}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem
          key={item.id}
          style={styles.option}
          button
          onPress={() => onTeamPress(item)}>
          <Text
            style={
              selectedTeam
                ? selectedTeam.id === item.id
                  ? styles.selectedOptionText
                  : styles.optionText
                : styles.optionText
            }>
            {item.name}
          </Text>
        </ListItem>
      )}
    />
  );

  const onMyPaymentPress = (item, refetch) => {
    //     handleOnPress({ item, refetch, paymentTab: 'myPayment' });
  };

  const onTeamPaymentPress = (item, refetch) => {
    //       handleOnPress({ item, refetch, paymentTab: 'teamPayment' });
  };

  //   const snapCallback = params => {
  //     navigation.pop();
  //     navigation.navigate('PaymentsDetails', params);
  //   };

  const handleOnPress = ({ item, paymentTab }) => {
    if (StringUtils.paymentStatus(item.status) === 'APPROVED') {
      if (isEmpty(item.attachments)) {
        navigation.navigate({
          routeName: 'Camera',
          key: 'Camera',
          params: {
            item,
            callback: () => snapCallback({ item }),
          },
        });
      } else {
        navigation.navigate({
          routeName: 'PaymentsDetails',
          key: 'PaymentsDetails',
          params: {
            id: item.id,
            paymentTab,
          },
        });
      }
    } else {
      navigation.navigate({
        routeName: 'PaymentsDetails',
        key: 'PaymentsDetails',
        params: {
          id: item.id,
          paymentTab,
        },
      });
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        {/* <Header
          title={
            balanceError
              ? t('notAvailable')
              : balance
              ? NumberUtils.formatCurrency(balance.currency, balance.value)
              : t('loading')
          }
          subtitle={t('availableFunds')}
        /> */}
        <BalanceHeader
          balance={balance}
          loading={loading}
          androidStatusBarColor={R.colors.white}
        />

        <SafeAreaView style={styles.tabsContainer}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={tab}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              {paymentsLoading ? (
                <ListLoader style={styles.listLoader} />
              ) : (
                <MyPayments data={payments} />
              )}
            </Tab>
            {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                <FilterBottomSheet
                  title={t('teams')}
                  btnText={t('close')}
                  sheetHeight={0.35}
                  onFilterPress={applyFilter}
                  isVisible={showFilter}
                  onClose={dismissFilter}>
                  {filterContent(teamsDropdown)}
                </FilterBottomSheet>
                <Button
                  bordered
                  rounded
                  iconRight
                  onPress={() => setShowFilter(true)}
                  style={styles.activeFilterContentBtn}>
                  <Text
                    style={styles.activeFilterContentText}
                    allowFontScaling={false}>
                    {selectedTeam ? selectedTeam.name : 'Team'}
                  </Text>
                  <Icon style={styles.iconFilter} name="chevron-down" />
                </Button>
                {accountLoading || teamsLoading || teamPaymentsLoading ? (
                  <ListLoader style={styles.listLoader} />
                ) : (
                  <TeamPayments data={teamPayments} />
                )}
              </Tab>
            )}
          </Tabs>
        </SafeAreaView>
      </Container>
    </StyleProvider>
  );
};

export default Payments;
