/* eslint-disable no-useless-constructor */
import Collection from './Collection';

import { getCollection } from './firebaseHelper';

class Request extends Collection {
  constructor(doc) {
    super(doc);
  }

  static getCollectionName() {
    return 'Request';
  }

  static async set(id, doc) {
    try {
      await getCollection(this.getCollectionName()).doc(id).set(doc);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getMessages(requestId) {
    try {
      const messages = [];
      const messagesSnap = await getCollection(this.getCollectionName())
        .doc(requestId)
        .collection('messages')
        .get();

      if (messagesSnap.size) {
        messagesSnap.forEach(({ id, ...arg }) => {
          messages.push({ id, ...arg.data() });
        });
      }
      return messages;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Request;
