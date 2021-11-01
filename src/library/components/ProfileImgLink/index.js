/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  View
} from 'native-base';
import * as Animatable from 'react-native-animatable';

import STORE_QUERIES from 'library/store/queries';
import R from 'res/R';
import styles from './styles';

class ProfileImgLink extends Component {
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

  render() {
    const {
      text,
      onPressText,
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

ProfileImgLink.propTypes = {
  text: PropTypes.string,
  onPressText: PropTypes.func,
  size: PropTypes.number,
  user: PropTypes.instanceOf(Object).isRequired,
};

ProfileImgLink.defaultProps = {
  text: '',
  onPressText: () => {},
  size: 70
};

export default compose(
  graphql(STORE_QUERIES.user, { props: ({ data: { user } }) => ({ user }) })
)(ProfileImgLink);
