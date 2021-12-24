import React from 'react';
import { Bubbles } from 'react-native-loader';
import R from 'res/R';

export interface LoadingIndicatorProps {
  color?: string;
  size?: number;
}

const LoadingIndicator = ({ color, size }: LoadingIndicatorProps) => (
  <Bubbles size={size || 10} color={color || R.colors.primary} />
);

export default LoadingIndicator;
