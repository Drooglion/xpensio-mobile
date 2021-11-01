/* eslint-disable import/no-unresolved */

import React from 'react';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';

import R from 'res/R';
import SwipeButton from './SwipeButton';


const SwipeButtons = ({
  disabled,
  onDeny,
  onApprove,
  children
}) => {
  const swipeoutBtns = [
    {
      onPress: onDeny,
      backgroundColor: R.colors.error,
      underlayColor: R.colors.error,
      component: <SwipeButton icon="thumbs-down" text={R.strings.deny} />
    },
    {
      onPress: onApprove,
      backgroundColor: R.colors.success,
      underlayColor: R.colors.success,
      component: <SwipeButton icon="thumbs-up" text={R.strings.approve} />
    },
  ];
  return (
    <Swipeout
      autoClose
      disabled={disabled}
      backgroundColor={R.colors.transparent}
      right={swipeoutBtns}
    >
      {children}
    </Swipeout>
  );
};

SwipeButtons.propTypes = {
  onDeny: PropTypes.func,
  onApprove: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

SwipeButtons.defaultProps = {
  onDeny: () => {},
  onApprove: () => {},
  disabled: false
};

export default SwipeButtons;
