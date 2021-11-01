/* eslint-disable import/no-unresolved */

import React from 'react';
import { graphql, compose } from 'react-apollo';
import STORE_QUERIES from 'library/store/queries';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import StringUtils from 'library/utils/StringUtils';
import styles from './VirtualCardStyles';
import R from '../../../res/R';
import * as Animatable from 'react-native-animatable';

const VirtualCard = ({ data, user, viewedCardNumber }) => {
  const cardNumber = viewedCardNumber.length === 16
    ? StringUtils.cardNumberShown(viewedCardNumber)
    : StringUtils.cardNumberHidden(data.last4);

  return (
    <View style={styles.cardContainer}>
      <Image
        source={R.images[data.status === 0 ? 'bg_virtual_card_disabled' : 'bg_virtual_card']}
        style={styles.img}
      />
      <View style={styles.cardDetails}>
        {
          viewedCardNumber.length === 16 ? (
            <Animatable.Text
              allowFontScaling={false}
              iterationCount={2}
              animation="pulse"
              delay={200}
              style={styles.cardNumber}
            >
              { cardNumber }
            </Animatable.Text>
          ) : (
            <Animatable.Text
              allowFontScaling={false}
              animation="fadeIn"
              style={styles.cardNumber}
            >
              { cardNumber }
            </Animatable.Text>
          )
        }
        <View style={styles.cardHolder}>
          <Text allowFontScaling={false} style={styles.cardTxtMute}>
            {R.strings.name}
          </Text>
          <View style={styles.cardName}>
            <Text allowFontScaling={false} style={styles.cardTxtName}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.cardTxtCompany}>
            {data.companyName}
          </Text>
        </View>
        <View style={styles.cardExp}>
          <Text allowFontScaling={false} style={styles.cardTxtMute}>
            {R.strings.validThru}
          </Text>
          <Text allowFontScaling={false} style={styles.cardTxtExp}>
            {`${data.expiryMonth < 10 ? 0 : ''}${data.expiryMonth}/${data.expiryYear}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

VirtualCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default compose(
  graphql(
    STORE_QUERIES.viewedCardNumber, {
      props: ({ data: { viewedCardNumber } }) => ({
        viewedCardNumber
      })
    }
  ),
)(VirtualCard);
