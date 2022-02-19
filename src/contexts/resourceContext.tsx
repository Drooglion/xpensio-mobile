import React, { FC, useReducer } from 'react';
import User from 'models/User';
import Card from 'models/Card';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...prevState,
        user: action.user,
      };
    case 'SET_CARD':
      return {
        ...prevState,
        card: action.card,
      };
  }
};

type StateType = {
  user: User | undefined;
  card: Card | undefined;
};

const initialState: StateType = {
  user: undefined,
  card: undefined,
};

type ResourceContextType = {
  state: any;
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
