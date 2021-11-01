/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
  View,
  Item,
  Icon,
  Input,
  Button,
  Thumbnail,
  StyleProvider,
} from 'native-base';


import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

export default class SearchBar extends Component {
  render() {
    const {
      autoFocus,
      label,
      filter,
      onFilterPress,
      style,
      searchQuery,
      onSearch,
    } = this.props;

    return (
      <StyleProvider style={getTheme(theme)}>
        <View style={[styles.container, style]}>
          <Item style={styles.searchBar}>
            <Icon name="ios-search" style={styles.searchIcon} />
            <Input
              autoFocus={autoFocus}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={label}
              placeholderTextColor={R.colors.subhead}
              selectionColor={R.colors.cursor}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={onSearch}
            />
          </Item>
          {
            filter ? (
              <Button transparent style={styles.btnFilter} onPress={onFilterPress}>
                <Thumbnail
                  small
                  square
                  source={R.images.ic_filter}
                  resizeMode="contain"
                  style={styles.iconFilter}
                />
              </Button>
            ) : null
          }
        </View>
      </StyleProvider>
    );
  }
}

SearchBar.propTypes = {
  label: PropTypes.string,
  filter: PropTypes.bool,
  onFilterPress: PropTypes.func,
  style: ViewPropTypes.style,
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  label: R.strings.search,
  filter: false,
  onFilterPress: () => {},
  style: {},
  searchQuery: '',
  onSearch: () => {},
};
