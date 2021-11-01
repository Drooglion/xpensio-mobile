/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { FlatList, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Icon,
  ListItem,
  CheckBox,
  Item,
  Input,
  Button,
  View,
  StyleProvider,
} from 'native-base';

import DateRangePicker from 'library/components/DateRangePicker';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

export default class DateFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      listHeight: 0,
      animation: new Animated.Value(),
      showRangePicker: false,
    };
    this.fromDate = null;
    this.toDate = null;
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

  onOptionSelect = (item, callback) => {
    if (item.description.toLowerCase() === 'custom') {
      this.fromDate._root.focus();
    }
    callback(item);
  };

  onRangeClicked = (item, callback) => {
    callback(item);
    this.setState({ showRangePicker: true });
  }

  onRangeCancel = () => {
    const { onCancel } = this.props;
    this.setState({ showRangePicker: false }, () => {
      onCancel();
    });
  }

  onRangeSet = (s, e) => {
    const { onRangeSelect } = this.props;
    onRangeSelect(s, e);
    this.setState({ showRangePicker: false });
  }

  renderOption = (item, callback) => {
    const {
      description,
      checked,
    } = item;
    return description.toLowerCase() === 'custom'
      ? (
        <View>
          <ListItem noBorder style={styles.item}>
            <CheckBox
              style={styles.radio}
              color={R.colors.primary}
              checked={checked}
              onPress={() => this.onOptionSelect(item, callback)}
            />
            <Text style={styles.option}>{description}</Text>
          </ListItem>
          <View style={styles.rangeContainer}>
            <Item underline style={styles.inputItem}>
              <Input
                ref={(input) => { this.fromDate = input; }}
                placeholder={R.strings.from}
                placeholderTextColor={R.colors.hint}
                value={item.range.from}
                style={styles.input}
                selectionColor={R.colors.cursor}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={false}
                onFocus={() => this.onRangeClicked(item, callback)}
                onTouchStart={() => this.onRangeClicked(item, callback)}
              />
            </Item>
            <Text style={styles.dash}>{R.strings.dash}</Text>
            <Item underline style={styles.inputItem}>
              <Input
                ref={(input) => { this.toDate = input; }}
                placeholder={R.strings.to}
                placeholderTextColor={R.colors.hint}
                value={item.range.to}
                style={styles.input}
                selectionColor={R.colors.cursor}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={false}
                onFocus={this.onRangeClicked}
                onTouchStart={this.onRangeClicked}
              />
            </Item>
          </View>
        </View>
      ) : (
        <ListItem noBorder style={styles.item}>
          <CheckBox
            style={styles.radio}
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
      onItemPress
    } = this.props;
    const {
      expanded,
      animation,
      showRangePicker,
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
          <Animated.View style={{ height: animation }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => this.renderOption(item, onOptionSelect)}
              onLayout={this.setListHeight}
            />
          </Animated.View>
          {/* <DateTimePicker
            isVisible={showFromPicker}
            titleIOS={R.strings.selectDate}
            minimumDate={new Date(2019, 1, 1)}
            maximumDate={new Date()}
            date={new Date()}
            confirmTextIOS={R.strings.done}
            mode="date"
            onCancel={() => { this.setState({ showFromPicker: false }); }}
            onConfirm={() => { this.setState({ showFromPicker: false }); }}
          /> */}
          <DateRangePicker
            isVisible={showRangePicker}
            minDate={new Date('2019-01-01')}
            maxDate={new Date()}
            initialRange={['', '']}
            onSuccess={(s, e) => this.onRangeSet(s, e)}
            onCancel={this.onRangeCancel}
            theme={{ markColor: R.colors.primary, markTextColor: R.colors.white }}
          />
        </View>
      </StyleProvider>
    );
  }
}

DateFilters.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  data: PropTypes.instanceOf(Array),
  onOptionSelect: PropTypes.func.isRequired,
  onRangeSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onItemPress: PropTypes.func.isRequired,
};

DateFilters.defaultProps = {
  expanded: false,
  data: [],
  onCancel: () => {},
};
