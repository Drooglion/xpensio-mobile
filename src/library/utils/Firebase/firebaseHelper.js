import firebase from 'react-native-firebase';
import pluralize from 'pluralize';

const database = firebase.firestore();

const generateCollectionName = name => pluralize(name);

const getCollection = name => database.collection(generateCollectionName(name));

export { generateCollectionName, getCollection };
