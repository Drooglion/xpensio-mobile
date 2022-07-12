import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { IUser } from 'types/User';
import * as Animatable from 'react-native-animatable';
import { Button, Text, Icon, View } from 'native-base';
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';
import Account from 'models/Account';

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

  const uploadProfilePhoto = () => {
    const options = {
      cameraType: 'front',
      mediaType: 'photo',
      saveToPhotos: true,
    };
    launchCamera(options, () => {});
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     this.save(response);
    //   }
    // });
  };

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
            onPress={uploadProfilePhoto}>
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
