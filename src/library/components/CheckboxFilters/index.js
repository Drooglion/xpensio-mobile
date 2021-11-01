/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { FlatList, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Icon,
  ListItem,
  CheckBox,
  View,
  StyleProvider,
  Button,
} from 'native-base';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

export default class CheckboxFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      listHeight: 0,
      animation: new Animated.Value(),
    };
  }

  componentWillMount() {
    const { expanded } = this.props;
    this.setState({
      expanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { expanded } = this.state;
    if (expanded !== nextProps.expanded) {
      this.toggle();
    }
  }

  setListHeight = (e) => {
    const { listHeight, expanded } = this.state;
    if (listHeight === 0) {
      this.setState({
        listHeight: e.nativeEvent.layout.height,
      }, () => {
        const height = expanded ? undefined : 0;
        this.setState({
          animation: new Animated.Value(height),
        });
      });
    }
  }

  toggle = () => {
    const {
      expanded,
      listHeight,
      animation
    } = this.state;
    const initialHeight = expanded ? listHeight : 0;
    const finalHeight = expanded ? 0 : listHeight;

    animation.setValue(initialHeight);
    Animated.timing(
      animation,
      {
        toValue: finalHeight,
        easing: Easing.linear,
        duration: 200,
      }
    ).start(() => {
      this.setState({
        expanded: !expanded,
      });
    });
  }

  renderOption = (item, callback) => {
    const {
      description,
      checked,
    } = item;
    return (
      <ListItem noBorder style={styles.item}>
        <CheckBox
          style={styles.checkbox}
          color={R.colors.primary}
          checked={checked}
          onPress={() => callback(item)}
        />
        <Text style={styles.option}>{description}</Text>
      </ListItem>
    );
  }

  render() {
    const {
      title,
      data,
      onOptionSelect,
      onItemPress,
    } = this.props;
    const {
      expanded,
      animation,
      listHeight,
    } = this.state;
    return (
      <StyleProvider style={getTheme(theme)}>
        <View style={styles.container}>
          <Button
            iconRight
            transparent
            style={styles.header}
            onPress={onItemPress}
          >
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Icon style={styles.expandIcon} name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'} />
          </Button>
          <Animated.View
            style={{
              height: listHeight !== 0 && expanded ? listHeight : animation
            }}
          >
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => this.renderOption(item, onOptionSelect)}
              onLayout={this.setListHeight}
            />
          </Animated.View>
        </View>
      </StyleProvider>
    );
  }
}

CheckboxFilters.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  data: PropTypes.instanceOf(Array),
  onOptionSelect: PropTypes.func,
  onItemPress: PropTypes.func.isRequired,
};

CheckboxFilters.defaultProps = {
  expanded: false,
  data: [],
  onOptionSelect: () => {}
};
