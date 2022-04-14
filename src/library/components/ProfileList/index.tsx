import React from 'react';
import { Linking } from 'react-native';
import { List, ListItem, Icon, Switch, Text, View } from 'native-base';
import R from 'res/R';

import LoadingIndicator from 'library/components/LoadingIndicator';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Profile from 'models/Profile';
import Team from 'models/Team';

type Props = {
  profile: Profile;
  teams: Team[];
  signOut: () => void;
};
const ProfileList = ({ profile, teams, signOut }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const help = async () => {
    const url = 'https://help.xpens.io/en/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const changePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const notificationsSettings = () => {
    navigation.navigate({
      key: 'NotificationsSettings',
      routeName: 'NotificationsSettings',
    });
  };

  const identificationSettings = () => {
    navigation.navigate({
      key: 'Identification',
      routeName: 'Identification',
      params: profile,
    });
  };

  const editProfile = () => {
    navigation.navigate('EditProfile', { profile });
  };

  const onItemClick = team => {
    navigation.navigate({
      key: 'Team',
      routeName: 'Team',
      params: { team },
    });
  };

  return (
    <>
      <List style={styles.list}>
        <ListItem itemDivider style={styles.listItemDivider}>
          <Text uppercase style={styles.listItemDividerTxt}>
            {t('teams')}
          </Text>
        </ListItem>
        {teams.map(team => (
          <ListItem
            style={styles.listItem}
            onPress={() => onItemClick(team)}
            disabled
            key={team.id}>
            <Text style={styles.listTxt}>{team.name}</Text>
            <View style={styles.listItemRight}>
              <Text
                style={[
                  styles.listItemRightTxt,
                  {
                    marginRight: 20,
                  },
                ]}>
                {t('memberCount', { count: team.memberCount })}
              </Text>
              <Icon name="arrow-forward" style={styles.icon} />
            </View>
          </ListItem>
        ))}
      </List>
      <List style={styles.list}>
        <ListItem itemDivider style={styles.listItemDivider}>
          <Text uppercase style={styles.listItemDividerTxt}>
            {t('account')}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Text style={styles.listTxt}>{t('profileVerification')}</Text>
          <Text
            style={[
              styles.listItemRightTxt,
              { color: profile.verificationStatusColor() },
            ]}>
            {profile.formatVerificationStatus()}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem} onPress={editProfile}>
          <Text style={styles.listTxt}>{t('personalDetails')}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        <ListItem
          style={styles.listItem}
          onPress={identificationSettings}
          disabled>
          <Text style={styles.listTxt}>{t('identification')}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
      </List>
      <List style={styles.list}>
        <ListItem itemDivider style={styles.listItemDivider}>
          <Text uppercase style={styles.listItemDividerTxt}>
            {t('settings')}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem} button onPress={help}>
          <Text style={styles.listTxt}>{t('help')}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        {/*
            <ListItem style={styles.listItem} button onPress={notificationsSettings}>
              <Text style={styles.listTxt}>{t('notifications')}</Text>
              <Icon name="arrow-forward" style={styles.icon} />
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.listTxt}>{t('fingerprintActivation')}</Text>
              <Switch value={false} disabled />
            </ListItem>
          */}
        <ListItem style={styles.listItem} button onPress={changePassword}>
          <Text style={styles.listTxt}>{t('changePassword')}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        <ListItem style={styles.listItem} button onPress={signOut}>
          <Text style={styles.listTxt}>{t('signOut')}</Text>
        </ListItem>
      </List>
    </>
  );
};

export default ProfileList;
