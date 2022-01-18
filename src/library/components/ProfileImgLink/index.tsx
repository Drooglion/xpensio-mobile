import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'native-base';
import * as Animatable from 'react-native-animatable';

import R from 'res/R';
import styles from './styles';

export interface ProfileImgLinkPropsType {
  text: string;
  onPressText(): void;
  size: number;
  user: any;
}

const defaultProps: ProfileImgLinkPropsType = {
  text: '',
  size: 70,
  onPressText: () => {},
  user: null,
};

const ProfileImgLink = ({
  text,
  size,
  user,
  onPressText,
}: ProfileImgLinkPropsType) => {
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

  const onError = () => {
    setUri(R.images.profile_photo);
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
          onError={onError}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
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

ProfileImgLink.defaultProps = defaultProps;

export default ProfileImgLink;
