/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { Fragment, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { compose, graphql, Query } from 'react-apollo';
import {
  Button,
  Container,
  Content,
  DatePicker,
  Footer,
  FooterTab,
  Label,
  Item,
  Input,
  Picker,
  Text,
  StyleProvider,
  View
} from 'native-base';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import { getName, getCode } from 'country-list';

import STORE_MUTATIONS from 'library/store/mutations';
import REFERENCES from 'library/api/References';
import ApiUtils from 'library/utils/ApiUtils';
import HelperUtils from 'library/utils/HelperUtils';
import hooks from 'library/hooks';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';

import CountryInput from 'library/components/CountryInput';
import Header from 'library/components/Header';
import LoadingIndicator from 'library/components/LoadingIndicator';
import PROFILE from 'library/api/Profile';
import PickerInput from 'library/components/PickerInput';
import PhotoIdRemovable from './PhotoIdRemovable';
import UploadIdentificationIdButton from './UploadIdentificationIdButton';

import styles from './styles';

const EditIdentification = ({
  navigation,
  getSignedUrlFrontId,
  getSignedUrlBackId,
  updateIdentification,
  showDialogModal,
}) => {
  const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
  const { state: { params } } = navigation;
  const [loading, setLoading] = useState(false);
  const { inputs, handleChange } = hooks.useForm({
    idType: (params && params.type) || null,
    country: (params && params.country) || getName(userLocaleCountryCode),
    idNumber: (params && params.number) || '',
    dateOfExpiry: (params && moment(params.expirationDate).format('YYYY-MM-DD')) || moment(new Date()).format('YYYY-MM-DD'),
    frontId: (params && params.photoFrontUrl) || null,
    backId: (params && params.photoBackUrl) || null,
  });

  const uploadFromCamera = (type) => {
    const options = { cameraType: 'front' };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uploadId = type === 'front' ? updateFrontId : updateBackId;
        uploadId(response.uri);
      }
    });
  };

  const uploadFromGallery = (type) => {
    const options = { cameraType: 'front' };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uploadId = type === 'front' ? updateFrontId : updateBackId;
        uploadId(response.uri);
      }
    });
  };

  const updateFrontId = (uri) => { handleChange('frontId', uri); };

  const updateBackId = (uri) => { handleChange('backId', uri); };

  const handleDateChange = (dateOfExpiry) => {
    handleChange(
      'dateOfExpiry',
      moment(new Date(dateOfExpiry)).format('YYYY-MM-DD')
    );
  };

  const showFrontIdOnly = () => (
    inputs.idType === 'passport'
  );

  const validateInputs = () => {
    const validateInputValues = { ...inputs };
    if (showFrontIdOnly()) {
      delete validateInputValues.backId;
    }

    return Object.values(validateInputValues).includes('' || null);
  };

  const handleSubmit = async () => {
    try {
      if (validateInputs()) {
        showErrorDialog();
      } else {
        setLoading(true);
        const signedUrlVariables = {
          input: {
            fileType: 'image/jpeg',
            fileExt: 'jpg'
          },
        };
        const variables = {
          input: {
            type: inputs.idType || '',
            country: inputs.country || '',
            number: inputs.idNumber || '',
            expirationDate: inputs.dateOfExpiry || '',
            photoFront: inputs.frontId || '',
            photoBack: showFrontIdOnly() ? '' : inputs.backId || '',
          }
        };
        const signedUrlFrontId = await getSignedUrlFrontId({ variables: signedUrlVariables });
        const signedUrlBackId = await getSignedUrlBackId({ variables: signedUrlVariables });

        await ApiUtils.uploadImageToSignedUrl({
          image: inputs.frontId || '',
          url: signedUrlFrontId.data.profile.payload.url
        });
        await ApiUtils.uploadImageToSignedUrl({
          image: inputs.backId || '',
          url: signedUrlBackId.data.profile.payload.url
        });

        variables.input.photoFront = signedUrlFrontId.data.profile.payload.key;
        variables.input.photoBack = showFrontIdOnly() ? '' : signedUrlBackId.data.profile.payload.key;

        await updateIdentification({ variables });
        navigation.navigate('Identification', {
          identification: {
            type: inputs.idType || '',
            country: inputs.country || '',
            number: inputs.idNumber || '',
            expirationDate: inputs.dateOfExpiry || '',
            photoFrontUrl: inputs.frontId || '',
            photoBackUrl: inputs.backId || '',
          }
        });
        setLoading(false);
      }
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      setLoading(false);
      console.log('Error saving identification: ', { error });
    }
  };

  const showErrorDialog = () => {
    showDialogModal({
      variables: {
        title: R.strings.allFieldsAreRequired,
        description: R.strings.pleaseFillUpAllFields,
      }
    });
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={`${R.strings.edit} ${R.strings.identification}`}
          onBackPress={() => navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          <KeyboardAvoidingView style={styles.form} enabled behavior="padding">
            <Item stackedLabel>
              <Label style={styles.label}>{R.strings.idType}</Label>
              <Query query={REFERENCES.ID_TYPES}>
                {({ error, loading: loadingData, data }) => {
                  if (error) {
                    HelperUtils.bugsnag.notify(error);
                    return null;
                  }

                  if (loadingData) return <LoadingIndicator size={3} />;

                  const { idTypes: { payload: { idTypes } } } = data;

                  return (
                    <PickerInput
                      disabled={loading}
                      mode="dropdown"
                      style={{ width: undefined }}
                      onValueChange={text => handleChange('idType', text)}
                      placeHolder={R.strings.idType}
                      placeholderIconColor={R.colors.subhead}
                      selectedValue={inputs.idType}
                    >
                      {
                        idTypes.map(idType => (
                          <Picker.Item
                            key={idType.code}
                            label={idType.description}
                            value={idType.code}
                          />
                        ))
                      }
                    </PickerInput>
                  );
                }}
              </Query>
            </Item>
            <Item stackedLabel style={styles.itemLeft}>
              <CountryInput
                disabled={loading}
                onChange={country => handleChange('country', country.name)}
                cca2={inputs.country ? getCode(inputs.country) : userLocaleCountryCode}
              />
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>{R.strings.idNumber}</Label>
              <Input
                disabled={loading}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                value={inputs.idNumber}
                onChangeText={text => handleChange('idNumber', text)}
              />
            </Item>
            <Item stackedLabel style={styles.itemLeft}>
              <Label style={styles.label}>{R.strings.dateOfExpiry}</Label>
              <DatePicker
                disabled={loading}
                defaultDate={new Date(inputs.dateOfExpiry)}
                locale="en"
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                onDateChange={handleDateChange}
              />
            </Item>
            <Item style={styles.itemUpload}>
              <View style={{ flex: 1 }}>
                <Label style={styles.label}>{R.strings.frontOfId}</Label>
                {
                  inputs.frontId ? (
                    <PhotoIdRemovable
                      onRemove={() => handleChange('frontId', null)}
                      source={{ uri: inputs.frontId }}
                    />
                  ) : (
                    <UploadIdentificationIdButton
                      type="front"
                      uploadFromCamera={uploadFromCamera}
                      uploadFromGallery={uploadFromGallery}
                    />
                  )
                }
              </View>
            </Item>
            {
              showFrontIdOnly() ? null : (
                <Item style={styles.itemUpload}>
                  <View style={{ flex: 1 }}>
                    <Label style={styles.label}>{R.strings.backOfId}</Label>
                    {
                      inputs.backId ? (
                        <PhotoIdRemovable
                          onRemove={() => handleChange('backId', null)}
                          source={{ uri: inputs.backId }}
                        />
                      ) : (
                        <UploadIdentificationIdButton
                          type="back"
                          uploadFromCamera={uploadFromCamera}
                          uploadFromGallery={uploadFromGallery}
                        />
                      )
                    }
                  </View>
                </Item>
              )
            }
          </KeyboardAvoidingView>
        </Content>
        <Footer transparent style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Fragment>
              <Button
                disabled={loading}
                style={styles.btnCancel}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
              </Button>
              <Button
                style={styles.btnSave}
                onPress={handleSubmit}
                disabled={loading}
              >
                {
                  loading ? (
                    <LoadingIndicator color={R.colors.white} size={5} />
                  ) : (
                    <Text style={styles.btnTxt}>{R.strings.save}</Text>
                  )
                }
              </Button>
            </Fragment>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default compose(
  graphql(STORE_MUTATIONS.showDialogModal, { name: 'showDialogModal' }),
  graphql(PROFILE.GET_SIGNED_URL_FOR_FRONT_ID, { name: 'getSignedUrlFrontId' }),
  graphql(PROFILE.GET_SIGNED_URL_FOR_BACK_ID, { name: 'getSignedUrlBackId' }),
  graphql(PROFILE.UPDATE_IDENTIFICATION, {
    name: 'updateIdentification',
    options: {
      refetchQueries: [{ query: PROFILE.MY_PROFILE }]
    }
  }),
)(EditIdentification);
