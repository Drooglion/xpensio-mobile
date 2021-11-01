/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, View } from 'native-base';
import { has, isEmpty } from 'lodash';

import CARDS from 'library/api/Cards';
import R from 'res/R';
import StringUtils from 'library/utils/StringUtils';

import OtpConfirmModal from 'library/components/OtpConfirmModal';
import ActionButton from './ActionButton';
import PlasticCard from './PlasticCard';

import styles from './styles';

const { width } = Dimensions.get('window');

class PlasticCards extends Component {
  state = {
    pin: '',
    pinError: false,
    toggleCard: {},
    pinModalInProgress: false,
    errorText: '',
  }

  confirmPin = (item) => {
    this.setState({ toggleCard: item });
  }

  closeConfirmPin = () => {
    this.setState({
      errorText: '',
      toggleCard: {},
      pinError: false,
      pin: '',
      pinModalInProgress: false
    });
  }

  toggleLock = async () => {
    try {
      this.setState({ pinModalInProgress: true });
      const { lockCard, unlockCard } = this.props;
      const { pin, toggleCard } = this.state;
      const status = StringUtils.cardStatus(toggleCard.status);
      const variables = {
        id: toggleCard.id,
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

  lockUnlockButton = (item) => {
    const cardStatus = StringUtils.cardStatus(item.status);
    const locked = cardStatus === 'LOCKED';
    return (
      <ActionButton
        danger={!locked}
        onPress={() => this.confirmPin(item)}
        text={R.strings[locked ? 'unlock' : 'lock']}
      />
    );
  }

  renderItem = ({ item }) => {
    const { user, openScanner } = this.props;
    const cardStatus = StringUtils.cardStatus(item.status);
    return (
      <View style={styles.container}>
        <PlasticCard user={user} data={item} onPress={this.onPress} />
        <View style={styles.actionContainer}>
          <Text style={styles.txtDesc}>
            {R.strings.plasticCardDesc}
          </Text>
        </View>
        {
          cardStatus === 'FOR_ACTIVATION' ? (
            <ActionButton
              onPress={() => openScanner(item)}
              text={R.strings.activate}
            />
          ) : this.lockUnlockButton(item)
        }
      </View>
    );
  }

  render() {
    const { plasticCards } = this.props;
    const {
      errorText,
      toggleCard,
      pin,
      pinError,
      pinModalInProgress,
    } = this.state;
    return (
      <View style={styles.container}>
        <OtpConfirmModal
          errorText={errorText}
          isVisible={!isEmpty(toggleCard)}
          handlePin={this.handlePin}
          pinError={pinError}
          pin={pin}
          onCancel={this.closeConfirmPin}
          onSubmit={this.toggleLock}
          submitDisabled={pinModalInProgress}
        />
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={plasticCards}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width}
          enableSnap
          lockScrollWhileSnapping
          scrollEnabled={plasticCards.length > 1}
        />
      </View>
    );
  }
}

PlasticCards.propTypes = {
  openScanner: PropTypes.func,
  plasticCards: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

PlasticCards.defaultProps = {
  openScanner: () => {}
};

export default compose(
  withApollo,
  graphql(
    CARDS.LOCK_CARD,
    {
      name: 'lockCard',
      options: { refetchQueries: [{ query: CARDS.MY_CARDS }] }
    }
  ),
  graphql(
    CARDS.UNLOCK_CARD,
    {
      name: 'unlockCard',
      options: { refetchQueries: [{ query: CARDS.MY_CARDS }] }
    }
  ),
)(PlasticCards);
