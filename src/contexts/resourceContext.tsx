import React, { FC, useReducer } from 'react';
import Request from 'models/Request';

const reducer = (prevState: StateType, action: any) => {
  switch (action.type) {
    case 'SET_ACT_AS_ADMIN':
      return {
        ...prevState,
        actAsAdmin: action.actAsAdmin,
      };
    case 'SET_REQUESTS':
      return {
        ...prevState,
        requests: action.requests,
      };
    case 'SET_LOADING_MODAL':
      return {
        ...prevState,
        loadingModal: action.loadingModal,
      };
    case 'SET_DIALOG_MODAL':
      return {
        ...prevState,
        dialogModal: { ...prevState.dialogModal, ...action.dialogModal },
      };
  }
};

type DialogModal = {
  visible: boolean;
  title: string;
  description: string;
  icon?: 'success' | 'congratulations' | 'email';
  onClose?: () => void;
};

type StateType = {
  actAsAdmin: boolean;
  requests: Request[];
  loadingModal: boolean;
  dialogModal: DialogModal;
};

const initialState: StateType = {
  actAsAdmin: false,
  requests: [],
  loadingModal: false,
  dialogModal: {
    visible: false,
    title: '',
    description: '',
    icon: 'success',
  },
};

type ResourceContextType = {
  state: StateType;
  dispatch: React.Dispatch<any>;
};
const ResourceContext = React.createContext<ResourceContextType | undefined>(
  undefined,
);

export const useResource = () => {
  const context = React.useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within an ResourceProvider');
  }

  return context;
};

export const ResourceProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};
