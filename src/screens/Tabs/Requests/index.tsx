import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
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

const Requests = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const tab = useRef<any>(null);
  const { state } = useResource();
  const { data, refresh, loading } = useGetMyRequests();
  const { api } = useApi();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [tabs, setTabs] = useState<string[]>([t('myRequests')]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [denyModalVisible, setDenyModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [reason, setReason] = useState('');
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogIcon, setDialogIcon] = useState<string>();
  const [dialogDesc, setDialogDesc] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (state) {
      if (state.user) {
        setIsAdmin(state.user.isAdmin());
      }
    }
  }, [state]);

  useEffect(() => {
    if (data) {
      console.log('requests', data.items);
      setRequests(data.items);
    }
  }, [data]);

  useEffect(() => {
    if (isAdmin) {
      setTabs([t('myRequests'), t('team')]);
    }
  }, [isAdmin, t]);

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
      await refresh();

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
      try {
        setLoadingModalVisible(true);
        await api.put(`requests/${selectedRequestId}/deny`, { reason });
        await refresh();

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
    setDenyModalVisible(!denyModalVisible);
  };

  const closeDenyModal = () => {
    setDenyModalVisible(false);
  };

  const closeDialogHandler = () => {
    setDialogVisible(false);
  };

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
              {loading ? (
                <ListLoader style={styles.listLoader} />
              ) : (
                <MyRequests
                  data={requests}
                  onRefresh={refresh}
                  onLoadMore={loadMoreHandler}
                  onItemClick={onItemClick}
                />
              )}
            </Tab>
            {isAdmin && (
              <Tab heading={<TabHeading />}>
                {loading ? (
                  <ListLoader style={styles.listLoader} />
                ) : (
                  <TeamRequests
                    data={requests}
                    onRefresh={refresh}
                    onLoadMore={loadMoreHandler}
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
        {isAdmin && (
          <DenyModal
            visible={denyModalVisible}
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
