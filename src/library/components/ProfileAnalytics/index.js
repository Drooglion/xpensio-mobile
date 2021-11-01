/* eslint-disable import/no-unresolved */
import React from 'react';
import { Text, View } from 'native-base';
import { Query } from 'react-apollo';
import numeral from 'numeral';
import moment from 'moment';

import R from 'res/R';
import PROFILE from 'library/api/Profile';
import ACCOUNT from 'library/api/Account';
import HelperUtils from 'library/utils/HelperUtils';
import styles from './styles';

const ProfileAnalytics = () => (
  <Query query={ACCOUNT.MY_ACCOUNT}>
    {({ loading, error, data: { account } }) => {
      if (loading) return null;
      if (error) {
        HelperUtils.bugsnag.notify(error);
        return null;
      }
      const { payload: { company } } = account;
      const dateFrom = moment(company.createdAt).format('YYYY-MM-DD');
      const dateTo = moment().format('YYYY-MM-DD');
      return (
        <Query query={PROFILE.METRICS} variables={{ from: dateFrom, to: dateTo }}>
          {({ loading: loading2, error: error2, data: { analytics } }) => {
            if (loading2) return null;
            if (error2) {
              HelperUtils.bugsnag.notify(error2);
              return null;
            }
            const { payload } = analytics;
            return (
              <View style={styles.container}>
                <View style={styles.payments}>
                  <Text style={styles.value}>
                    {numeral(payload.payments).format('0,0')}
                  </Text>
                  <Text style={styles.title}>{R.strings.payments}</Text>
                </View>
                <View style={styles.receipts}>
                  <Text style={styles.value}>{`${payload.receiptsMatched}%`}</Text>
                  <Text style={styles.title}>{R.strings.hasReceipts}</Text>
                </View>
              </View>
            );
          }}
        </Query>
      );
    }}
  </Query>
);

export default ProfileAnalytics;
