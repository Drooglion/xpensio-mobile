/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Button,
  Icon,
  Text,
  View
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

import STORE_MUTATIONS from 'library/store/mutations';
import STORE_QUERIES from 'library/store/queries';
import R from 'res/R';
import styles from './styles';

const DialogModal = ({ closeDialogModal, data }) => {
  const AnimIcon = Animatable.createAnimatableComponent(Icon);
  const {
    dialogModal: {
      description,
      title,
      visible,
      icon,
    }
  } = data;

  const renderIcon = () => {
    let iconStatus = null;
    const iconsFromAssets = ['congratulations', 'email'];
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
    return iconStatus;
  };

  return (
    <Modal
      animationIn="bounceIn"
      isVisible={visible}
      userNativeDriver
      style={styles.modal}
    >
      <View style={styles[icon ? 'modalContentCentered' : 'modalContent']}>
        <Text style={styles.title}>
          {title}
        </Text>
        { renderIcon() }
        <Text style={styles.body}>
          {description}
        </Text>
        <Button
          onPress={() => closeDialogModal()}
          style={styles.btnGroup}
          transparent
        >
          <Text style={styles.txtOk}>Ok</Text>
        </Button>
      </View>
    </Modal>
  );
};


export default compose(
  graphql(
    STORE_MUTATIONS.closeDialogModal,
    { name: 'closeDialogModal' }
  ),
  graphql(STORE_QUERIES.dialogModal),
)(DialogModal);
