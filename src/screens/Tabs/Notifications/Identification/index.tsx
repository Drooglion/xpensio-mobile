import React, { Fragment, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Item,
  Text,
  StyleProvider,
  View,
} from 'native-base';
import { capitalize, isNil } from 'lodash';
import ImageLoad from 'react-native-image-placeholder';

import Header from 'library/components/Header';
import ImageView from 'library/components/ImageView';
import DateUtils from 'library/utils/DateUtils';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IIdentification } from 'types/Profile';

const Identification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [viewImage, setViewImage] = useState<any>(null);
  const [identification, setIdentification] = useState<IIdentification>();

  useEffect(() => {
    if (route.params) {
      const { profile } = route.params as any;
      console.log('params', route.params);
      if (profile) {
        setIdentification(profile.identification);
      }
    }
  }, [route]);
  /* const {
    state: {
      params: { identification },
    },
  } = navigation; */

  const onEdit = () => {
    /* navigation.navigate({
      routeName: 'EditIdentification',
      key: 'EditIdentification',
      params: identification,
    }); */
  };

  const showFrontIdOnly = () =>
    identification && identification.type === 'passport';

  const renderDetails = () => {
    const frontUri =
      identification && identification.photoFrontUrl
        ? { uri: identification.photoFrontUrl }
        : R.images.id_front;
    const backUri =
      identification && identification.photoBackUrl
        ? { uri: identification.photoBackUrl }
        : R.images.id_back;

    return (
      <Fragment>
        <ImageView
          visible={!isNil(viewImage)}
          imageUrls={[viewImage]}
          onClose={() => setViewImage(null)}
        />
        <Item style={styles.item}>
          <Text style={styles.label}>{R.strings.idType}</Text>
          <Text style={styles.text}>
            {(identification && capitalize(identification.type)) || ''}
          </Text>
        </Item>
        <Item style={styles.item}>
          <Text style={styles.label}>{R.strings.country}</Text>
          <Text style={styles.text}>
            {(identification && identification.country) || ''}
          </Text>
        </Item>
        <Item style={styles.item}>
          <Text style={styles.label}>{R.strings.idNumber}</Text>
          <Text style={styles.text}>
            {(identification && identification.number) || ''}
          </Text>
        </Item>
        <Item style={styles.item}>
          <Text style={styles.label}>{R.strings.dateOfExpiry}</Text>
          <Text style={styles.text}>
            {(identification &&
              DateUtils.formatExpiry(identification.expirationDate)) ||
              ''}
          </Text>
        </Item>
        <Item style={styles.item}>
          <Text style={styles.label}>{R.strings.frontOfId}</Text>
          <TouchableOpacity onPress={() => setViewImage({ url: frontUri.uri })}>
            <ImageLoad style={styles.image} source={frontUri} />
          </TouchableOpacity>
        </Item>
        {showFrontIdOnly() ? null : (
          <Item style={styles.item}>
            <Text style={styles.label}>{R.strings.backOfId}</Text>
            <ImageLoad style={styles.image} source={backUri} />
          </Item>
        )}
      </Fragment>
    );
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={R.strings.identification}
          onBackPress={() => navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          <View style={styles.form}>{renderDetails()}</View>
        </Content>
        {/* <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button primary style={styles.btnAction} onPress={onEdit}>
              <Text style={styles.btnTxt}>{R.strings.edit}</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    </StyleProvider>
  );
};

export default Identification;
