/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button, Icon, View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  onRemove(): void;
};

const PhotoIdRemovable = ({ onRemove, source }: Props) => (
  <View style={{ position: 'relative' }}>
    <Animatable.Image
      useNativeDriver
      animation="fadeIn"
      source={source}
      style={styles.image}
    />
    <Button onPress={onRemove} rounded light style={styles.photoIdRemove}>
      <Icon name="close" />
    </Button>
  </View>
);

export default PhotoIdRemovable;
