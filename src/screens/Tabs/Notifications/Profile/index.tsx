import React, { useState, useEffect } from 'react';
import { PixelRatio, RefreshControl } from 'react-native';
import { Container, Content, StyleProvider, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import User from 'models/User';
import Team from 'models/Team';
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
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';

/* Dummy data*/
const team1: Team = new Team({
  id: '12312312',
  name: 'Executives',
  memberCount: 3,
});
const team2: Team = new Team({
  id: '12312311',
  name: 'Marketing',
  memberCount: 10,
});

const teams: Team[] = [team1, team2];

const Profile = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const role = null;
  const navigation = useNavigation();
  const [showSignOut, setShowSignOut] = useState<boolean>(false);
  const { signOut } = useAuth();
  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetProfile();
  const {
    data: account,
    isLoading: accountLoading,
    refetch: refetchAccount,
  } = useFetchAccount();

  useEffect(() => {
    if (isFocused) {
      refetchAccount();
      refetchProfile();
      console.log('refetched!');
    }
  }, [isFocused, refetchAccount, refetchProfile]);

  const onSignOut = () => {
    setShowSignOut(false);
    navigation.navigate('Payments');
    signOut();
  };

  if (profileLoading || accountLoading || !profile) {
    return <Loading />;
  }

  const user = new User(account!.user);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          title={t('profile')}
          hasBack
          transparent
          backgroundColor={R.colors.transparent}
          onBackPress={() => navigation.goBack()}
        />

        <Content
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refetchProfile} />
          }>
          <SignOutModal
            isVisible={showSignOut}
            onSignOut={onSignOut}
            onCancel={() => setShowSignOut(false)}
          />
          <View>
            <ProfileImg
              user={user}
              size={PixelRatio.get() < 3 ? 100 : 110}
              showUploadBtn
            />
            <View style={styles.namePosition}>
              <Text style={styles.name}>{user.fullName()}</Text>
              <Text style={styles.position}>
                {/* capitalize(StringUtils.roles(role)) */}
                {user.email}
              </Text>
            </View>
          </View>
          <ProfileAnalytics amount={17} receiptsMatch={90} />
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
