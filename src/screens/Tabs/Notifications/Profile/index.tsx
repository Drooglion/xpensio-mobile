import React, { useState, useEffect, useCallback } from 'react';
import { PixelRatio, RefreshControl } from 'react-native';
import _map from 'lodash/map';
import _compact from 'lodash/compact';

import { Container, Content, StyleProvider, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from 'library/components/Header';
import Loading from 'library/components/Loading';
import SignOutModal from 'library/components/SignOutModal';
import ProfileAnalytics from 'library/components/ProfileAnalytics';
import ProfileImg from 'library/components/ProfileImg';
import ProfileList from 'library/components/ProfileList';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';
import { useAuth } from 'contexts/authContext';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';
import useGetTeams from 'hooks/api/private/profile/useGetTeams';
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';
import useGetMyMetrics from 'hooks/api/private/analytics/useGetMyMetrics';
import Team from 'models/Team';

const Profile = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [showSignOut, setShowSignOut] = useState<boolean>(false);
  const { signOut } = useAuth();

  const {
    data: account,
    isLoading: accountIsLoading,
    refetch: refetchAccount,
  } = useFetchAccount({});

  const {
    data: metrics,
    isLoading: metricsLoading,
    refetch: refetchMetrics,
  } = useGetMyMetrics();

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetProfile();

  const {
    data: teams,
    isLoading: teamsLoading,
    refetch: refetchTeams,
  } = useGetTeams();

  const refetch = useCallback(() => {
    refetchProfile();
    refetchAccount();
    refetchMetrics();
    refetchProfile();
    refetchTeams();
  }, [refetchProfile, refetchAccount, refetchMetrics, refetchTeams]);

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused, refetch]);

  useEffect(() => {
    console.log({ teams });
  }, [teams]);

  const onSignOut = () => {
    setShowSignOut(false);
    navigation.navigate('Payments');
    signOut();
  };

  if (
    profileLoading ||
    !profile ||
    accountIsLoading ||
    !account ||
    metricsLoading ||
    !metrics ||
    teamsLoading
  ) {
    return <Loading />;
  }

  //const teams = _compact(_map(account.teams, 'team') || undefined);
  //console.log('teams', account.teams);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          title={t('profile')}
          hasBack
          onBackPress={() => navigation.goBack()}
        />

        <Content
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refetch} />
          }>
          <SignOutModal
            isVisible={showSignOut}
            onSignOut={onSignOut}
            onCancel={() => setShowSignOut(false)}
          />
          <View>
            <ProfileImg
              size={PixelRatio.get() < 3 ? 100 : 110}
              showUploadBtn
              user={account.user}
            />
            <View style={styles.namePosition}>
              <Text style={styles.name}>{profile.fullName()}</Text>
              <Text style={styles.position}>{profile.profile.email}</Text>
            </View>
          </View>
          <ProfileAnalytics
            amount={metrics.payments}
            receiptsMatch={
              isNaN((metrics.receiptsMatched / metrics.payments) * 100)
                ? 0
                : (metrics.receiptsMatched / metrics.payments) * 100
            }
          />
          <ProfileList
            teams={teams}
            signOut={() => setShowSignOut(true)}
            profile={profile}
          />
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default Profile;
