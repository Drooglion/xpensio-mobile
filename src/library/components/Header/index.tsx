import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  Header as NBHeader,
  Body,
  Title,
  Right,
  Left,
  Button,
  Icon as NBIcon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import R from 'res/R';
import ProfileImgLink from 'library/components/ProfileImgLink';
import styles from './styles';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onSearch?(): void;
  hasBack: boolean;
  highlightBack: boolean;
  backgroundColor?: string;
  onBackPress(): void;
  inverseFontColor: boolean;
  linkToProfile: boolean;
  iosBarStyle?: string;
  androidStatusBarColor?: string;
  content?: React.ReactNode | null;
  user?: any;
}

const defaultProps: AppHeaderProps = {
  title: '',
  subtitle: undefined,
  onSearch: undefined,
  hasBack: false,
  highlightBack: false,
  backgroundColor: '',
  onBackPress: () => {},
  inverseFontColor: false,
  linkToProfile: false,
  iosBarStyle: 'dark-content',
  androidStatusBarColor: R.colors.white,
  content: null,
  user: null,
};

const Header = ({
  title,
  subtitle,
  onSearch,
  hasBack,
  highlightBack,
  backgroundColor,
  onBackPress,
  inverseFontColor,
  linkToProfile,
  iosBarStyle,
  androidStatusBarColor,
  content,
  user,
}: AppHeaderProps) => {
  const navigator = useNavigation();
  const headerStyle = backgroundColor
    ? StyleSheet.flatten([styles.header, { backgroundColor }])
    : styles.header;

  const headerRight = () => {
    let rightComponent = null;
    if (linkToProfile) {
      rightComponent = (
        <Right style={styles.right}>
          <TouchableOpacity
            onPress={() => navigator.navigate('Profile' as never)}
            activeOpacity={1}>
            <ProfileImgLink user={user} size={40} />
          </TouchableOpacity>
        </Right>
      );
    } else if (onSearch) {
      rightComponent = (
        <Right style={styles.right}>
          {/* @ts-ignore */}
          <Button transparent icon style={styles.btnSearch} onPress={onSearch}>
            <NBIcon
              ios="ios-search"
              android="md-search"
              style={styles.btnSearch}
            />
          </Button>
        </Right>
      );
    }
    return rightComponent;
  };

  const renderBody = () => {
    const titleStyle = inverseFontColor
      ? StyleSheet.flatten([
          styles[hasBack ? 'backTitle' : 'title'],
          { color: R.colors.white },
        ])
      : styles[hasBack ? 'backTitle' : 'title'];
    return (
      content || (
        <Body style={styles.body}>
          <Title style={titleStyle}>{title}</Title>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </Body>
      )
    );
  };

  //console.log('hasBack', hasBack);

  return (
    <NBHeader
      hasTabs
      noLeft
      style={headerStyle}
      //@ts-ignore
      iosBarStyle={iosBarStyle}
      androidStatusBarColor={androidStatusBarColor}>
      {hasBack ? (
        <Left style={styles.left}>
          <Button
            onPress={onBackPress}
            transparent={!highlightBack}
            style={highlightBack ? styles.highlightBack : null}>
            <Icon
              name="md-arrow-back"
              size={33}
              color={R.colors[inverseFontColor ? 'white' : 'black']}
            />
          </Button>
        </Left>
      ) : null}
      {renderBody()}
      {content ? null : headerRight()}
    </NBHeader>
  );
};

Header.defaultProps = defaultProps;

export default Header;
