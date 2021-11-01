/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BottomSheet from 'library/components/BottomSheet';
import {
  Button,
  Item,
  Text,
  View,
} from 'native-base';
import { has } from 'lodash';

import STORE_MUTATIONS from 'library/store/mutations';
import StringUtils from 'library/utils/StringUtils';
import EmptyVirtualCard from 'library/components/EmptyVirtualCard';
import CARDS from 'library/api/Cards';
import R from 'res/R';
import OtpConfirmModal from 'library/components/OtpConfirmModal';
import VirtualCard from './VirtualCard';

import styles from './styles';

const { width } = Dimensions.get('window');

class VirtualCards extends Component {
  state = {
    cardDetails: {
      cvv: ''
    },
    errorText: '',
    openConfirmPin: false,
    onSubmitPinConfirm: () => {},
    pin: '',
    pinError: false,
    confirmCard: {},
    pinModalInProgress: false,
    showCardDetails: false,
  }

  onCloseBottomSheet = () => {
    const { clearViewedCardNumber } = this.props;
    clearViewedCardNumber();
    this.setState({ showCardDetails: false });
  }

  confirmViewDetails = (item) => {
    this.setState({
      confirmCard: item,
      openConfirmPin: true,
      onSubmitPinConfirm: this.viewDetails,
    });
  }

  confirmLockUnlock = (item) => {
    this.setState({
      confirmCard: item,
      openConfirmPin: true,
      onSubmitPinConfirm: this.toggleLock,
    });
  }

  closeConfirmPin = () => {
    this.setState({
      errorText: '',
      confirmCard: {},
      pinError: false,
      pin: '',
      pinModalInProgress: false,
      openConfirmPin: false,
    });
  }

  viewDetails = async () => {
    const { getCardDetails, setViewedCardNumber } = this.props;
    const { cardDetails, pin, confirmCard } = this.state;
    try {
      const variables = { id: confirmCard.id, input: { pin } };
      this.setState({ pinModalInProgress: true });
      const res = await getCardDetails({ variables });
      const { data: { getCardDetails: { payload } } } = res;

      await setViewedCardNumber({ variables: { viewedCardNumber: payload.cardNumber } });

      this.setState({ cardDetails: { ...cardDetails, cvv: payload.cvv, } });
      this.closeConfirmPin();
      setTimeout(() => {
        this.setState({ showCardDetails: true });
      }, 500);
    } catch (error) {
      const { networkError: { result } } = error;
      const { messages } = has(result, 'payload') ? result.payload : result;
      this.setState({
        pinError: true,
        pinModalInProgress: false,
        errorText: messages[0]
      });
    }
  }


  toggleLock = async () => {
    try {
      this.setState({ pinModalInProgress: true });
      const { lockCard, unlockCard } = this.props;
      const { pin, confirmCard } = this.state;
      const status = StringUtils.cardStatus(confirmCard.status);
      const variables = {
        id: confirmCard.id,
        input: { pin }
      };
      if (status === 'LOCKED') {
        await unlockCard({ variables });
      } else if (status === 'UNLOCKED') {
        await lockCard({ variables });
      }
      this.closeConfirmPin();
    } catch (error) {
      const { networkError: { result } } = error;
      const { messages } = has(result, 'payload') ? result.payload : result;
      this.setState({
        pinError: true,
        pinModalInProgress: false,
        errorText: messages[0]
      });
    }
  }

  handlePin = (pin) => {
    this.setState({ pin });
  }

  renderItem = ({ item }) => {
    const { virtualCardRequested } = this.props;
    let renderedItem = null;

    if (item === 'Add') {
      renderedItem = (
        <EmptyVirtualCard
          disabled={virtualCardRequested}
          text={
            virtualCardRequested
              ? R.strings.requested
              : R.strings.requestVirtualCard
          }
        />
      );
    } else {
      const { user } = this.props;
      const locked = item.status === 0;
      const status = StringUtils.cardStatus(item.status);
      renderedItem = (
        <View style={styles.container}>
          <VirtualCard
            user={user}
            data={item}
          />
          <View style={styles.actionContainer}>
            <Text style={styles.txtDesc}>
              {R.strings.virtualCardDesc}
            </Text>
            <View style={styles.btnGroup}>
              <Button
                bordered
                info
                style={styles.btn}
                onPress={() => this.confirmViewDetails(item)}
                disabled={status === 'LOCKED'}
              >
                <Text style={styles.btnTxtAction}>
                  {R.strings.viewDetails}
                </Text>
              </Button>
              <Button
                bordered
                danger={!locked}
                info={locked}
                style={styles.btn}
                onPress={() => this.confirmLockUnlock(item)}
              >
                <Text style={styles.btnTxtAction}>
                  {R.strings[locked ? 'unlock' : 'lock']}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }
    return renderedItem;
  }

  render() {
    const { virtualCards, companyConfiguration } = this.props;
    const {
      errorText,
      cardDetails,
      pin,
      pinError,
      pinModalInProgress,
      openConfirmPin,
      onSubmitPinConfirm,
      showCardDetails,
    } = this.state;

    if (!virtualCards.includes('Add')) {
      virtualCards.push('Add');
    }

    return (
      <View style={styles.container}>
        <OtpConfirmModal
          errorText={errorText}
          isVisible={openConfirmPin}
          handlePin={this.handlePin}
          pinError={pinError}
          pin={pin}
          onCancel={this.closeConfirmPin}
          onSubmit={onSubmitPinConfirm}
          submitDisabled={pinModalInProgress}
        />
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={virtualCards}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width}
          enableSnap
          lockScrollWhileSnapping
          scrollEnabled={virtualCards.length > 1}
        />
        <BottomSheet
          sheetHeight={0.38}
          isVisible={showCardDetails}
          onClose={this.onCloseBottomSheet}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetDetails}>
              <Text uppercase style={styles.virtualCardViewWarning}>
                {R.strings.virtualCardViewWarning}
              </Text>
              <Item style={styles.item}>
                <Text uppercase style={styles.label}>
                  {R.strings.company}
                </Text>
                <Text style={styles.text}>
                  {companyConfiguration ? companyConfiguration.invoiceCompany : ''}
                </Text>
              </Item>
              <Item style={styles.item}>
                <Text uppercase style={styles.label}>
                  {R.strings.address}
                </Text>
                <Text style={styles.text}>
                  {companyConfiguration ? companyConfiguration.invoiceAddress : ''}
                </Text>
              </Item>
              <Item style={styles.item}>
                <Text uppercase style={styles.label}>
                  {R.strings.cvv}
                </Text>
                <Text style={styles.text}>
                  {cardDetails.cvv}
                </Text>
              </Item>
            </View>
            <Button
              bordered
              dark
              onPress={this.onCloseBottomSheet}
              style={styles.btn}
            >
              <Text style={styles.text}>{R.strings.close}</Text>
            </Button>
          </View>
        </BottomSheet>
      </View>
    );
  }
}

VirtualCards.propTypes = {
  virtualCards: PropTypes.instanceOf(Array).isRequired,
  virtualCardRequested: PropTypes.bool.isRequired,
  companyConfiguration: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object).isRequired,
};

VirtualCards.defaultProps = {
  companyConfiguration: {}
};

export default compose(
  withApollo,
  graphql(CARDS.GET_CARD_DETAILS, { name: 'getCardDetails' }),
  graphql(STORE_MUTATIONS.setViewedCardNumber, { name: 'setViewedCardNumber' }),
  graphql(STORE_MUTATIONS.clearViewedCardNumber, { name: 'clearViewedCardNumber' }),
  graphql(CARDS.LOCK_CARD, { name: 'lockCard', options: { refetchQueries: [{ query: CARDS.MY_CARDS }] } }),
  graphql(CARDS.UNLOCK_CARD, { name: 'unlockCard', options: { refetchQueries: [{ query: CARDS.MY_CARDS }] } }),
)(VirtualCards);
