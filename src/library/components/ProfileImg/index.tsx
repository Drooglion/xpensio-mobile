import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { launchCamera } from 'react-native-image-picker';
import User from 'models/User';
import * as Animatable from 'react-native-animatable';
import { Button, Text, Icon, View } from 'native-base';

// import ApiUtils from 'library/utils/ApiUtils';
// import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';
import styles from './styles';

type Props = {
  text?: string;
  onPressText?: () => void;
  showUploadBtn: Boolean;
  size: number;
  user: User;
};
const ProfileImg = ({
  user,
  text,
  onPressText,
  showUploadBtn,
  size = 70,
}: Props) => {
  const [uri, setUri] = useState<string | null>(user.photoUrl);

  const onError = () => {
    setUri(R.images.profile_photo);
  };

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
          onError={this.onError}
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

ProfileImg.propTypes = {
  text: PropTypes.string,
  onPressText: PropTypes.func,
  showUploadBtn: PropTypes.bool,
  size: PropTypes.number,
  user: PropTypes.instanceOf(Object).isRequired,
  getSignedUrl: PropTypes.func,
  setPhotoUrl: PropTypes.func,
  uploadProfileImg: PropTypes.func,
};

ProfileImg.defaultProps = {
  text: '',
  onPressText: () => {},
  showUploadBtn: false,
  size: 70,
  getSignedUrl: () => {},
  setPhotoUrl: () => {},
  uploadProfileImg: () => {},
};

// export default compose(
//   graphql(STORE_QUERIES.user, { props: ({ data: { user } }) => ({ user }) }),
//   graphql(PROFILE.GET_SIGNED_URL_FOR_UPLOAD, { name: 'getSignedUrl' }),
//   graphql(STORE_MUTATIONS.setPhotoUrl, { name: 'setPhotoUrl' }),
//   graphql(PROFILE.UPLOAD_PROFILE_IMG, {
//     name: 'uploadProfileImg',
//     options: {
//       refetchQueries: [{ query: PROFILE.MY_PROFILE }],
//     },
//   }),
// )(ProfileImg);

export default ProfileImg;
