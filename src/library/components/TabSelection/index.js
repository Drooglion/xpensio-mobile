import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'native-base';
import styles from './styles';

class TabSelection extends Component {
  state = { selected: 0 };

  handlePress = selected => {
    const { onChange } = this.props;
    this.setState({ selected }, () => {
      onChange(selected);
    });
  };

  renderTabSelections() {
    const { selected } = this.state;
    const { tabs } = this.props;
    return tabs.map((tab, i) => (
      <Button
        key={tab}
        transparent
        style={[styles.tab, i === selected ? styles.tabActive : null]}
        onPress={() => this.handlePress(i)}>
        <Text
          allowFontScaling={false}
          uppercase={false}
          style={[
            styles.tabText,
            i === selected ? styles.tabTextActive : null,
          ]}>
          {tab}
        </Text>
      </Button>
    ));
  }

  render() {
    return <View style={styles.tabs}>{this.renderTabSelections()}</View>;
  }
}

export default TabSelection;

TabSelection.propTypes = {
  tabs: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
};
