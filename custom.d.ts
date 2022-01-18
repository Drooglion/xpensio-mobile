declare module 'react-native-loader' {
  interface ILoader {
    size: number;
    color: string;
  }
  export function Bubbles(props: ILoader): any;
  export function DoubleBounce(props: ILoader): any;
  export function Bars(props: ILoader): any;
  export function Pulse(props: ILoader): any;
}

declare module 'react-native-user-avatar' {
  import { StyleProp, ImageStyle, ViewStyle } from 'react-native';

  const component: React.ComponentType<{
    name: string;
    src?: string;
    bgColor?: string;
    bgColors?: string[];
    textColor?: string;
    size?: number;
    imageStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    borderRadius?: number;
    component?: React.ComponentType;
  }>;

  export default component;
}
