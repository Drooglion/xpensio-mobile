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

const EmptyCard = ({
  btnText,
  description,
  disabled,
  onPress,
  title,
}) => (
  <View style={styles.infoContainer}>
    <View style={styles.imgContainer}>
      <Thumbnail
        square
        source={R.images.ic_empty_virtual}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
    <View style={styles.txtContainer}>
      <Text style={styles.txtTitle}>
        {title}
      </Text>
      <Text style={styles.txtDesc}>
        {description}
      </Text>
    </View>
    <View style={styles.btnContainer}>
      <Button
        disabled={disabled}
        primary={!disabled}
        solid
        style={styles.btnAction}
        onPress={onPress}
      >
        <Text>
          {btnText}
        </Text>
      </Button>
    </View>
  </View>
);

EmptyCard.propTypes = {
  btnText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.instanceOf(Object),
};

EmptyCard.defaultProps = {
  disabled: false,
  title: '',
  description: '',
  onPress: () => {},
};

export default EmptyCard;
