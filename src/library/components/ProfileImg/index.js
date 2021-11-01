/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import {
  Button,
  Text,
  Icon,
  View
} from 'native-base';

import PROFILE from 'library/api/Profile';
import STORE_MUTATIONS from 'library/store/mutations';
import STORE_QUERIES from 'library/store/queries';
import ApiUtils from 'library/utils/ApiUtils';
import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';
import styles from './styles';

class ProfileImg extends Component {
  state = { uri: '' };

  componentWillMount() {
    const { user: { photoUrl } } = this.props;
    this.setUri(photoUrl);
  }

  componentWillReceiveProps(nextProps) {
    const { user: { photoUrl } } = nextProps;
    this.setUri(photoUrl);
  }

  setUri = (photoUrl) => {
    this.setState({ uri: photoUrl ? { uri: photoUrl } : R.images.profile_photo });
  }

  onError = () => {
    this.setState({ uri: R.images.profile_photo });
  }

  uploadProfilePhoto = () => {
    const options = { cameraType: 'front' };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.save(response);
      }
    });
  }

  save = async (photo) => {
    try {
      const { getSignedUrl } = this.props;
      const variables = {
        input: {
          fileType: 'image/jpeg',
          fileExt: 'jpg'
        },
      };
      const res = await getSignedUrl({ variables });
      const { data: { profile: { payload: { key, url } } } } = res;
      await ApiUtils.uploadImageToSignedUrl({ image: photo.uri, url });
      this.upload(key, photo);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
    }
  };

  upload = async (key, photo) => {
    const variables = { input: { key } };
    const { uploadProfileImg, setPhotoUrl } = this.props;
    try {
      await uploadProfileImg({ variables });
      await setPhotoUrl({ variables: { photoUrl: photo.uri } });
    } catch (error) {
      console.log('Error uploading:', { error });
    }
  };

  render() {
    const {
      text,
      onPressText,
      showUploadBtn,
      size
    } = this.props;

    const { uri } = this.state;

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
                borderRadius: (size / 2),
              }
            ]}
          />
          {
            showUploadBtn ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.upload}
                onPress={this.uploadProfilePhoto}
              >
                <Icon style={styles.uploadIcon} name="camera" />
              </TouchableOpacity>
            ) : null
          }
          {
            text ? (
              <Button transparent onPress={onPressText}>
                <Text uppercase style={styles.imgBtnTxt}>
                  {text}
                </Text>
              </Button>
            ) : null
          }
        </View>
      </View>
    );
  }
}

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

export default compose(
  graphql(STORE_QUERIES.user, { props: ({ data: { user } }) => ({ user }) }),
  graphql(PROFILE.GET_SIGNED_URL_FOR_UPLOAD, { name: 'getSignedUrl' }),
  graphql(STORE_MUTATIONS.setPhotoUrl, { name: 'setPhotoUrl' }),
  graphql(
    PROFILE.UPLOAD_PROFILE_IMG, {
      name: 'uploadProfileImg',
      options: {
        refetchQueries: [{ query: PROFILE.MY_PROFILE }]
      }
    }
  ),
)(ProfileImg);
