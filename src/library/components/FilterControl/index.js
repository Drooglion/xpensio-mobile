/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import {
  Button,
  Text,
  Icon,
  View,
} from 'native-base';

import styles from './styles';

const FilterControl = ({ onPress, activeFilters }) => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Button
        bordered
        rounded
        iconRight
        onPress={onPress}
        style={styles.btn}
      >
        <Text
          style={styles.txt}
          allowFontScaling={false}
        >
          Filter
        </Text>
        <Icon
          style={styles.iconFilter}
          name="add"
        />
      </Button>
      {
        activeFilters.map(item => (
          <Button
            key={item.name}
            rounded
            iconRight
            onPress={item.onPress}
            style={styles.btnActive}
          >
            <Text
              style={styles.activeTxt}
              allowFontScaling={false}
            >
              { item.name }
            </Text>
            {
              item.required ? null : (
                <Icon
                  style={styles.activeIconFilter}
                  name="close"
                />
              )
            }
          </Button>
        ))
      }
    </ScrollView>
  </View>
);

FilterControl.propTypes = {
  onPress: PropTypes.func,
  activeFilters: PropTypes.instanceOf(Array),
};

FilterControl.defaultProps = {
  onPress: () => {},
  activeFilters: [],
};

export default FilterControl;
