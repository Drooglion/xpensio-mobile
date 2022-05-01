import React from 'react';
import {
  Button,
  Icon,
  View
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

const PhotoIdRemovable = ({ onRemove, source }) => (
  <View style={{ position: 'relative' }}>
    <Animatable.Image
      useNativeDriver
      animation="fadeIn"
      source={source}
      style={styles.image}
    />
    <Button
      onPress={onRemove}
      rounded
      light
      style={styles.photoIdRemove}
    >
      <Icon name="close" />
    </Button>
  </View>
);

export default PhotoIdRemovable;
