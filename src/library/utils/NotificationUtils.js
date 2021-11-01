/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import HelperUtils from 'library/utils/HelperUtils';
import R from 'res/R';

const handleNotification = async ({
  message,
  metadata,
  navigation,
}) => (
  new Promise(async (resolve, reject) => {
    const { code, id } = metadata;
    try {
      switch (code) {
        case 'create_request':
        case 'approve_request':
        case 'deny_request':
          navigation.navigate({
            routeName: 'RequestsDetail',
            key: 'RequestsDetail',
            params: { id, refetch: () => {} }
          });
          resolve(['OK', code]);
          break;
        case 'create_payment':
          navigation.navigate({
            routeName: 'PaymentsDetails',
            key: 'PaymentsDetails',
            params: {
              id,
              refetch: () => {},
              paymentTab: '',
            }
          });
          resolve(['OK', code]);
          break;
        case 'failed_payment_pre_authorization':
          navigation.navigate({
            routeName: 'NotificationMessage',
            key: 'NotificationMessage',
            params: {
              text: message,
              image: R.images.empty_payments,
            }
          });
          resolve(['OK', code]);
          break;
        case 'request_card':
          resolve(['OK', code]);
          break;
        case 'approve_card_request':
        case 'deny_card_request':
        case 'create_card_for_user':
          navigation.navigate('MyCards');
          resolve(['OK', code]);
          break;
        default:
          resolve(['OK', code]);
          break;
      }
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      console.log('Error handling noticication: ', { error });
      reject(error);
    }
  })
);

export default {
  handleNotification,
};
