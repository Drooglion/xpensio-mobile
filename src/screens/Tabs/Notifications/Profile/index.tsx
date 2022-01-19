import React, { useState } from 'react';
import { PixelRatio, RefreshControl } from 'react-native';
import { Container, Content, StyleProvider, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import User from 'models/User';
import Team from 'models/Team';
import Header from 'library/components/Header';
import Loading from 'library/components/Loading';
import SignOutModal from 'library/components/SignOutModal';
import ProfileAnalytics from 'library/components/ProfileAnalytics';
import ProfileImg from 'library/components/ProfileImg';
import ProfileList from 'library/components/ProfileList';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';
import { useAuth } from 'library/contexts/authContext';

/* Dummy data*/
const profile: User = new User({
  id: '1123123123',
  firstName: 'Moses',
  lastName: 'Lucas',
  email: 'moses@xpens.io',
  photoUrl: null,
  status: 'verified',
});

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
  const role = null;
  const navigation = useNavigation();
  const [showSignOut, setShowSignOut] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string>>({});
  const { signOut } = useAuth();

  const refetchProfile = () => {};

  const onSignOut = () => {
    setShowSignOut(false);
    navigation.navigate('Payments');
    signOut();
    // AuthUtils.signOut(navigation, client);
  };

  if (loading) {
    return <Loading />;
  }

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
              user={profile}
              size={PixelRatio.get() < 3 ? 100 : 110}
              showUploadBtn
            />
            <View style={styles.namePosition}>
              <Text style={styles.name}>{profile.fullName()}</Text>
              <Text style={styles.position}>
                {/* capitalize(StringUtils.roles(role)) */}
                {profile.email}
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
