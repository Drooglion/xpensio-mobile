/* eslint-disable import/no-unresolved */
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import numeral from 'numeral';
import {
  Button,
  Label,
  Text,
  View
} from 'native-base';
import R from 'res/R';

import styles from './styles';

const EditRuleModal = ({
  isVisible,
  onCancel,
  onSubmit,
  slider,
  handleSlider,
  submitDisabled,
}) => (
  <Modal isVisible={isVisible}>
    <View style={styles.modal}>
      <Text style={styles.title}>{R.strings.editRule}</Text>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
        <View style={styles.item}>
          <Label style={styles.label}>
            {R.strings.value}
          </Label>
          <Label style={styles.label}>
            {numeral(slider).format('0,0')}
          </Label>
          <Slider
            style={{ width: '100%', height: 50 }}
            minimumValue={0}
            maximumValue={500000}
            step={10000}
            minimumTrackTintColor={R.colors.primary}
            maximumTrackTintColor={R.colors.subhead}
            onValueChange={handleSlider}
          />
          <View style={styles.sliderMinMaxLabel}>
            <Text style={styles.sliderMinMaxText}>0</Text>
            <Text style={styles.sliderMinMaxText}>500,000</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.btnGroup}>
        <Button
          transparent
          onPress={onCancel}
          style={{ marginRight: R.metrics.baseMargin }}
        >
          <Text style={styles.noTxt}>
            {R.strings.cancel}
          </Text>
        </Button>
        <Button
          disabled={submitDisabled}
          primray
          onPress={onSubmit}
        >
          <Text uppercase>
            {R.strings.confirm}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

EditRuleModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  slider: PropTypes.number,
  handleSlider: PropTypes.func,
  onSubmit: PropTypes.func,
  submitDisabled: PropTypes.bool,
};

EditRuleModal.defaultProps = {
  isVisible: false,
  onCancel: () => {},
  slider: 0,
  handleSlider: () => {},
  onSubmit: () => {},
  submitDisabled: false,
};

export default EditRuleModal;
