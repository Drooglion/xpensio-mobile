/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  List,
  ListItem,
  Icon,
  Switch,
  Text,
  View,
} from 'native-base';
import R from 'res/R';

import TEAMS from 'library/api/Teams';
import LoadingIndicator from 'library/components/LoadingIndicator';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';

import styles from './styles';

const ProfileList = ({
  navigation,
  profile,
  signOut,
}) => {
  const help = async () => {
    const url = 'https://help.xpens.io/en/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('error: ', error);
      HelperUtils.bugsnag.notify(error);
    }
  };

  const changePassword = () => {
    navigation.navigate({
      key: 'ChangePassword',
      routeName: 'ChangePassword'
    });
  };

  const notificationsSettings = () => {
    navigation.navigate({
      key: 'NotificationsSettings',
      routeName: 'NotificationsSettings'
    });
  };

  const identificationSettings = () => {
    navigation.navigate({
      key: 'Identification',
      routeName: 'Identification',
      params: profile
    });
  };

  const editProfile = () => {
    navigation.navigate({
      key: 'EditProfile',
      routeName: 'EditProfile',
      params: profile
    });
  };

  const onItemClick = (team) => {
    navigation.navigate({
      key: 'Team',
      routeName: 'Team',
      params: { team }
    });
  };

  const memberCountLabel = memberCount => (
    memberCount !== 0
      ? `${memberCount} member${memberCount > 1 ? 's' : ''}`
      : null
  );

  const renderTeams = () => (
    <List style={styles.list}>
      <ListItem itemDivider style={styles.listItemDivider}>
        <Text uppercase style={styles.listItemDividerTxt}>{R.strings.teams}</Text>
      </ListItem>
      <Query query={TEAMS.TEAM_LIST} fetchPolicy="network-only">
        {({ error, loading, data }) => {
          if (error) {
            HelperUtils.bugsnag.notify(error);
            return null;
          }
          if (loading) {
            return (
              <ListItem style={[styles.listItem, styles.center]}>
                <LoadingIndicator size={5} />
              </ListItem>
            );
          }

          const { teams: { payload } } = data;

          return payload.map(team => (
            <ListItem
              style={styles.listItem}
              onPress={() => onItemClick(team)}
              key={team.id}
            >
              <Text style={styles.listTxt}>{team.name}</Text>
              <View style={styles.listItemRight}>
                <Text
                  style={[styles.listItemRightTxt, {
                    marginRight: 20
                  }]}
                >
                  { memberCountLabel(team.memberCount) }
                </Text>
                <Icon name="arrow-forward" style={styles.icon} />
              </View>
            </ListItem>
          ));
        }}
      </Query>
    </List>
  );

  return (
    <Fragment>
      { renderTeams() }
      <List style={styles.list}>
        <ListItem itemDivider style={styles.listItemDivider}>
          <Text uppercase style={styles.listItemDividerTxt}>{R.strings.account}</Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Text style={styles.listTxt}>{R.strings.profileVerification}</Text>
          <Text
            style={[
              styles.listItemRightTxt,
              { color: HelperUtils.verificationStatusColor(profile.profile.verificationStatus) }
            ]}
          >
            {StringUtils.formatVerificationStatus(profile.profile.verificationStatus)}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem} onPress={editProfile}>
          <Text style={styles.listTxt}>{R.strings.personalDetails}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        <ListItem style={styles.listItem} onPress={identificationSettings}>
          <Text style={styles.listTxt}>{R.strings.identification}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
      </List>
      <List style={styles.list}>
        <ListItem itemDivider style={styles.listItemDivider}>
          <Text uppercase style={styles.listItemDividerTxt}>
            {R.strings.settings}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem} button onPress={help}>
          <Text style={styles.listTxt}>{R.strings.help}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        {
          /*
            <ListItem style={styles.listItem} button onPress={notificationsSettings}>
              <Text style={styles.listTxt}>{R.strings.notifications}</Text>
              <Icon name="arrow-forward" style={styles.icon} />
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.listTxt}>{R.strings.fingerprintActivation}</Text>
              <Switch value={false} disabled />
            </ListItem>
          */
        }
        <ListItem style={styles.listItem} button onPress={changePassword}>
          <Text style={styles.listTxt}>{R.strings.changePassword}</Text>
          <Icon name="arrow-forward" style={styles.icon} />
        </ListItem>
        <ListItem style={styles.listItem} button onPress={signOut}>
          <Text style={styles.listTxt}>{R.strings.signOut}</Text>
        </ListItem>
      </List>
    </Fragment>
  );
};

ProfileList.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  signOut: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object)
};

ProfileList.defaultProps = {
  profile: {}
};

export default ProfileList;
