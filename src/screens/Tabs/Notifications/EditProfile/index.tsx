import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { KeyboardAvoidingView } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  StyleProvider,
} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import { getName } from 'country-list';
import { capitalize, isEmpty } from 'lodash';
import Loading from 'library/components/Loading';

import Header from 'library/components/Header';
import LoadingIndicator from 'library/components/LoadingIndicator';

import ApiUtils from 'library/utils/ApiUtils';
import { useNavigation } from '@react-navigation/native';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import EditProfileForm from './EditProfileForm';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import useForm from 'hooks/useForm';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';

// const EditProfile = ({ updateProfile, showDialogModal }) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
//   const {
//     state: {
//       params: { profile },
//     },
//   } = navigation;
//   const { inputs, handleChange } = useForm({
//     title: profile.title || '',
//     firstName: profile.firstName || '',
//     middleName: profile.middleName || '',
//     lastName: profile.lastName || '',
//     email: profile.email || '',
//     mobileNumber: profile.mobileNumber || '',
//     birthday: (profile && moment(profile.birthday).format('YYYY-MM-DD')) || '',
//     nationality: profile.nationality || '',
//     gender: profile.gender || 0,
//     addressLine1: profile.addressLine1 || '',
//     addressLine2: profile.addressLine2 || '',
//     city: profile.city || '',
//     country: profile.country || getName(userLocaleCountryCode),
//     state: profile.state || '',
//     zipCode: profile.zipCode || '',
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const save = async () => {
//     try {
//       setLoading(true);
//       setErrors({});
//       const variables = { input: { ...inputs } };
//       await updateProfile({ variables });
//       setLoading(false);
//       showDialogModal({
//         variables: {
//           title: 'Saved',
//           description: 'Profile Updated',
//           icon: 'success',
//         },
//       });
//     } catch (error) {
//       setLoading(false);
//       console.log('error: ', { error });
//       const responseErrors = ApiUtils.formatError(error);
//       const {
//         payload: { messages },
//       } = responseErrors;
//       if (!isEmpty(messages)) {
//         messages.forEach(e => {
//           setErrors(prev => ({
//             ...prev,
//             [e.key]: e.value,
//           }));
//         });
//         showDialogModal({
//           variables: {
//             title: capitalize(messages[0].key),
//             description: capitalize(messages[0].value),
//           },
//         });
//       }
//     }
//   };

//   return (
//     <StyleProvider style={getTheme(theme)}>
//       <Container>
//         <Header
//           hasBack
//           title={R.strings.personalDetails}
//           onBackPress={() => navigation.goBack()}
//         />
//         <Content contentContainerStyle={styles.content}>
//           <KeyboardAvoidingView style={styles.form} enabled behavior="padding">
//             <EditProfileForm
//               errors={errors}
//               inputs={inputs}
//               handleChange={handleChange}
//               mobileNumberVerified={profile.mobileNumberVerified}
//               emailVerified={profile.emailVerified}
//               loading={loading}
//             />
//           </KeyboardAvoidingView>
//         </Content>
//         <Footer transparent style={styles.footer}>
//           <FooterTab style={styles.footerTab}>
//             <Button
//               danger
//               disabled={loading}
//               style={styles.btnCancel}
//               onPress={() => navigation.goBack()}>
//               <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
//             </Button>
//             <Button disabled={loading} style={styles.btnSave} onPress={save}>
//               {loading ? (
//                 <LoadingIndicator color={R.colors.white} size={5} />
//               ) : (
//                 <Text style={styles.btnTxt}>{R.strings.save}</Text>
//               )}
//             </Button>
//           </FooterTab>
//         </Footer>
//       </Container>
//     </StyleProvider>
//   );
// };

const EditProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data, loading } = useGetProfile();

  if (loading || !data) {
    return <Loading />;
  }

  const profile = data.profile;

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={R.strings.personalDetails}
          onBackPress={() => navigation.goBack()}
        />
        <Content
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.form} enabled behavior="padding">
            <EditProfileForm profile={profile} errors={{}} loading={false} />
          </KeyboardAvoidingView>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button
              danger
              disabled={loading}
              style={styles.btnCancel}
              onPress={() => navigation.goBack()}>
              <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
            </Button>
            <Button
              disabled={loading}
              style={styles.btnSave}
              onPress={() => {}}>
              {loading ? (
                <LoadingIndicator color={R.colors.white} size={5} />
              ) : (
                <Text style={styles.btnTxt}>{R.strings.save}</Text>
              )}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default EditProfile;
