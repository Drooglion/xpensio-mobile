import React, { Fragment, useEffect, useState } from 'react';
import { Container, Content, StyleProvider, View } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import EmptyList from 'library/components/EmptyList';
import Loading from 'library/components/Loading';
import Header from 'library/components/Header';
import DenyModal from 'library/components/DenyModal';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';

import DetailsTab from './DetailsTab';
import useGetRequestDetails from 'hooks/api/private/requests/useGetRequestDetails';
import { RequestNavigatorParamList } from '../Navigator';
import Request from 'models/Request';
import styles from './styles';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import DialogModal from 'library/components/DialogModal';
import LoadingModal from 'library/components/LoadingModal';

const RequestsDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<RequestNavigatorParamList, 'RequestDetails'>>();
  const { state } = useResource();
  const { fetch, request, loading } = useGetRequestDetails();
  const { api } = useApi();

  const [currency, setCurrency] = useState<string>('php');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [details, setDetails] = useState<Request>();
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [denyModalVisible, setDenyModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogIcon, setDialogIcon] = useState<string>();
  const [dialogDesc, setDialogDesc] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (route) {
      if (route.params) {
        const { id } = route.params;
        if (id) {
          fetch({ requestId: id });
        }
      }
    }
  }, [route, fetch]);

  useEffect(() => {
    if (state) {
      if (state.user) {
        setIsAdmin(state.user.isAdmin());
        setCurrency(state.user.companyConfiguration.currency);
      }
    }
  }, [state]);

  useEffect(() => {
    if (request) {
      setDetails(request);
    }
  }, [request]);

  const approveRequestHandler = async () => {
    if (details) {
      try {
        setLoadingModalVisible(true);
        const res = await api.put(`requests/${details.id}/approve`);
        setDetails(new Request(res.data.payload));

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
    }
  };

  const handleDenyRequest = async () => {
    if (details) {
      try {
        setLoadingModalVisible(true);
        const res = await api.put(`requests/${details.id}/deny`, { reason });
        setDetails(new Request(res.data.payload));

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

  const closeDialogHandler = () => {
    setDialogVisible(false);
  };

  const toggleDenyModal = () => {
    setDenyModalVisible(!denyModalVisible);
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        {loading ? (
          <Loading />
        ) : details ? (
          <Fragment>
            <Header
              title={t('requestDetails')}
              hasBack
              onBackPress={() => navigation.goBack()}
            />
            <Content
              contentContainerStyle={styles.tabsContainer}
              scrollEnabled={false}>
              <DetailsTab
                currency={currency}
                isAdmin={isAdmin}
                request={details}
                onApprove={approveRequestHandler}
                onDeny={toggleDenyModal}
              />
            </Content>
          </Fragment>
        ) : (
          <View>
            <Header hasBack onBackPress={() => navigation.goBack()} />
            <EmptyList
              image={R.images.empty_requests}
              text={t('requestUnavailable')}
            />
          </View>
        )}
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
            onCancel={toggleDenyModal}
            onSubmit={handleDenyRequest}
          />
        )}
      </Container>
    </StyleProvider>
  );
};

export default RequestsDetail;
