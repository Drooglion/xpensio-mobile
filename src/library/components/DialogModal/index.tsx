import React from 'react';
import { Button, Icon, Text, View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import R from 'res/R';
import styles from './styles';

type DialogModalProps = {
  visible: boolean;
  title: string;
  description: string;
  icon?: string;
  onClose(): void;
};

const DialogModal = ({
  visible,
  title,
  description,
  icon,
  onClose,
}: DialogModalProps) => {
  const { t } = useTranslation();
  const AnimIcon = Animatable.createAnimatableComponent(Icon);

  const renderIcon = () => {
    let iconStatus = null;
    const iconsFromAssets = ['congratulations', 'email'];
    if (icon) {
      if (iconsFromAssets.includes(icon)) {
        iconStatus = (
          <Animatable.Image
            animation="bounceIn"
            source={R.images[icon]}
            style={styles.img}
          />
        );
      } else if (icon === 'success') {
        iconStatus = (
          <AnimIcon
            animation="bounceIn"
            name="checkmark-circle"
            style={styles.iconSuccess}
          />
        );
      }
    }
    return iconStatus;
  };

  return (
    <Modal
      animationIn="bounceIn"
      isVisible={visible}
      useNativeDriver
      style={styles.modal}>
      <View style={styles[icon ? 'modalContentCentered' : 'modalContent']}>
        <Text style={styles.title}>{title}</Text>
        {renderIcon()}
        <Text style={styles.body}>{description}</Text>
        <Button onPress={onClose} style={styles.btnGroup} transparent>
          <Text style={styles.txtOk}>{t('ok')}</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default DialogModal;
