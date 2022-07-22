import React from 'react';
import { Image, Text, View } from 'react-native';

import StringUtils from 'library/utils/StringUtils';
import R from '../../../res/R';
import styles from './PlasticCardStyles';

export interface PlasticCardProps {
  last4: string;
  cardholder: string;
  company: string;
  status: number;
}

const PlasticCard = ({
  last4,
  cardholder,
  company,
  status,
}: PlasticCardProps) => (
  <View style={styles.cardContainer}>
    <Image
      source={
        R.images[status === 0 ? 'bg_plastic_card_disabled' : 'bg_plastic_card']
      }
      style={styles.img}
    />
    {status !== -1 ? (
      <View style={styles.cardDetails}>
        <Text allowFontScaling={false} style={styles.cardNumber}>
          {StringUtils.cardNumberHidden(last4)}
        </Text>
        <View style={styles.cardHolder}>
          <View style={styles.cardName}>
            <Text allowFontScaling={false} style={styles.cardTxtName}>
              {cardholder}
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.cardTxtCompany}>
            {company}
          </Text>
        </View>
      </View>
    ) : null}
  </View>
);

export default PlasticCard;
