import React from 'react';
import { Button, Text, Thumbnail, View } from 'native-base';

import R from 'res/R';
import styles from './styles';

export interface EmptyCardProps {
  title: string;
  btnText: string;
  description: string;
  disabled: boolean;
  onPress(): void;
}

const EmptyCard = ({
  btnText,
  description,
  disabled,
  onPress,
  title,
}: EmptyCardProps) => (
  <View style={styles.infoContainer}>
    <View style={styles.imgContainer}>
      <Thumbnail
        square
        source={R.images.ic_empty_virtual}
        resizeMode="contain"
        //@ts-ignore
        style={styles.img}
      />
    </View>
    <View style={styles.txtContainer}>
      <Text style={styles.txtTitle}>{title}</Text>
      <Text style={styles.txtDesc}>{description}</Text>
    </View>
    <View style={styles.btnContainer}>
      <Button
        disabled={disabled}
        primary={!disabled}
        style={styles.btnAction}
        onPress={onPress}>
        <Text style={styles.btnText}>{btnText}</Text>
      </Button>
    </View>
  </View>
);

export default EmptyCard;
