/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Button, Text, View } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';

import PAYMENTS from 'library/api/Payments';
import TEAMS from 'library/api/Teams';

import R from 'res/R';
import FilterControl from 'library/components/FilterControl';
import FilterBottomSheet from 'library/components/FilterBottomSheet';
import ListLoader from 'library/components/ListLoader';
import PaymentsList from 'library/components/PaymentsList';
import HelperUtils from 'library/utils/HelperUtils';

import styles from './styles';

const TeamPayments = ({ onItemClick }) => {
  let page = 1;
  const [teamIndex, setTeamIndex] = useState(0);
  const [filterTeam, setFilterTeam] = useState(teamIndex);
  const [showFilter, setShowFilter] = useState(false);

  const dismissFilter = () => {
    setShowFilter(false);
    setFilterTeam(teamIndex);
  };

  const applyFilter = () => {
    /* Set team & page values */
    setTeamIndex(filterTeam);
    page = 1;

    setShowFilter(false);
  };

  const filterContent = filters => (
    <View>
      <Text style={{ ...R.theme.caption1 }}>Teams</Text>
      <FlatGrid
        showsVerticalScrollIndicator={false}
        itemDimension={100}
        fixed={false}
        spacing={8}
        items={filters}
        renderItem={({ item, index }) => (
          <Button
            style={filterTeam === index ? styles.activeFilterContentBtn : styles.filterContentBtn}
            key={index}
            rounded
            bordered={filterTeam !== index}
            onPress={() => setFilterTeam(index)}
          >
            <Text
              style={filterTeam === index
                ? styles.activeFilterContentText : styles.filterContentText}
              allowFontScaling={false}
            >
              {item.name}
            </Text>
          </Button>
        )}
      />
    </View>
  );

  return (
    <Query
      query={TEAMS.TEAM_LIST}
      fetchPolicy="network-only"
    >
      {({ error: errorTeam, loading: loadingTeam, data: teamData }) => {
        if (errorTeam) {
          HelperUtils.bugsnag.notify(errorTeam);
          return null;
        }

        if (loadingTeam) return <ListLoader style={styles.listLoader} />;
        const { teams: { payload: teams } } = teamData;

        return (
          <Query
            query={PAYMENTS.TEAM_PAYMENTS}
            variables={{ page, teamId: teams[teamIndex].id }}
            fetchPolicy="network-only"
          >
            {({
              error,
              loading,
              data,
              fetchMore,
              refetch,
            }) => {
              if (error) {
                HelperUtils.bugsnag.notify(error);
                return null;
              }

              if (loading) return <ListLoader style={styles.listLoader} />;

              const { teamPayments: { payload: { result } } } = data;
              const activeFilters = [
                {
                  name: teams[teamIndex].name,
                  required: true,
                  onPress: () => setShowFilter(true)
                }
              ];

              return (
                <Fragment>
                  <FilterBottomSheet
                    sheetHeight={0.35}
                    onFilterPress={applyFilter}
                    isVisible={showFilter}
                    onClose={dismissFilter}
                  >
                    { filterContent(teams) }
                  </FilterBottomSheet>
                  <FilterControl
                    onPress={() => setShowFilter(true)}
                    activeFilters={activeFilters}
                  />
                  <PaymentsList
                    data={result}
                    refetch={refetch}
                    loading={false}
                    isRefreshing={false}
                    onRefresh={() => { refetch(); page = 1; }}
                    onItemClick={onItemClick}
                    loadMore={() => {
                      page += 1;
                      fetchMore({
                        variables: { page },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            teamPayments: {
                              ...prev.teamPayments,
                              payload: {
                                ...prev.teamPayments.payload,
                                result: [
                                  ...prev.teamPayments.payload.result,
                                  ...fetchMoreResult.teamPayments.payload.result
                                ]
                              }
                            }
                          });
                        }
                      });
                    }}
                  />
                </Fragment>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

TeamPayments.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default TeamPayments;
