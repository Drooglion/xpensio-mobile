import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  Header as NBHeader,
  Body,
  Title,
  Right,
  Left,
  Button,
  Icon as NBIcon,
  Text,
} from 'native-base';

// import STORE_QUERIES from 'library/store/queries';
import Icon from 'react-native-vector-icons/Ionicons';
import R from 'res/R';
// import ProfileImgLink from 'library/components/ProfileImgLink';

import styles from './styles';

class Header extends Component {
  headerRight = () => {
    const { linkToProfile, onSearch, navigation } = this.props;
    let headerRight = null;
    if (linkToProfile) {
      headerRight = (
        <Right style={styles.right}>
          <TouchableOpacity onPress={() => {}} activeOpacity={1}>
            {/* <ProfileImgLink
              uri={photoUrl}
              size={40}
            /> */}
          </TouchableOpacity>
        </Right>
      );
    } else if (onSearch) {
      headerRight = (
        <Right style={styles.right}>
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
    return headerRight;
  };

  renderBody() {
    const { content, title, hasBack, inverseFontColor, subtitle } = this.props;
    const titleStyle = inverseFontColor
      ? StyleSheet.flatten([
          styles[hasBack ? 'backTitle' : 'title'],
          { color: R.colors.white },
        ])
      : styles[hasBack ? 'backTitle' : 'title'];
    return (
      content || (
        <Body style={styles.body}>
          <Title allowFontScaling={false} style={titleStyle}>
            {title}
          </Title>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </Body>
      )
    );
  }

  render() {
    const {
      content,
      hasBack,
      highlightBack,
      transparent,
      backgroundColor,
      inverseFontColor,
      onBackPress,
      iosBarStyle,
      androidStatusBarColor,
    } = this.props;

    const headerStyle = backgroundColor
      ? StyleSheet.flatten([styles.header, { backgroundColor }])
      : styles.header;

    return (
      <NBHeader
        hasTabs
        noLeft
        transparent={transparent}
        style={headerStyle}
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
        {this.renderBody()}
        {content ? null : this.headerRight()}
      </NBHeader>
    );
  }
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.instanceOf(Object),
  linkToProfile: PropTypes.bool,
  hasBack: PropTypes.bool,
  highlightBack: PropTypes.bool,
  transparent: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onBackPress: PropTypes.func,
  inverseFontColor: PropTypes.bool,
  navigation: PropTypes.instanceOf(Object),
  iosBarStyle: PropTypes.string,
  androidStatusBarColor: PropTypes.string,
  content: PropTypes.element,
};

Header.defaultProps = {
  title: '',
  onSearch: null,
  hasBack: false,
  highlightBack: false,
  transparent: false,
  backgroundColor: '',
  onBackPress: () => {},
  inverseFontColor: false,
  linkToProfile: false,
  navigation: {},
  iosBarStyle: 'dark-content',
  androidStatusBarColor: R.colors.white,
  content: null,
};
