/* eslint-disable import/no-unresolved */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';

import StringUtils from 'library/utils/StringUtils';
import R from '../../../res/R';
import styles from './PlasticCardStyles';

const PlasticCard = ({ data, user }) => (
  <View style={styles.cardContainer}>
    <Image
      source={R.images[data.status === 0 ? 'bg_plastic_card_disabled' : 'bg_plastic_card']}
      style={styles.img}
    />
    <View style={styles.cardDetails}>
      <Text allowFontScaling={false} style={styles.cardNumber}>
        {StringUtils.cardNumberHidden(data.last4)}
      </Text>
      <View style={styles.cardHolder}>
        <View style={styles.cardName}>
          <Text allowFontScaling={false} style={styles.cardTxtName}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.cardTxtCompany}>
          {data.companyName}
        </Text>
      </View>
    </View>
  </View>
);

PlasticCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default PlasticCard;
