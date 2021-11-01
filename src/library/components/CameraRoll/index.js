/* eslint-disable import/no-unresolved */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Permissions from 'react-native-permissions';
import { Alert } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  StyleProvider,
} from 'native-base';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { isEmpty } from 'lodash';

import Header from 'library/components/Header';
import Loading from 'library/components/Loading';
import LoadingModal from 'library/components/LoadingModal';
import PermissionPhotoRequired from 'library/components/PermissionPhotoRequired';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';

class CameraRoll extends PureComponent {
  state = {
    loading: false,
    selectedImage: {},
    photoPermission: '',
  }

  componentDidMount() {
    this.requestPermission();
  }

  requestPermission = async () => {
    const permission = await Permissions.check('photo');
    this.setState({ photoPermission: permission });
    if (permission !== 'authorized') {
      Permissions.request('photo').then((res) => {
        this.setState({ photoPermission: res });
      });
    }
  }

  getSelectedImage = (selectedImage) => {
    this.setState({ selectedImage });
  }

  handleSubmit = () => {
    const { selectedImage } = this.state;
    const { action } = this.props;
    if (isEmpty(selectedImage)) {
      Alert.alert('Choose an image');
    } else {
      action(selectedImage);
    }
  }

  cameraRoll = () => {
    const { actionText } = this.props;
    return (
      <Fragment>
        <Content>
          <CameraRollPicker
            maximum={1}
            assetType="Photos"
            imagesPerRow={3}
            imageMargin={5}
            callback={this.getSelectedImage}
            emptyText={R.strings.noPhotos}
            scrollRenderAheadDistance={500}
            initialListSize={1}
            pageSize={3}
            removeClippedSubviews
          />
        </Content>
        <Footer style={R.sharedStyles.footer}>
          <FooterTab style={R.sharedStyles.footerTab}>
            <Button
              block
              primary
              style={R.sharedStyles.btnFooter}
              onPress={this.handleSubmit}
            >
              <Text style={R.sharedStyles.txtBtnFooter}>
                { actionText }
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Fragment>
    );
  }

  renderContent = () => {
    const { photoPermission } = this.state;
    switch (photoPermission) {
      case 'authorized':
        return this.cameraRoll();
      case 'denied':
        return (
          <PermissionPhotoRequired
            onClick={this.requestPermission}
          />
        );
      case '':
        return <Loading />;
      default:
        return <Content />;
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <LoadingModal loading={loading} />
          <Header
            title="Choose from Gallery"
            hasBack
            onBackPress={() => navigation.goBack()}
          />
          { this.renderContent() }
        </Container>
      </StyleProvider>
    );
  }
}

CameraRoll.propTypes = {
  action: PropTypes.func,
  actionText: PropTypes.string,
};

CameraRoll.defaultProps = {
  action: () => {},
  actionText: 'Done',
};

export default CameraRoll;
