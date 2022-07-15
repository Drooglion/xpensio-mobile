import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
} from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import { ActionSheet, Button, Text, Icon, View } from 'native-base';
import { useGetSignedUrl } from 'hooks/api/private/profile/useGetSignedUrl';
import { useUploadProfilePhoto } from 'hooks/api/private/profile/useUploadProfilePhoto';
import ApiUtils from 'library/utils/ApiUtils';

import R from 'res/R';
import styles from './styles';

type Props = {
  text?: string;
  onPressText?: () => void;
  showUploadBtn: Boolean;
  size: number;
  user: any;
};
const ProfileImg = ({
  text,
  onPressText,
  showUploadBtn,
  size = 70,
  user,
}: Props) => {
  const isAndroid = Platform.OS === 'android';
  const [uri, setUri] = useState<any>();
  const { mutate: getSignedUrl } = useGetSignedUrl();
  const { mutate: uploadProfilePhoto } = useUploadProfilePhoto();
  const [permissionAndroidGranted, setPermissionAndroidGranted] =
    useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user.photoUrl) {
        setUri({ uri: user.photoUrl });
      } else {
        setUri(R.images.profile_photo);
      }
    } else {
      setUri(R.images.profile_photo);
    }
  }, [user]);

  const handleUpload = useCallback(async () => {
    if (isAndroid && !permissionAndroidGranted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Allow camera access',
          message:
            'Xpensio needs to access your device camera or gallery to upload profile photo',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionAndroidGranted(true);
        chooseUploadMethod();
      } else {
        setPermissionAndroidGranted(false);
      }
    } else {
      chooseUploadMethod();
    }
  }, []);

  const chooseUploadMethod = () => {
    return ActionSheet.show(
      {
        options: ['From Photos', 'Take a Picture', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Add Photo',
      },
      handleUploadProfilePhoto,
    );
  };

  const signUrlAndUpload = useCallback(
    async asset => {
      await getSignedUrl(
        {},
        {
          onSuccess: async res => {
            const { key, url } = res.data.payload;
            console.log({ key, url });
            await ApiUtils.uploadImageToSignedUrl({
              image: asset?.uri,
              url,
            });
            const payload = { payload: { key } };
            uploadProfilePhoto(payload, {
              onSuccess: () => {
                setUri({ uri: asset.uri });
              },
            });
          },
        },
      );
    },
    [getSignedUrl, uploadProfilePhoto],
  );

  const handleUploadProfilePhoto = useCallback(
    async (buttonIndex: number) => {
      /* Button Index:
       * 0 - Gallery
       * 1 - Camera
       */
      const useCamera = buttonIndex === 1;
      try {
        const options = { mediaType: 'photo' } as CameraOptions;
        const { assets } = useCamera
          ? await launchCamera(options)
          : await launchImageLibrary(options);
        const asset = assets && assets[0];
        signUrlAndUpload(asset);
      } catch (err) {
        console.log('imagepicker', { err });
      }
    },
    [signUrlAndUpload],
  );

  return (
    <View style={styles.profileImg}>
      <View style={styles.imgContainer}>
        <Animatable.Image
          useNativeDriver
          animation="zoomIn"
          duration={500}
          loadingIndicatorSource={R.images.profile_photo}
          source={uri}
          style={[
            StyleSheet.flatten(styles.img),
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
        {showUploadBtn ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.upload}
            onPress={handleUpload}>
            <Icon style={styles.uploadIcon} name="camera" />
          </TouchableOpacity>
        ) : null}
        {text ? (
          <Button transparent onPress={onPressText}>
            <Text uppercase style={styles.imgBtnTxt}>
              {text}
            </Text>
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default ProfileImg;
