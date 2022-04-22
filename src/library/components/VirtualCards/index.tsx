import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Item, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import _isEmpty from 'lodash/isEmpty';

import StringUtils from 'library/utils/StringUtils';
import BottomSheet from 'library/components/BottomSheet';
import EmptyVirtualCard from 'library/components/EmptyVirtualCard';
import VirtualCard from './VirtualCard';

import styles from './styles';
import OtpConfirmModal from '../OtpConfirmModal';
import { CardType, ICard, ICardUser } from 'types/Card';
import { IUserCompany } from 'types/User';
import useLockCard from 'hooks/api/private/card/useLockCard';
import useUnlockCard from 'hooks/api/private/card/useUnlockCard';
import useGetCardDetails from 'hooks/api/private/card/useGetCardDetails';
import useRequestCard from 'hooks/api/private/card/useRequestCard';
import { useResource } from 'contexts/resourceContext';

const { width } = Dimensions.get('window');

type CarouselItemType = {
  data?: ICard;
  isAdd: boolean;
};

export interface VirtualCardsProps {
  user?: ICardUser;
  company?: IUserCompany;
  virtualCards: ICard[];
  hasPendingRequest: boolean;
}

const VirtualCards = ({
  user,
  company,
  virtualCards,
  hasPendingRequest,
}: VirtualCardsProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<any>(null);
  const { mutate: lockCard } = useLockCard();
  const { mutate: unlockCard } = useUnlockCard();
  const { mutate: getCardDetails } = useGetCardDetails();
  const { mutate: requestCard } = useRequestCard();

  const [cards, setCards] = useState<CarouselItemType[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [cvv, setCvv] = useState<string>();
  const [action, setAction] = useState<string>('');
  const [confirmPinVisible, setConfirmPinVisible] = useState<boolean>(false);
  const [cardDetailsVisible, setCardDetailsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>();
  const { dispatch } = useResource();

  useEffect(() => {
    if (_isEmpty(cards)) {
      const items: CarouselItemType[] = [];
      virtualCards.forEach(i => {
        items.push({ data: i, isAdd: false });
      });
      items.push({ data: undefined, isAdd: true });
      setCards(items);
      if (!_isEmpty(items)) {
        setSelectedCard(0);
      }
    }
  }, [virtualCards, cards]);

  const onCloseBottomSheet = () => {
    //const { clearViewedCardNumber } = this.props;
    //clearViewedCardNumber();
    setCvv(undefined);
    if (selectedCard !== undefined) {
      const card = cards[selectedCard].data;
      if (card) {
        card.cardNumber = undefined;
        const arr = [...cards];
        arr[selectedCard].data = card;
        setCards([...arr]);
        setTimeout(() => {
          setCardDetailsVisible(false);
        }, 500);
      }
    }
    setCardDetailsVisible(false);
  };

  const confirmActionOpenOtp = useCallback(
    (actionType: string) => {
      if (selectedCard !== undefined) {
        setAction(actionType);
        setConfirmPinVisible(true);
      }
    },
    [selectedCard, setAction, setConfirmPinVisible],
  );

  const viewDetails = useCallback(
    async (pin: string) => {
      if (selectedCard !== undefined) {
        const card = cards[selectedCard].data;
        if (card) {
          const params = { id: card.id, payload: { pin } };
          getCardDetails(params, {
            onSuccess: res => {
              /* Card Details here */
              card.cardNumber = '4242424242424242';
              card.cvv = '123';
              setCvv('123');
              console.log('card details', card);

              const arr = [...cards];
              arr[selectedCard].data = card;
              setCards(arr);

              setTimeout(() => {
                setCardDetailsVisible(true);
              }, 500);
            },
            onError: err => {
              const errMsg = err.message;
              setPinError(errMsg);
            },
          });
        }
      }
    },
    [selectedCard, cards, setCards, getCardDetails],
  );

  const toggleLock = useCallback(
    async (pin: string) => {
      if (selectedCard !== undefined) {
        const card = cards[selectedCard].data;
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

  const onCarouselSnap = useCallback(
    (index: number) => {
      setSelectedCard(index);
    },
    [setSelectedCard],
  );

  const pinSubmitHandler = useCallback(
    async (pin: string) => {
      Keyboard.dismiss();
      switch (action) {
        case 'view_details':
          viewDetails(pin);
          break;
        case 'lock_unlock_card':
          toggleLock(pin);
          break;
        case 'request_card':
          requestCardHandler(pin);
          break;
      }
    },
    [viewDetails, toggleLock, action, requestCardHandler],
  );

  const pinCloseHandler = useCallback(() => {
    setLoading(false);
    setPinError(undefined);
    setConfirmPinVisible(false);
  }, [setLoading, setPinError, setConfirmPinVisible]);

  const requestCardHandler = useCallback(
    (pin: string) => {
      const params = { cardType: 'virtual' as CardType, pin };
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
                description: t('virtualCardRequestSuccess'),
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

  const renderCard = (item: CarouselItemType, index: number) => {
    let renderedItem = null;

    if (item.isAdd) {
      renderedItem = (
        <EmptyVirtualCard
          key={index}
          isDisabled={hasPendingRequest}
          requested={hasPendingRequest}
          onRequestCard={() => confirmActionOpenOtp('request_card')}
        />
      );
    } else {
      if (item.data) {
        const card = item.data;
        renderedItem = (
          <View>
            <VirtualCard
              key={index}
              cardNumber={card.cardNumber}
              last4={card.last4}
              expiryMonth={card.expiryMonth.toString().padStart(2, '0')}
              expiryYear={card.expiryYear.toString()}
              cardholder={
                user ? `${user.firstName} ${user.lastName}` : 'Cardholder'
              }
              status={card.status}
              company={company ? company.name : ''}
            />
            <View style={styles.actionContainer}>
              <Text style={styles.txtDesc}>{t('virtualCardDesc')}</Text>
              <View style={styles.btnGroup}>
                {StringUtils.cardStatus(card.status) === 'UNLOCKED' ? (
                  <Button
                    bordered
                    info
                    style={styles.btn}
                    onPress={() => confirmActionOpenOtp('view_details')}>
                    <Text style={styles.btnTxtAction}>{t('viewDetails')}</Text>
                  </Button>
                ) : null}

                <Button
                  primary
                  danger={
                    card
                      ? StringUtils.cardStatus(card.status) === 'UNLOCKED'
                      : false
                  }
                  info={
                    selectedCard !== undefined
                      ? StringUtils.cardStatus(card.status) === 'LOCKED'
                      : false
                  }
                  style={styles.btn}
                  onPress={() => confirmActionOpenOtp('lock_unlock_card')}>
                  <Text style={styles.btnTxtAction}>
                    {selectedCard !== undefined
                      ? StringUtils.cardStatus(card.status) === 'LOCKED'
                        ? t('unlock')
                        : t('lock')
                      : t('unlock')}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        );
      }
    }
    return renderedItem;
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
        scrollEnabled={cards.length > 1}
        useScrollView
      />
      <BottomSheet
        height={0.32}
        visible={cardDetailsVisible}
        onClose={onCloseBottomSheet}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetDetails}>
            <Text uppercase style={styles.virtualCardViewWarning}>
              {t('virtualCardViewWarning')}
            </Text>
            <Item style={styles.item}>
              <Text uppercase style={styles.label}>
                {t('company')}
              </Text>
              <Text style={styles.text}>{company ? company.name : ''}</Text>
            </Item>
            <Item style={styles.item}>
              <Text uppercase style={styles.label}>
                {t('address')}
              </Text>
              <Text style={styles.text}>
                {company
                  ? company.address
                    ? company.address
                    : 'Company address'
                  : 'Company address'}
              </Text>
            </Item>
            <Item style={styles.item}>
              <Text uppercase style={styles.label}>
                {t('cvv')}
              </Text>
              <Text style={styles.text}>{cvv || ''}</Text>
            </Item>
          </View>
          <Button primary onPress={onCloseBottomSheet} style={styles.btn}>
            <Text style={styles.btnTxtAction}>{t('close')}</Text>
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
};

export default VirtualCards;
