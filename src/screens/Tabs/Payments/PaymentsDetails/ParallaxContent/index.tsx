import React, { FC, useState, useCallback } from 'react';
import {
  Animated,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, Icon } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageLoad from 'react-native-image-placeholder';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { has, isEmpty } from 'lodash';

import Header from 'library/components/Header';
import ReceiptsView from 'library/components/ReceiptsView';
import useDeleteReceipt from 'hooks/api/private/payments/useDeleteReceipt';
import useGetSignedUrl from 'hooks/api/private/payments/useGetSignedUrl';
import ApiUtils from 'library/utils/ApiUtils';

import R from 'res/R';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const isIos = Platform.OS === 'ios';
// const imageHeight = PixelRatio.get() < 3 ? 200 : 250;
const imageHeight = height * 0.3;
const stickyHeaderHeight = isIos ? (hasNotch() ? 96 : 60) : 60;

import { IPaymentAttachment } from 'types/Payment';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import useUploadReceipt from 'hooks/api/private/payments/useUploadReceipt';
import { useHeaderHeight } from '@react-navigation/elements';
import { hasNotch } from 'react-native-device-info';
import Payment from 'models/Payment';

type Props = {
  payment: Payment;
  onBackPress: () => void;
  refetch?: () => void;
};

const ParallaxContent: FC<Props> = ({ children, payment, onBackPress }) => {
  const isAndroid = Platform.OS === 'android';
  const navigation = useNavigation();
  const { mutate: uploadReceipt } = useUploadReceipt();
  const { mutate: getSignedUrl } = useGetSignedUrl();
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState<IPaymentAttachment[]>(
    payment.attachments || [],
  );
  const [permissionAndroidGranted, setPermissionAndroidGranted] =
    useState<boolean>(false);

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const [viewImageIndex, setViewImageIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { mutate: deleteReceiptMutate } = useDeleteReceipt();

  const addMoreReceipt = async () => {
    try {
      if (isAndroid) {
        if (permissionAndroidGranted) {
          const options = { mediaType: 'photo' } as CameraOptions;
          const { assets } = await launchCamera(options);

          /* Clicked back */
          if (!assets) {
            return;
          }

          await getSignedUrl(
            { id: payment.id },
            {
              onSuccess: async res => {
                const asset = assets && assets[0];
                console.log({ asset });
                const { key, url } = res.data.payload;
                console.log({ key, url });
                await ApiUtils.uploadImageToSignedUrl({
                  image: asset?.uri,
                  url,
                });
                const payload = { id: payment.id, payload: { key } };
                uploadReceipt(payload, {
                  onSuccess: () => onSuccessUploadReceipt(asset!),
                });
              },
            },
          );
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Allow camera access',
              message:
                'Xpensio needs to access your device camera to take photos of your receipts',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionAndroidGranted(true);
            addMoreReceipt();
          } else {
            setPermissionAndroidGranted(false);
          }
        }
      } else {
        const options = { mediaType: 'photo' } as CameraOptions;
        const { assets } = await launchCamera(options);

        /* Clicked back */
        if (!assets) {
          return;
        }

        await getSignedUrl(
          { id: payment.id },
          {
            onSuccess: async res => {
              const asset = assets && assets[0];
              console.log({ asset });
              const { key, url } = res.data.payload;
              console.log({ key, url });
              await ApiUtils.uploadImageToSignedUrl({
                image: asset?.uri,
                url,
              });
              const payload = { id: payment.id, payload: { key } };
              uploadReceipt(payload, {
                onSuccess: () => onSuccessUploadReceipt(asset!),
              });
            },
          },
        );
      }
    } catch (err) {
      console.log('launchCamera', { err });
    }
  };

  const onSuccessUploadReceipt = useCallback(
    (asset: Record<string, any>) => {
      const newAsset = {
        paymentId: payment.id,
        url: asset.uri,
      } as IPaymentAttachment;
      setAttachments(attachments.concat(newAsset));
    },
    [setAttachments, attachments, payment],
  );

  const deleteReceipt = useCallback(() => {
    const payload = {
      id: payment.id,
      attachmentId: attachments![viewImageIndex].id,
    };
    deleteReceiptMutate(payload);
    setViewImage(false);
    setViewImageIndex(0);
  }, [
    deleteReceiptMutate,
    setViewImage,
    setViewImageIndex,
    payment.id,
    attachments,
    viewImageIndex,
  ]);

  const noAttachments = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={addMoreReceipt}
      style={[styles.addReceipt, { height: imageHeight }]}>
      <Icon style={styles.cameraIcon} name="camera" />
      <Text style={styles.addReceiptTxt}>{t('addReceipt')}</Text>
    </TouchableOpacity>
    // <ImageLoad
    //   style={[styles.img, { height: imageHeight }]}
    //   source={R.images.noimage}
    // />
  );

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const tail = index + 1 === attachments.length + 1;

    if (tail) {
      return noAttachments();
    }

    return (
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
  };

  const hasAttachments = () => (
    <View style={{ width, position: 'relative' }}>
      <Carousel
        data={attachments.concat({})}
        onSnapToItem={setActiveDotIndex}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width}
        enableSnap
        lockScrollWhileSnapping
      />
      <Pagination
        dotsLength={attachments.length + 1}
        activeDotIndex={activeDotIndex}
        dotColor={R.colors.primary}
        inactiveDotColor={R.colors.white}
        dotStyle={styles.dotStyle}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.8}
        containerStyle={styles.dotsContainer}
      />
    </View>
  );

  return (
    <>
      <ReceiptsView
        visible={viewImage}
        imageUrls={attachments!.filter(attachment => has(attachment, 'url'))}
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
        renderScrollComponent={() => (
          <Animated.ScrollView showsVerticalScrollIndicator={false} />
        )}
        renderFixedHeader={() => (
          <Header
            hasBack
            highlightBack={headerVisible}
            backgroundColor={
              headerVisible ? R.colors.transparent : R.colors.white
            }
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
