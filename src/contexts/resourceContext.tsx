import React, { FC, useReducer, useCallback } from 'react';
import Card from 'models/Card';
import Payment from 'models/Payment';
import Request from 'models/Request';

const reducer = (prevState: StateType, action: any) => {
  switch (action.type) {
    case 'SET_ACT_AS_ADMIN':
      return {
        ...prevState,
        actAsAdmin: action.actAsAdmin,
      };
    case 'SET_CARD':
      return {
        ...prevState,
        card: action.card,
      };
    case 'SET_PAYMENTS':
      return {
        ...prevState,
        payments: action.payments,
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
  }
};

type StateType = {
  actAsAdmin: boolean;
  card: Card | undefined;
  payments: Payment[];
  requests: Request[];
  loadingModal: boolean;
};

const initialState: StateType = {
  actAsAdmin: false,
  card: undefined,
  payments: [],
  requests: [],
  loadingModal: false,
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
