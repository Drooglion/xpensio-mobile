import React, { FC, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageLoad from 'react-native-image-placeholder';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { has, isEmpty } from 'lodash';

import Header from 'library/components/Header';
import ReceiptsView from 'library/components/ReceiptsView';
import HelperUtils from 'library/utils/HelperUtils';

import PAYMENTS from 'library/api/Payments';
import R from 'res/R';
import styles from './styles';

const { width, height } = Dimensions.get('window');
// const imageHeight = PixelRatio.get() < 3 ? 200 : 250;
const imageHeight = height * 0.3;
const stickyHeaderHeight = 60;

import { IPayment } from 'types/Payment';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type Props = {
  payment: IPayment;
  onBackPress: () => void;
  refetch?: () => void;
};

const ParallaxContent: FC<Props> = ({ children, payment, onBackPress }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { attachments } = payment;

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const [viewImageIndex, setViewImageIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  const addMoreReceipt = () => {
    navigation.navigate({
      routeName: 'Camera',
      key: 'Camera',
      params: {
        item: payment,
        refetch,
        callback: () => {
          refetch();
          navigation.pop();
        },
      },
    });
  };

  const deleteReceipt = async () => {
    // try {
    //   const variables = {
    //     paymentId: payment.id,
    //     attachmentId: attachments[viewImageIndex].id,
    //   };
    //   await deleteAttachment({ variables });
    //   refetch();
    //   setViewImage(false);
    //   setViewImageIndex(0);
    // } catch (error) {
    //   console.log('error: ', { error });
    //   HelperUtils.bugsnag.notify(error);
    // }
  };

  const noAttachments = () => (
    <ImageLoad
      style={[styles.img, { height: imageHeight }]}
      source={R.images.noimage}
    />
  );

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    let component = null;
    if (has(item, 'url')) {
      component = (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setViewImageIndex(index);
            setViewImage(true);
          }}>
          <ImageLoad
            style={[styles.img, { height: imageHeight }]}
            placeholderStyle={{ width: '100%', height: imageHeight }}
            placeholderSource={R.images.noimage}
            loadingStyle={{ size: 'small', color: R.colors.white }}
            source={{ uri: item.url }}
          />
        </TouchableOpacity>
      );
    } else {
      component =
        index < 5 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={addMoreReceipt}
            style={[styles.addReceipt, { height: imageHeight }]}>
            <Icon style={styles.cameraIcon} name="camera" />
            <Text style={styles.addReceiptTxt}>{t('addReceipt')}</Text>
          </TouchableOpacity>
        ) : null;
    }
    return component;
  };

  const hasAttachments = () => (
    <View style={{ width }}>
      <Carousel
        data={attachments}
        onSnapToItem={setActiveDotIndex}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width}
        enableSnap
        lockScrollWhileSnapping
      />
      <Pagination
        dotsLength={attachments.length}
        activeDotIndex={activeDotIndex}
        dotColor={R.colors.primary}
        inactiveDotColor={R.colors.white}
        dotStyle={{ height: 10, width: 10, borderRadius: 10 }}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.8}
        containerStyle={{
          position: 'absolute',
          bottom: -10,
          alignSelf: 'center',
        }}
      />
    </View>
  );

  return (
    <>
      <ReceiptsView
        visible={viewImage}
        imageUrls={attachments.filter(attachment => has(attachment, 'url'))}
        index={viewImageIndex}
        onClose={() => setViewImage(false)}
        onChange={setViewImageIndex}
        onDelete={deleteReceipt}
      />
      <ParallaxScrollView
        onChangeHeaderVisibility={setHeaderVisible}
        parallaxHeaderHeight={imageHeight}
        backgroundColor={R.colors.white}
        renderForeground={() =>
          isEmpty(attachments) ? noAttachments() : hasAttachments()
        }
        renderFixedHeader={() => (
          <Header
            hasBack
            highlightBack={headerVisible}
            backgroundColor={R.colors.transparent}
            inverseFontColor={headerVisible}
            onBackPress={onBackPress}
          />
        )}
        stickyHeaderHeight={stickyHeaderHeight}>
        {children}
      </ParallaxScrollView>
    </>
  );
};

export default ParallaxContent;
