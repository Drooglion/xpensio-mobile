import { getCollection } from './firebaseHelper';

class Collection {
  constructor(doc: any) {
    Object.assign(this, doc || {});
  }

  save() {
    const { id, ...doc } = this;
    if (id) {
      Collection.update(id, doc);
    } else {
      Collection.add(doc);
    }
  }

  static getCollectionName() {
    return '';
  }

  static collection() {
    return getCollection(this.getCollectionName());
  }

  static async add(doc: any) {
    try {
      const { path, id } = await getCollection(this.getCollectionName()).add(
        doc,
      );
      return { path, id };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async remove(id: any) {
    try {
      await getCollection(this.getCollectionName()).doc(id).delete();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findById(id: any) {
    try {
      const snap = await getCollection(this.getCollectionName()).doc(id).get();
      if (snap.exists) {
        return snap.data();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
    return null;
  }

  static async findAll() {
    try {
      const data: any[] = [];
      const snap = await getCollection(this.getCollectionName()).get();
      if (snap.size) {
        snap.forEach(({ id, ...arg }) => {
          data.push({ id, ...arg.data() });
        });
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async update(id: any, doc: any) {
    try {
      const document = { ...doc };
      delete document.id;
      await getCollection(this.getCollectionName()).doc(id).update(document);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default Collection;
