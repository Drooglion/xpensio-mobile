import React, { FC, useReducer } from 'react';
import User from 'models/User';
import Card from 'models/Card';
import Payment from 'models/Payment';
import { UserWalletBalance } from 'models/Wallet';
import Account from 'models/Account';
import Request from 'models/Request';

const reducer = (prevState: StateType, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...prevState,
        user: action.user,
      };
    case 'SET_ACCOUNT':
      return {
        ...prevState,
        account: action.account,
      };
    case 'SET_USER_BALANCE':
      return {
        ...prevState,
        balance: action.balance,
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
  }
};

type StateType = {
  user: User | undefined;
  account: Account | undefined;
  balance: UserWalletBalance | undefined;
  card: Card | undefined;
  payments: Payment[];
  requests: Request[];
};

const initialState: StateType = {
  user: undefined,
  account: undefined,
  balance: undefined,
  card: undefined,
  payments: [],
  requests: [],
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
