/* eslint-disable import/no-unresolved */
import defaults from 'library/store/defaults';
import QUERIES from './queries';

const resolvers = {
  Mutation: {
    updateCompanyConfiguration: (_, args, { cache }) => {
      const query = QUERIES.companyConfiguration;
      const prev = cache.readQuery({ query });
      const data = {
        companyConfiguration: {
          ...prev.companyConfiguration,
          ...args
        }
      };
      cache.writeQuery({ query, data });
      return data;
    },
    updateRole: (_, args, { cache }) => {
      const query = QUERIES.role;
      const data = { role: args.role };
      cache.writeQuery({ query, data });
      return data;
    },
    updateLoadingModal: (_, args, { cache }) => {
      const query = QUERIES.loadingModal;
      const data = { loadingModal: args.loadingModal };
      cache.writeQuery({ query, data });
      return data;
    },
    showDialogModal: (_, args, { cache }) => {
      const query = QUERIES.dialogModal;
      const { dialogModal } = defaults;
      const data = { dialogModal: { ...dialogModal, ...args, visible: true } };
      cache.writeQuery({ query, data });
      return data;
    },
    closeDialogModal: (_, args, { cache }) => {
      const query = QUERIES.dialogModal;
      const { dialogModal } = defaults;
      const data = { dialogModal };
      cache.writeQuery({ query, data });
      return data;
    },
    setViewedCardNumber: (_, args, { cache }) => {
      const query = QUERIES.viewedCardNumber;
      const data = { viewedCardNumber: args.viewedCardNumber };
      cache.writeQuery({ query, data });
      return data;
    },
    clearViewedCardNumber: (_, args, { cache }) => {
      const query = QUERIES.viewedCardNumber;
      const data = { viewedCardNumber: 'n/a' };
      cache.writeQuery({ query, data });
      return data;
    },
    updateUser: (_, args, { cache }) => {
      const query = QUERIES.user;
      const prev = cache.readQuery({ query });
      const data = { user: { ...prev.user, ...args } };
      cache.writeQuery({ query, data });
      return data;
    },
    setPhotoUrl: (_, args, { cache }) => {
      const query = QUERIES.user;
      const prev = cache.readQuery({ query });
      const data = { user: { ...prev.user, photoUrl: args.photoUrl } };
      cache.writeQuery({ query, data });
      return data;
    },
    setPrivelege: (_, args, { cache }) => {
      const query = QUERIES.privilege;
      const prev = cache.readQuery({ query });
      const data = { privilege: { ...prev.privilege, ...args } };
      cache.writeQuery({ query, data });
      return data;
    },
  }
};

export default resolvers;
