/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { has } from 'lodash';

import STORE_MUTATIONS from 'library/store/mutations';
import STORE_QUERIES from 'library/store/queries';
import hooks from 'library/hooks';
import CARDS from 'library/api/Cards';
import EmptyCard from 'library/components/EmptyCard';
import OtpConfirmModal from 'library/components/OtpConfirmModal';
import R from 'res/R';

const EmptyVirtualCard = ({
  privilege,
  disabled,
  requested,
  showDialogModal,
  requestCard,
}) => {
  const { privilege: { actAsAdmin } } = privilege;
  const { inputs, handleChange, writeInputs } = hooks.useForm({
    pin: '',
    pinError: false,
    pinModal: false,
    pinModalInProgress: false,
    errorText: '',
  });

  const {
    pin,
    pinError,
    pinModal,
    pinModalInProgress,
    errorText,
  } = inputs;

  const defaultButtonText = !actAsAdmin
    ? R.strings.requestCard
    : R.strings.addCard;

  const successMessage = () => {
    showDialogModal({
      variables: {
        title: R.strings.cardRequested,
        description: R.strings.virtualCardRequestSuccess,
        icon: 'congratulations',
      }
    });
  };

  const onRequest = async () => {
    try {
      handleChange('pinModalInProgress', true);
      handleChange('errorText', '');
      const variables = { input: { cardType: 'virtual', pin } };
      await requestCard({ variables });
      closeConfirmPin();
      setTimeout(successMessage, 500);
    } catch (error) {
      /* eslint-disable no-console */
      console.log('Error requesting virtual card: ', { error });
      const { networkError: { result } } = error;
      const { messages } = has(result, 'payload') ? result.payload : result;
      handleChange('pinModalInProgress', false);
      handleChange('pinError', true);
      handleChange('errorText', messages[0]);
    }
  };

  const confirmPin = () => {
    handleChange('pinModal', true);
  };

  const handlePin = (value) => {
    handleChange('pin', value);
  };

  const closeConfirmPin = () => {
    writeInputs({
      pin: '',
      pinModal: false,
      pinError: false,
      pinModalInProgress: false,
      errorText: '',
    });
  };

  return (
    <Fragment>
      <OtpConfirmModal
        errorText={errorText}
        isVisible={pinModal}
        handlePin={handlePin}
        pinError={pinError}
        pin={pin}
        onCancel={closeConfirmPin}
        onSubmit={onRequest}
        submitDisabled={pinModalInProgress}
      />
      <EmptyCard
        title={R.strings.virtualCard}
        description={R.strings.emptyVirtualCardDesc}
        btnText={requested ? R.strings.requested : defaultButtonText}
        onPress={confirmPin}
        disabled={disabled}
      />
    </Fragment>
  );
};

EmptyVirtualCard.propTypes = {
  requested: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

EmptyVirtualCard.defaultProps = {
  disabled: false,
};

export default compose(
  graphql(STORE_QUERIES.privilege, { name: 'privilege' }),
  graphql(STORE_MUTATIONS.showDialogModal, { name: 'showDialogModal' }),
  graphql(
    CARDS.REQUEST_CARD, {
      name: 'requestCard',
      options: {
        refetchQueries: [{ query: CARDS.MY_CARDS }]
      }
    }
  ),
)(EmptyVirtualCard);
