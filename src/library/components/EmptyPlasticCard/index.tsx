import React, { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';

import EmptyCard from 'library/components/EmptyCard';
import R from 'res/R';
import { useResource } from 'contexts/resourceContext';
import useRequestCard from 'hooks/api/private/card/useRequestCard';
import OtpConfirmModal from '../OtpConfirmModal';
import { CardType } from 'types/Card';

export interface EmptyPlasticCardProps {
  disabled: boolean;
  requested?: boolean;
}

const EmptyPlasticCard = ({ disabled, requested }: EmptyPlasticCardProps) => {
  const { t } = useTranslation();
  const { mutate: requestCard } = useRequestCard();
  const [confirmPinVisible, setConfirmPinVisible] = useState<boolean>(false);
  const [pinError, setPinError] = useState();
  const {
    state: { actAsAdmin },
    dispatch,
  } = useResource();
  const defaultButtonText = actAsAdmin
    ? R.strings.getCard
    : R.strings.requestCard;

  const pinCloseHandler = useCallback(() => {
    setPinError(undefined);
    setConfirmPinVisible(false);
  }, [setPinError, setConfirmPinVisible]);

  const requestCardHandler = useCallback(
    (pin: string) => {
      const params = { cardType: 'physical' as CardType, pin };
      requestCard(params, {
        onSuccess: () => {
          pinCloseHandler();
          setTimeout(() => {
            dispatch({
              type: 'SET_DIALOG_MODAL',
              dialogModal: {
                visible: true,
                title: t('cardRequested'),
                icon: 'congratulations',
                description: t('plasticCardRequestSuccess'),
              },
            });
          }, 500);
        },
        onError: err => {
          setPinError(err.message);
        },
      });
    },
    [dispatch, pinCloseHandler, requestCard, t],
  );

  const pinSubmitHandler = useCallback(
    (pin: string) => {
      Keyboard.dismiss();
      requestCardHandler(pin);
    },
    [requestCardHandler],
  );

  return (
    <>
      <OtpConfirmModal
        visible={confirmPinVisible}
        loading={false}
        error={pinError}
        onCancel={pinCloseHandler}
        onSubmit={pinSubmitHandler}
      />
      <EmptyCard
        title={R.strings.plasticCard}
        description={R.strings.plasticCardDesc}
        btnText={requested ? R.strings.requested : defaultButtonText}
        onPress={() => setConfirmPinVisible(true)}
        disabled={disabled}
      />
    </>
  );
};

export default EmptyPlasticCard;
