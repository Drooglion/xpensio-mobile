import React from 'react';
import { Container, Content, StyleProvider } from 'native-base';
import { isEmpty } from 'lodash';
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
import { useNavigation } from '@react-navigation/native';

const Teams = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

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
        <Content contentContainerStyle={styles.content}>
          <Query query={TEAMS.TEAM_MEMBERS} variables={{ id: team.id }}>
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
          </Query>
        </Content>
      </Container>
    </StyleProvider>
  );
};

class Team extends PureComponent {
  render() {
    const { navigation } = this.props;
    const {
      state: {
        params: { team },
      },
    } = navigation;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Header
            hasBack
            title={team.name}
            onBackPress={() => navigation.goBack()}
          />
          <Content contentContainerStyle={styles.content}>
            <Query query={TEAMS.TEAM_MEMBERS} variables={{ id: team.id }}>
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
            </Query>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default Team;
