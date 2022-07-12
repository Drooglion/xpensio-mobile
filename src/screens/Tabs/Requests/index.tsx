import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
  ListItem,
  Text,
  Button,
  Icon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Header from 'library/components/Header';

import MyRequests from 'library/components/MyRequests';
import TeamRequests from 'library/components/TeamRequests';
import TabSelection from 'library/components/TabSelection';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { IRequest } from 'types/Request';
import useGetMyRequests from 'hooks/api/private/requests/useGetMyRequests';
import { useResource } from 'contexts/resourceContext';
import ListLoader from 'library/components/ListLoader';
import LoadingModal from 'library/components/LoadingModal';
import DialogModal from 'library/components/DialogModal';
import DenyModal from 'library/components/DenyModal';
import useApi from 'hooks/useApi';
import useFetchTeamRequests from 'hooks/api/private/requests/useFetchTeamRequests';
import useGetTeams from 'hooks/api/private/profile/useGetTeams';
import { ITeam } from 'types/Team';
import { FlatList } from 'react-native';
import FilterBottomSheet from 'library/components/FilterBottomSheet';

const Requests = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const tab = useRef<any>(null);
  const { state } = useResource();
  const {
    data: myRequests,
    refresh: refetchMyRequests,
    loading: myRequestsLoading,
  } = useGetMyRequests();
  const { data: teams, isLoading: teamsLoading } = useGetTeams();
  const { mutate: fetchTeamRequests, isLoading: teamRequestsLoading } =
    useFetchTeamRequests();
  const { api } = useApi();

  const { actAsAdmin } = state;
  const tabs = !actAsAdmin ? [t('myRequests')] : [t('myRequests'), t('team')];
  const [teamsDropdown, setTeamsDropdown] = useState<ITeam[]>([]);
  const [teamId, setTeamId] = useState<string>();
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const [teamRequests, setTeamRequests] = useState<IRequest[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [denyModalVisible, setDenyModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [reason, setReason] = useState('');
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogIcon, setDialogIcon] = useState<
    'success' | 'congratulations' | 'email' | 'error' | undefined
  >();
  const [dialogDesc, setDialogDesc] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchRequests = useCallback(
    async (id: string) => {
      await fetchTeamRequests(
        { id },
        {
          onSuccess(data) {
            setTeamRequests(data);
          },
        },
      );
    },
    [fetchTeamRequests],
  );

  const refetchTeamRequests = useCallback(async () => {
    if (teamId) {
      await fetchTeamRequests(
        { id: teamId },
        {
          onSuccess(data) {
            setTeamRequests(data);
          },
        },
      );
    }
  }, [fetchTeamRequests, teamId]);

  useEffect(() => {
    if (actAsAdmin && teams) {
      const options = teams
        .map(i => {
          return { id: i.id, name: i.name };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setTeamsDropdown(options);
      if (options.length > 0) {
        setTeamId(options[0].id);
      }
    }
  }, [actAsAdmin, teams]);

  useEffect(() => {
    if (teamId) {
      fetchRequests(teamId);
    }

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
  }, [teamId, teamsDropdown, fetchRequests]);

  const goToTabPage = (page: any) => {
    console.log('page', page);
    if (tab.current) {
      tab.current.goToPage(page);
      setCurrentPage(1);
    }
  };

  const onItemClick = (item: IRequest) => {
    navigation.navigate({
      name: 'RequestDetails' as never,
      key: 'RequestDetails',
      params: {
        id: item.id,
      } as never,
    });
  };

  const loadMoreHandler = () => {
    const nextPage = currentPage + 1;
    //loadMore({ page: nextPage });
    setCurrentPage(nextPage);
  };

  const approveRequestHandler = async (id: string) => {
    try {
      setLoadingModalVisible(true);
      await api.put(`requests/${id}/approve`);
      await refetchMyRequests();
      await refetchTeamRequests();

      setDialogTitle(t('success'));
      setDialogIcon('success');
      setDialogDesc(t('requestHasBeenApproved'));
      setLoadingModalVisible(false);
      setTimeout(() => {
        setDialogVisible(true);
      }, 500);
    } catch (err: any) {
      let errorDescription = '';

      if (err.networkError && err.networkError.result) {
        [errorDescription] = err.networkError.result.payload.messages;
      } else {
        errorDescription = err.message;
      }
      setDialogTitle(t('unableToApprove'));
      setDialogIcon(undefined);
      setDialogDesc(errorDescription);
      setLoadingModalVisible(false);
      setTimeout(() => {
        setDialogVisible(true);
      }, 500);
    }
  };

  const denyRequestHandler = async () => {
    if (selectedRequestId && reason) {
      setDenyModalVisible(false);
      try {
        setLoadingModalVisible(true);
        await api.put(`requests/${selectedRequestId}/deny`, { reason });
        await refetchMyRequests();
        await refetchTeamRequests();

        setDialogTitle(t('success'));
        setDialogIcon('success');
        setDialogDesc(t('requestHasBeenDenied'));
        setLoadingModalVisible(false);
        setTimeout(() => {
          setDialogVisible(true);
        }, 500);
      } catch (err: any) {
        let errorDescription = '';

        if (err.networkError && err.networkError.result) {
          [errorDescription] = err.networkError.result.payload.messages;
        } else {
          errorDescription = err.message;
        }
        setDialogTitle(t('unableToDeny'));
        setDialogIcon(undefined);
        setDialogDesc(errorDescription);
        setLoadingModalVisible(false);
        setTimeout(() => {
          setDialogVisible(true);
        }, 500);
      }
    }
  };

  const toggleDenyModal = (id: string) => {
    setSelectedRequestId(id);
    setReason('');
    setDenyModalVisible(!denyModalVisible);
  };

  const closeDenyModal = () => {
    setDenyModalVisible(false);
  };

  const closeDialogHandler = () => {
    setDialogVisible(false);
  };

  const onTeamPress = (team: ITeam) => {
    console.log('selected', team);
    setSelectedTeam(team);
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

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={t('requests')} />
        <View style={styles.tabsContainer}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={tab}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              {myRequestsLoading ? (
                <ListLoader style={styles.listLoader} />
              ) : (
                <MyRequests
                  data={myRequests}
                  onRefresh={refetchMyRequests}
                  onItemClick={onItemClick}
                />
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
                {teamsLoading || teamRequestsLoading ? (
                  <ListLoader style={styles.listLoader} />
                ) : (
                  <TeamRequests
                    data={teamRequests}
                    onRefresh={refetchTeamRequests}
                    onItemClick={onItemClick}
                    onApproveRequest={approveRequestHandler}
                    onDenyRequest={toggleDenyModal}
                  />
                )}
              </Tab>
            )}
          </Tabs>
        </View>
        <LoadingModal
          visible={loadingModalVisible}
          onDismiss={() => setLoadingModalVisible(false)}
        />
        <DialogModal
          visible={dialogVisible}
          title={dialogTitle}
          icon={dialogIcon}
          description={dialogDesc}
          onClose={closeDialogHandler}
        />
        {actAsAdmin && (
          <DenyModal
            visible={denyModalVisible}
            loading={loadingModalVisible}
            reason={reason}
            onReasonChanged={setReason}
            onCancel={closeDenyModal}
            onSubmit={denyRequestHandler}
          />
        )}
      </Container>
    </StyleProvider>
  );
};

export default Requests;
