import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import StringUtils from 'library/utils/StringUtils';

import OtpConfirmModal from 'library/components/OtpConfirmModal';
import PlasticCard from './PlasticCard';

import styles from './styles';
import { PlasticCardType } from 'library/types/Cards';
import { CompanyType } from 'library/types/User';

const { width } = Dimensions.get('window');

type CarouselItemType = {
  data?: PlasticCardType;
  isAdd: boolean;
};

export interface PlasticCardProps {
  plasticCards: PlasticCardType[];
  company?: CompanyType;
  onOpenScanner(card: PlasticCardType): void;
}

const PlasticCards = ({
  plasticCards,
  company,
  onOpenScanner,
}: PlasticCardProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<any>(null);
  const [cards, setCards] = useState<PlasticCardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [action, setAction] = useState<string>();
  const [confirmPinVisible, setConfirmPinVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>();

  useEffect(() => {
    if (plasticCards.length > 0) {
      setCards(plasticCards);
      setSelectedCard(0);
    }
  }, [plasticCards]);

  const confirmLockUnlock = () => {
    if (selectedCard !== undefined) {
      setAction('lock_unlock_card');
      setConfirmPinVisible(true);
    }
  };

  const onCarouselSnap = (index: number) => {
    setSelectedCard(index);
  };

  const toggleLock = async () => {
    if (selectedCard !== undefined) {
      const card = cards[selectedCard];
      if (card) {
        if (StringUtils.cardStatus(card.status) === 'LOCKED') {
          card.status = 1;
        } else if (StringUtils.cardStatus(card.status) === 'UNLOCKED') {
          card.status = 0;
        }

        const arr = [...cards];
        arr[selectedCard] = card;
        setCards([...arr]);
      }
    }
    /* try {
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
    } */
  };

  const pinSubmitHandler = async (pin: string) => {
    // confirm pin if correct then call next action
    Keyboard.dismiss();
    setLoading(true);
    if (pin === '111111') {
      setLoading(false);
      setConfirmPinVisible(false);
      if (action === 'lock_unlock_card') {
        toggleLock();
      }
    } else {
      setLoading(false);
      setPinError('Wrong PIN');
    }
  };

  const pinCloseHandler = () => {
    setLoading(false);
    setPinError(undefined);
    setConfirmPinVisible(false);
  };

  const scanCard = (item: PlasticCardType) => {
    console.log('scan', item);
    onOpenScanner(item);
  };

  const renderCard = (item: PlasticCardType, index: number) => {
    const cardStatus = StringUtils.cardStatus(item.status);
    const locked = cardStatus === 'LOCKED';
    return (
      <View key={index} style={styles.container}>
        <PlasticCard
          last4={item.last4}
          cardholder={item.cardholder}
          company={company ? company.companyName : ''}
          status={item.status}
        />
        <View style={styles.actionContainer}>
          <Text style={styles.txtDesc}>{t('plasticCardDesc')}</Text>
          <View style={styles.btnGroup}>
            {cardStatus === 'FOR_ACTIVATION' ? (
              <Button
                primary
                info
                style={styles.btn}
                onPress={() => scanCard(item)}>
                <Text style={styles.btnTxtAction}>{t('activate')}</Text>
              </Button>
            ) : (
              <Button
                primary
                info={locked}
                danger={!locked}
                style={styles.btn}
                onPress={() => confirmLockUnlock()}>
                <Text style={styles.btnTxtAction}>
                  {locked ? t('unlock') : t('lock')}
                </Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <OtpConfirmModal
        visible={confirmPinVisible}
        loading={loading}
        error={pinError}
        onCancel={pinCloseHandler}
        onSubmit={pinSubmitHandler}
      />
      <Carousel
        ref={carouselRef}
        data={cards}
        renderItem={item => renderCard(item.item, item.index)}
        onSnapToItem={onCarouselSnap}
        sliderWidth={width}
        itemWidth={width}
        enableSnap
        lockScrollWhileSnapping
        horizontal
        scrollEnabled={plasticCards.length > 1}
        useScrollView
      />
    </View>
  );
};

export default PlasticCards;
