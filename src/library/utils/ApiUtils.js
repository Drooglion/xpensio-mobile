import { camelCase } from 'lodash';
import HelperUtils from 'library/utils/HelperUtils';
import ImageResizer from 'react-native-image-resizer';

const formatError = err => {
  const {
    networkError: {
      result: { code, payload },
    },
  } = err;
  const errorObj = {
    code,
    payload: {
      messages: payload.messages.map(msg => ({
        key: camelCase(msg.split(' ')[0]),
        value: msg.split(msg.split(' ')[0])[1],
      })),
    },
  };
  return errorObj;
};

const uploadImageToSignedUrl = ({ image, url }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { uri } = await ImageResizer.createResizedImage(
        image,
        1000,
        2000,
        'JPEG',
        80,
      );
      console.log({ uri });
      const file = {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      };
      /* eslint-disable no-undef */
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', 'image/jpeg');
      xhr.onload = () => {
        if (xhr.status !== 200) {
          /* eslint-disable no-console */
          reject(xhr.status);
        }
      };
      xhr.send(file);
      resolve(file);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      reject(error);
    }
  });

export default {
  formatError,
  uploadImageToSignedUrl,
};
