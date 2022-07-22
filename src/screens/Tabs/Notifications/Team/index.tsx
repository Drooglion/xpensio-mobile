import React, { useEffect, useCallback, useState } from 'react';
import { Container, Content, StyleProvider } from 'native-base';
import { useTranslation } from 'react-i18next';

import TEAMS from 'library/api/Teams';
import R from 'res/R';

import EmptyList from 'library/components/EmptyList';
import MembersList from 'library/components/MembersList';
import ListLoader from 'library/components/ListLoader';
import Header from 'library/components/Header';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import useGetTeamMembers from 'hooks/api/private/profile/useGetTeamMembers';
import TeamMember from 'models/TeamMember';
import { SafeAreaView } from 'react-native';

const Team = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { team } = route.params as any;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const { mutate: fetchTeamMembers, isLoading: loading } = useGetTeamMembers();

  const fetchMembers = useCallback(
    async (id: string) => {
      await fetchTeamMembers(
        { id },
        {
          onSuccess(data) {
            setTeamMembers(data);
          },
        },
      );
    },
    [fetchTeamMembers],
  );

  useEffect(() => {
    if (team) {
      fetchMembers(team.id);
    }
  }, [team, fetchMembers]);

  onItemClick = () => {
    // const { navigation } = this.props;
    // navigation.navigate({
    //   routeName: 'Member',
    //   key: 'Member',
    //   params: item,
    // });
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={team.name}
          onBackPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.content}>
          {loading ? (
            <ListLoader />
          ) : teamMembers.length > 0 ? (
            <MembersList data={teamMembers} />
          ) : (
            <EmptyList image={R.images.empty_teams} text={t('noTeamMembers')} />
          )}

          {/* <EmptyList image={R.images.empty_teams} text={t('noTeams')} /> */}
          {/* <Query query={TEAMS.TEAM_MEMBERS} variables={{ id: team.id }}>
            {({ error, loading, data }) => {
              if (error) return null;
              if (loading) return <ListLoader />;

              const {
                teams: {
                  payload: { result: payload },
                },
              } = data;

              return isEmpty(payload) ? (
                <EmptyList
                  image={R.images.empty_teams}
                  text={R.strings.noTeams}
                />
              ) : (
                <MembersList
                  data={payload}
                  teamId={team.id}
                  onItemClick={this.onItemClick}
                />
              );
            }}
          </Query> */}
        </SafeAreaView>
      </Container>
    </StyleProvider>
  );
};

export default Team;
