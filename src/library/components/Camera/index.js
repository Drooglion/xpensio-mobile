/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Button,
  Icon,
  Thumbnail,
  Footer,
  FooterTab,
  StyleProvider,
} from 'native-base';
import { RNCamera } from 'react-native-camera';
import { isEmpty } from 'lodash';
import { withNavigation } from 'react-navigation';

import LoadingIndicator from 'library/components/LoadingIndicator';
import Header from 'library/components/Header';
import LoadingModal from 'library/components/LoadingModal';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      photo: {},
    };
  }

  retake = () => {
    this.setState({ photo: {} });
    this.camera.resumePreview();
  }

  capture = () => {
    this.setState({ loading: true });
    const options = {
      quality: 0.5,
      base64: true,
      pauseAfterCapture: true,
      fixOrientation: true,
      orientation: 'portrait',
    };
    this.camera.takePictureAsync(options)
      .then((res) => {
        this.setState({
          photo: res,
          loading: false,
        });
      });
  }

  render() {
    const {
      navigation,
      save,
      saving,
      chooseFromGallery,
      headerContent,
      type,
    } = this.props;
    const { loading, photo } = this.state;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container style={styles.container}>
          <Header
            androidStatusBarColor={R.colors.cameraFooterBg}
            hasBack
            backgroundColor={R.colors.cameraFooterBg}
            inverseFontColor
            onBackPress={() => navigation.goBack()}
            text={R.strings.uploadProfileImg}
            content={headerContent}
          />
          <Content contentContainerStyle={styles.cameraContainer} scrollEnabled={false}>
            <LoadingModal loading={loading} />
            <RNCamera
              ref={(ref) => { this.camera = ref; }}
              style={styles.preview}
              type={RNCamera.Constants.Type[type]}
              permissionDialogTitle="Permission to use camera"
              permissionDialogMessage="We need your permission to use your camera phone"
            />
          </Content>
          <Footer style={styles.footer}>
            <FooterTab style={styles.footerTab}>
              <Button transparent style={styles.btnRetake} onPress={this.retake}>
                <Thumbnail square source={R.images.ic_retake} style={styles.imgRetake} />
              </Button>
              {
                isEmpty(photo) ? (
                  <Button
                    transparent
                    style={styles.btnSnap}
                    onPress={this.capture}
                  >
                    <Thumbnail
                      square
                      source={R.images.ic_snap}
                      style={styles.imgSnap}
                    />
                  </Button>
                ) : (
                  <Button
                    transparent
                    style={styles.btnSnap}
                    onPress={() => save(photo)}
                  >
                    {
                      saving ? (
                        <LoadingIndicator color={R.colors.white} />
                      ) : (
                        <Icon name="checkmark" style={styles.iconSavePhoto} />
                      )
                    }
                  </Button>
                )
              }
              <Button
                transparent
                style={styles.btnGallery}
                onPress={chooseFromGallery}
              >
                <Thumbnail
                  square
                  source={R.images.ic_gallery}
                  style={styles.imgGallery}
                />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

Camera.propTypes = {
  save: PropTypes.func,
  saving: PropTypes.bool,
  chooseFromGallery: PropTypes.func,
  type: PropTypes.string,
};

Camera.defaultProps = {
  save: () => {},
  saving: false,
  chooseFromGallery: () => {},
  type: 'back',
};

export default withNavigation(Camera);
