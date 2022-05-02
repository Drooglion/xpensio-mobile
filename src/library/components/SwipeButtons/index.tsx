import React from 'react';
import Swipeout from 'react-native-swipeout';
import { useTranslation } from 'react-i18next';

import R from 'res/R';
import SwipeButton from './SwipeButton';

type SwipeButtonsProps = {
  disabled: boolean;
  children: React.ReactNode;
  onApprove(): void;
  onDeny(): void;
};

const defaultProps: SwipeButtonsProps = {
  disabled: false,
  children: null,
  onApprove: () => {},
  onDeny: () => {},
};

const SwipeButtons = ({
  disabled,
  onDeny,
  onApprove,
  children,
}: SwipeButtonsProps) => {
  const { t } = useTranslation();
  const swipeoutBtns = [
    {
      onPress: onDeny,
      backgroundColor: R.colors.error,
      underlayColor: R.colors.error,
      component: <SwipeButton icon="thumbs-down" text={t('deny')} />,
    },
    {
      onPress: onApprove,
      backgroundColor: R.colors.success,
      underlayColor: R.colors.success,
      component: <SwipeButton icon="thumbs-up" text={t('approve')} />,
    },
  ];
  return (
    <Swipeout
      autoClose
      disabled={disabled}
      backgroundColor={R.colors.transparent}
      right={swipeoutBtns}>
      {children}
    </Swipeout>
  );
};

SwipeButtons.defaultProps = defaultProps;

export default SwipeButtons;
