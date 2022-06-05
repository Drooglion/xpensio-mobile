import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import useLockCard from 'hooks/api/private/card/useLockCard';
import useUnlockCard from 'hooks/api/private/card/useUnlockCard';

import StringUtils from 'library/utils/StringUtils';

import OtpConfirmModal from 'library/components/OtpConfirmModal';
import PlasticCard from './PlasticCard';

import styles from './styles';
import { ICard, ICardUser } from 'types/Card';
import { IUserCompany } from 'types/User';

const { width } = Dimensions.get('window');

type CarouselItemType = {
  data?: ICard;
  isAdd: boolean;
};

export interface PlasticCardProps {
  user?: ICardUser;
  company?: IUserCompany;
  plasticCards: ICard[];
  onOpenScanner(card: ICard): void;
}

const PlasticCards = ({
  user,
  company,
  plasticCards,
  onOpenScanner,
}: PlasticCardProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<any>(null);
  const [cards, setCards] = useState<ICard[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [confirmPinVisible, setConfirmPinVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>();

  const { mutate: lockCard } = useLockCard();
  const { mutate: unlockCard } = useUnlockCard();

  useEffect(() => {
    if (plasticCards.length > 0) {
      setCards(plasticCards);
      setSelectedCard(0);
    }
  }, [plasticCards]);

  const confirmLockUnlock = () => {
    if (selectedCard !== undefined) {
      setConfirmPinVisible(true);
    }
  };

  const onCarouselSnap = (index: number) => {
    setSelectedCard(index);
  };

  const toggleLock = useCallback(
    async (pin: string) => {
      if (selectedCard !== undefined) {
        const card = cards[selectedCard];
        if (card) {
          if (StringUtils.cardStatus(card.status) === 'LOCKED') {
            unlockCard(
              { id: card.id, payload: { pin } },
              {
                onSuccess: () => {
                  card.status = 1;
                  setPinError('');
                  setConfirmPinVisible(false);
                },
                onError: err => {
                  setPinError(err.message);
                },
              },
            );
          } else if (StringUtils.cardStatus(card.status) === 'UNLOCKED') {
            lockCard(
              { id: card.id, payload: { pin } },
              {
                onSuccess: () => {
                  card.status = 0;
                  setPinError('');
                  setConfirmPinVisible(false);
                },
                onError: err => {
                  setPinError(err.message);
                },
              },
            );
          }

          const arr = [...cards];
          arr[selectedCard].data = card;
          setCards([...arr]);
        }
      }
    },
    [
      selectedCard,
      unlockCard,
      lockCard,
      setConfirmPinVisible,
      setPinError,
      cards,
    ],
  );

  const pinSubmitHandler = async (pin: string) => {
    // confirm pin if correct then call next action
    Keyboard.dismiss();
    toggleLock(pin);
  };

  const pinCloseHandler = () => {
    setLoading(false);
    setPinError(undefined);
    setConfirmPinVisible(false);
  };

  const scanCard = (item: ICard) => {
    onOpenScanner(item);
  };

  const renderCard = (item: ICard, index: number) => {
    const cardStatus = StringUtils.cardStatus(item.status);
    const locked = cardStatus === 'LOCKED';
    return (
      <View key={index} style={styles.container}>
        <PlasticCard
          last4={item.last4}
          cardholder={
            user ? `${user.firstName} ${user.lastName}` : 'Cardholder'
          }
          company={company ? company.name : ''}
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
