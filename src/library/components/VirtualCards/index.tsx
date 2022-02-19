import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Item, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import StringUtils from 'library/utils/StringUtils';
import BottomSheet from 'library/components/BottomSheet';
import EmptyVirtualCard from 'library/components/EmptyVirtualCard';
import VirtualCard from './VirtualCard';

import styles from './styles';
import OtpConfirmModal from '../OtpConfirmModal';
import { ICard, ICardUser } from 'types/Card';
import { IUserCompany } from 'types/User';

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
  onRequestCard(): void;
}

const VirtualCards = ({
  user,
  company,
  virtualCards,
  hasPendingRequest,
  onRequestCard,
}: VirtualCardsProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<any>(null);

  const [cards, setCards] = useState<CarouselItemType[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [cvv, setCvv] = useState<string>();
  const [action, setAction] = useState<string>();
  const [confirmPinVisible, setConfirmPinVisible] = useState<boolean>(false);
  const [cardDetailsVisible, setCardDetailsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //const [error, setError] = useState<string>();
  const [pinError, setPinError] = useState<string>();

  useEffect(() => {
    if (cards.length === 0) {
      console.log('setting cards data');
      const items: CarouselItemType[] = [];
      virtualCards.forEach(i => {
        items.push({ data: i, isAdd: false });
      });
      items.push({ data: undefined, isAdd: true });
      setCards(items);
      if (items.length > 0) {
        setSelectedCard(0);
        console.log('default selected card', items[0]);
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
          console.log('details should be hidden now');
        }, 500);
      }
    }
    setCardDetailsVisible(false);
  };

  const confirmViewDetails = () => {
    if (selectedCard !== undefined) {
      setAction('view_details');
      setConfirmPinVisible(true);
    }
  };

  const confirmLockUnlock = () => {
    if (selectedCard !== undefined) {
      setAction('lock_unlock_card');
      setConfirmPinVisible(true);
    }
  };

  const viewDetails = async () => {
    if (selectedCard !== undefined) {
      const card = cards[selectedCard].data;
      if (card) {
        card.cardNumber = '4242424242424242';
        card.cvv = '123';
        setCvv('123');
        console.log('card details', card);

        const arr = [...cards];
        arr[selectedCard].data = card;
        setCards(arr);

        setTimeout(() => {
          setCardDetailsVisible(true);
          console.log('details should be visible now');
        }, 500);
      }
    }

    /* const { getCardDetails, setViewedCardNumber } = this.props;
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
    } */
  };

  const toggleLock = async () => {
    if (selectedCard !== undefined) {
      const card = cards[selectedCard].data;
      if (card) {
        if (StringUtils.cardStatus(card.status) === 'LOCKED') {
          card.status = 1;
        } else if (StringUtils.cardStatus(card.status) === 'UNLOCKED') {
          card.status = 0;
        }

        const arr = [...cards];
        arr[selectedCard].data = card;
        setCards([...arr]);
      }
    }
    /* try {
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
    } */
  };

  const onCarouselSnap = (index: number) => {
    setSelectedCard(index);
  };

  const requestCardHandler = () => {
    onRequestCard();
  };

  const pinSubmitHandler = async (pin: string) => {
    // confirm pin if correct then call next action
    Keyboard.dismiss();
    setLoading(true);
    if (pin === '111111') {
      setLoading(false);
      setConfirmPinVisible(false);
      if (action === 'view_details') {
        viewDetails();
      } else if (action === 'lock_unlock_card') {
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

  const renderCard = (item: CarouselItemType, index: number) => {
    let renderedItem = null;
    //console.log('card', item);

    if (item.isAdd) {
      renderedItem = (
        <EmptyVirtualCard
          key={index}
          disabled={hasPendingRequest}
          requested={hasPendingRequest}
          onRequestCard={requestCardHandler}
        />
      );
    } else {
      if (item.data) {
        const card = item.data;
        console.log('card', card);
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
                    onPress={() => confirmViewDetails()}>
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
                  onPress={() => confirmLockUnlock()}>
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
        scrollEnabled={virtualCards.length > 1}
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
