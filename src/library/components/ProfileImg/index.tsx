import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
  const [uri, setUri] = useState<any>();
  const { mutate: getSignedUrl } = useGetSignedUrl();
  const { mutate: uploadProfilePhoto } = useUploadProfilePhoto();

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

  const save = async photo => {
    // try {
    //   const { getSignedUrl } = this.props;
    //   const variables = {
    //     input: {
    //       fileType: 'image/jpeg',
    //       fileExt: 'jpg'
    //     },
    //   };
    //   const res = await getSignedUrl({ variables });
    //   const { data: { profile: { payload: { key, url } } } } = res;
    //   await ApiUtils.uploadImageToSignedUrl({ image: photo.uri, url });
    //   this.upload(key, photo);
    // } catch (error) {
    //   HelperUtils.bugsnag.notify(error);
    // }
  };

  const upload = async (key, photo) => {
    // const variables = { input: { key } };
    // const { uploadProfileImg, setPhotoUrl } = this.props;
    // try {
    //   await uploadProfileImg({ variables });
    //   await setPhotoUrl({ variables: { photoUrl: photo.uri } });
    // } catch (error) {
    //   console.log('Error uploading:', { error });
    // }
  };
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
            onPress={chooseUploadMethod}>
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
