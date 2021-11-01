import { getCollection } from './firebaseHelper';

class Collection {
  constructor(doc) {
    Object.assign(this, doc || {});
  }

  save() {
    const { id, ...doc } = this;
    if (id) {
      this.constructor.update(id, doc);
    } else {
      this.constructor.add(doc);
    }
  }

  static getCollectionName() {
    return '';
  }

  static collection() {
    return getCollection(this.getCollectionName());
  }

  static async add(doc) {
    try {
      const { path, id } = await getCollection(this.getCollectionName()).add(doc);
      return { path, id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async remove(id) {
    try {
      await getCollection(this.getCollectionName()).doc(id).delete();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findById(id) {
    try {
      const snap = await getCollection(this.getCollectionName()).doc(id).get();
      if (snap.exists) {
        return snap.data();
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return null;
  }

  static async findAll() {
    try {
      const data = [];
      const snap = await getCollection(this.getCollectionName()).get();
      if (snap.size) {
        snap.forEach(({ id, ...arg }) => {
          data.push({ id, ...arg.data() });
        });
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, doc) {
    try {
      const document = { ...doc };
      delete document.id;
      await getCollection(this.getCollectionName()).doc(id).update(document);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Collection;
