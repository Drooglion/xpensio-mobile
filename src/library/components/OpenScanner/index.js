/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  Thumbnail,
  View
} from 'native-base';
import R from 'res/R';
import styles from './styles';

const OpenScanner = ({ onPress }) => (
  <View style={styles.infoContainer}>
    <View style={styles.imgContainer}>
      <Thumbnail
        square
        source={R.images.ic_scan_card}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
    <View style={styles.txtContainer}>
      <Text style={styles.txtTitle}>
        {R.strings.scannerTitle}
      </Text>
      <Text style={styles.txtDesc}>
        {R.strings.scannerDesc}
      </Text>
    </View>
    <View style={styles.btnContainer}>
      <Button
        primary
        solid
        style={styles.btnAction}
        onPress={onPress}
      >
        <Text>{R.strings.openScanner}</Text>
      </Button>
    </View>
  </View>
);

export default OpenScanner;

OpenScanner.propTypes = {
  onPress: PropTypes.func.isRequired
};
