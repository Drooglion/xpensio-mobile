import React from 'react';
import { IProfileType } from 'types/Profile';
import { Icon, Item, Input, Label, Picker, Text, View } from 'native-base';
import { isNil, sortBy } from 'lodash';
import { getCode } from 'country-list';
import moment from 'moment';

import DatePickerField from 'library/components/DatePickerField';
import PickerInput from 'library/components/PickerInput';
import CountryInput from 'library/components/CountryInput';
import REFERENCES from 'library/api/References';
import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';
import styles from './styles';
import useForm from 'hooks/useForm';
import dayjs from 'dayjs';

type Props = {
  profile: IProfileType;
  errors: Record<string, string>;
  loading: boolean;
};

const EditProfileForm = ({ profile, errors, loading }: Props) => {
  const mobileNumberVerified = profile.mobileNumberVerified;
  const emailVerified = profile.emailVerified;
  const { inputs, handleChange } = useForm({
    title: profile.title || '',
    firstName: profile.firstName || '',
    middleName: profile.middleName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    mobileNumber: profile.mobileNumber || '',
    birthday: (profile && dayjs(profile.birthday).format('YYYY-MM-DD')) || '',
    nationality: profile.nationality || '',
    gender: profile.gender || 0,
    addressLine1: profile.addressLine1 || '',
    addressLine2: profile.addressLine2 || '',
    city: profile.city || '',
    country: profile.country || '',
    state: profile.state || '',
    zipCode: profile.zipCode || '',
  });
  console.log({ profile });

  return (
    <>
      {/* <View>
        <Item stackedLabel error={!isNil(errors.title)}>
          <Label style={styles.label}>{R.strings.title}</Label>
          <Query query={REFERENCES.TITLES}>
            {({ error, loading: loadingData, data }) => {
              let titleList = [];

              if (error) {
                HelperUtils.bugsnag.notify(error);
                return null;
              }

              if (loadingData) return <LoadingIndicator size={3} />;

              const {
                titles: {
                  payload: { titles },
                },
              } = data;
              titleList = titles;

              return (
                <PickerInput
                  disabled={loading}
                  mode="dropdown"
                  onValueChange={text => handleChange('title', text)}
                  placeHolder={R.strings.title}
                  placeholderIconColor={R.colors.subhead}
                  selectedValue={inputs.title || ''}>
                  {titleList.map(title => (
                    <Picker.Item
                      key={title.code}
                      label={title.description}
                      value={title.code}
                    />
                  ))}
                </PickerInput>
              );
            }}
          </Query>
        </Item>
        <Item stackedLabel error={!isNil(errors.nationality)}>
          <Label style={styles.label}>{R.strings.nationality}</Label>
          <Query query={REFERENCES.NATIONALITIES}>
            {({ error, loading: loadingData, data }) => {
              let nationalityList = [];

              if (error) {
                HelperUtils.bugsnag.notify(error);
                return null;
              }

              if (loadingData) return <LoadingIndicator size={3} />;

              const {
                nationalities: {
                  payload: { nationalities },
                },
              } = data;
              nationalityList = sortBy(nationalities, 'code');

              return (
                <PickerInput
                  disabled={loading}
                  mode="dropdown"
                  onValueChange={text => handleChange('nationality', text)}
                  placeHolder={R.strings.nationality}
                  placeholderIconColor={R.colors.subhead}
                  selectedValue={inputs.nationality || null}>
                  {nationalityList.map(nationality => (
                    <Picker.Item
                      key={nationality.code}
                      label={nationality.code}
                      value={nationality.code}
                    />
                  ))}
                </PickerInput>
              );
            }}
          </Query>
        </Item>
      </View> */}
      <Item
        stackedLabel
        error={!isNil(errors?.birthday)}
        style={styles.itemLeft}>
        <Label style={styles.label}>{R.strings.birthday}</Label>
        <DatePickerField />
      </Item>
      <Item stackedLabel error={!isNil(errors?.gender)}>
        <Label style={styles.label}>{R.strings.gender}</Label>
        <PickerInput
          disabled={loading}
          mode="dropdown"
          onValueChange={(text: string) => handleChange('gender', text)}
          placeHolder={R.strings.gender}
          placeholderIconColor={R.colors.subhead}
          selectedValue={inputs.gender.toString() || '0'}>
          <Picker.Item label={R.strings.female} value="0" key={0} />
          <Picker.Item label={R.strings.male} value="1" key={1} />
        </PickerInput>
      </Item>
      <Item error={!isNil(errors?.mobileNumber)}>
        <View style={{ flex: 1 }}>
          <Label style={styles.label}>{R.strings.mobileNumber}</Label>
          <View style={{ position: 'relative' }}>
            <Input
              disabled={loading}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              textContentType="telephoneNumber"
              keyboardType="numeric"
              onChangeText={text => handleChange('mobileNumber', text)}
              value={inputs.mobileNumber || ''}
            />
            <Icon
              name="checkmark-circle"
              style={[
                styles.checkmark,
                mobileNumberVerified
                  ? styles.checkmarkVerified
                  : styles.checkmarkUnverified,
              ]}
            />
          </View>
        </View>
      </Item>
      <Item error={!isNil(errors?.email)}>
        <View style={{ flex: 1 }}>
          <Label style={styles.label}>{R.strings.email}</Label>
          <View style={{ position: 'relative' }}>
            <Input
              disabled={loading}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={text => handleChange('email', text)}
              value={inputs.email || ''}
            />
            <Icon
              name="checkmark-circle"
              style={[
                styles.checkmark,
                emailVerified
                  ? styles.checkmarkVerified
                  : styles.checkmarkUnverified,
              ]}
            />
          </View>
        </View>
      </Item>
      <Item stackedLabel error={!isNil(errors?.firstName)}>
        <Label style={styles.label}>{R.strings.firstName}</Label>
        <Input
          disabled={loading}
          returnKeyType="next"
          autoCorrect={false}
          style={styles.input}
          textContentType="givenName"
          onChangeText={text => handleChange('firstName', text)}
          value={inputs.firstName || ''}
        />
      </Item>
      <Item stackedLabel error={!isNil(errors?.middleName)}>
        <Label style={styles.label}>{R.strings.middleName}</Label>
        <Input
          disabled={loading}
          returnKeyType="next"
          autoCorrect={false}
          style={styles.input}
          textContentType="givenName"
          onChangeText={text => handleChange('middleName', text)}
          value={inputs.middleName || ''}
        />
      </Item>
      <Item stackedLabel error={!isNil(errors?.lastName)}>
        <Label style={styles.label}>{R.strings.lastName}</Label>
        <Input
          disabled={loading}
          returnKeyType="next"
          autoCorrect={false}
          style={styles.input}
          textContentType="name"
          onChangeText={text => handleChange('lastName', text)}
          value={inputs.lastName || ''}
        />
      </Item>
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>{R.strings.address}</Text>
        <Item stackedLabel error={!isNil(errors?.addressLine1)}>
          <Label style={styles.label}>{R.strings.addressLine1}</Label>
          <Input
            disabled={loading}
            returnKeyType="next"
            autoCorrect={false}
            style={styles.input}
            onChangeText={text => handleChange('addressLine1', text)}
            maxLength={32}
            multiline
            value={inputs.addressLine1 || ''}
          />
        </Item>
        <Item stackedLabel error={!isNil(errors?.addressLine2)}>
          <Label style={styles.label}>{R.strings.addressLine2}</Label>
          <Input
            disabled={loading}
            returnKeyType="next"
            autoCorrect={false}
            style={styles.input}
            onChangeText={text => handleChange('addressLine2', text)}
            maxLength={32}
            multiline
            value={inputs.addressLine2 || ''}
          />
        </Item>
        <Item stackedlabel error={!isNil(errors?.country)}>
          <CountryInput
          // disabled={loading}
          // onChange={country => handleChange('country', country.name)}
          // cca2={getCode(inputs.country)}
          />
        </Item>
        <Item stackedLabel error={!isNil(errors?.state)}>
          <Label style={styles.label}>{R.strings.state}</Label>
          <Input
            disabled={loading}
            returnKeyType="next"
            autoCorrect={false}
            style={styles.input}
            onChangeText={text => handleChange('state', text)}
            value={inputs.state || ''}
          />
        </Item>
        <Item stackedLabel error={!isNil(errors?.city)}>
          <Label style={styles.label}>{R.strings.city}</Label>
          <Input
            disabled={loading}
            returnKeyType="next"
            autoCorrect={false}
            style={styles.input}
            onChangeText={text => handleChange('city', text)}
            value={inputs.city || ''}
          />
        </Item>
        <Item stackedLabel error={!isNil(errors?.zipCode)}>
          <Label style={styles.label}>{R.strings.zipCode}</Label>
          <Input
            disabled={loading}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => handleChange('zipCode', text)}
            value={inputs.zipCode || ''}
          />
        </Item>
      </View>
    </>
  );
};

export default EditProfileForm;
