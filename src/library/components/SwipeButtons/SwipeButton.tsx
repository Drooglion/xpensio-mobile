import React from 'react';
import { Icon, Text, View } from 'native-base';
import styles from './SwipeButtonStyles';

type SwipeButtonProps = {
  icon: string;
  text: string;
};

const SwipeButton = ({ icon, text }: SwipeButtonProps) => (
  <View style={styles.swipeout}>
    <Icon name={icon} style={styles.swipeoutIcon} />
    <Text uppercase style={styles.swipeoutText}>
      {text}
    </Text>
  </View>
);

export default SwipeButton;
