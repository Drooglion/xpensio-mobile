import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './VirtualCardStyles';
import R from 'res/R';
import * as Animatable from 'react-native-animatable';
import StringUtils from 'library/utils/StringUtils';

export interface VirtualCardProps {
  last4: string;
  cardNumber?: string;
  expiryMonth: string;
  expiryYear: string;
  cardholder: string;
  status: number;
  company: string;
}

const VirtualCard = ({
  last4,
  cardNumber,
  expiryMonth,
  expiryYear,
  cardholder,
  status,
  company,
}: VirtualCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={
          R.images[
            status !== 1 ? 'bg_virtual_card_disabled' : 'bg_virtual_card'
          ]
        }
        //@ts-ignore
        style={styles.img}
      />
      <View style={styles.cardDetails}>
        {cardNumber ? (
          <Animatable.Text
            allowFontScaling={false}
            iterationCount={2}
            animation="pulse"
            delay={200}
            style={styles.cardNumber}>
            {StringUtils.cardNumberShown(cardNumber)}
          </Animatable.Text>
        ) : (
          <Animatable.Text
            allowFontScaling={false}
            animation="fadeIn"
            style={styles.cardNumber}>
            {StringUtils.cardNumberHidden(last4)}
          </Animatable.Text>
        )}
        <View style={styles.cardHolder}>
          <Text allowFontScaling={false} style={styles.cardTxtMute}>
            {R.strings.name}
          </Text>
          <View style={styles.cardName}>
            <Text allowFontScaling={false} style={styles.cardTxtName}>
              {cardholder}
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.cardTxtCompany}>
            {company}
          </Text>
        </View>
        <View style={styles.cardExp}>
          <Text allowFontScaling={false} style={styles.cardTxtMute}>
            {R.strings.validThru}
          </Text>
          <Text allowFontScaling={false} style={styles.cardTxtExp}>
            {`${expiryMonth.padStart(2, '0')}/${expiryYear}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VirtualCard;
