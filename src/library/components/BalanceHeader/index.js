/* eslint-disable import/no-unresolved */

import React, { Component } from 'react';
import { Query, compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Header as NBHeader,
  Body,
  Title,
  Right,
  Left,
  Text,
} from 'native-base';
import { Rect } from 'react-native-svg';

import STORE_QUERIES from 'library/store/queries';
import ACCOUNT from 'library/api/Account';
import ContentLoader from 'library/components/ContentLoader';
import NumberUtils from 'library/utils/NumberUtils';
import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';

import styles from './styles';

class BalanceHeader extends Component {
  renderBody = () => {
    const { user: { id } } = this.props;
    return (
      <Body style={styles.body}>
        {
          <Query
            query={ACCOUNT.GET_BALANCE}
            variables={{ id }}
            fetchPolicy="network-only"
          >
            {({
              error,
              loading,
              data
            }) => {
              if (error) {
                HelperUtils.bugsnag.notify(error);
                return null;
              }
              if (loading) {
                return (
                  <ContentLoader height={44} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="40" />
                  </ContentLoader>
                );
              }
              const { balance: { payload: { value, currency } } } = data;
              return (
                <Title
                  allowFontScaling={false}
                  style={styles.title}
                >
                  {NumberUtils.formatCurrency(currency, value)}
                </Title>
              );
            }}
          </Query>
        }
        <Text style={styles.subtitle}>{R.strings.purchaseLimit}</Text>
      </Body>
    );
  };


  render() {
    const { androidStatusBarColor } = this.props;

    return (
      <NBHeader
        noLeft
        hasTabs
        style={styles.header}
        iosBarStyle="dark-content"
        androidStatusBarColor={androidStatusBarColor}
      >
        <Left style={{ flex: 0 }} />
        { this.renderBody() }
        <Right style={{ flex: 0 }} />
      </NBHeader>
    );
  }
}

BalanceHeader.propTypes = {
  androidStatusBarColor: PropTypes.string,
};

BalanceHeader.defaultProps = {
  androidStatusBarColor: R.colors.white,
};

export default compose(
  graphql(STORE_QUERIES.user, {
    props: ({ data: { user } }) => ({
      user
    })
  }),
  graphql(STORE_QUERIES.companyConfiguration, {
    props: ({ data: { companyConfiguration } }) => ({
      companyConfiguration
    })
  }),
)(BalanceHeader);
