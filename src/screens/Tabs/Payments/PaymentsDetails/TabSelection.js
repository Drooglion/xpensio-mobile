/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Button,
  Segment,
  Text,
} from 'native-base';

import R from 'res/R';
import styles from './styles';

const TabSelection = ({ selected, onTabSelect }) => (
  <Segment style={styles.segment}>
    <Button
      first
      active={selected === 0}
      style={styles.segmentBtn}
      onPress={() => onTabSelect(0)}
    >
      <Text style={styles.segmentText}>{R.strings.details}</Text>
    </Button>
    <Button
      last
      active={selected === 1}
      style={styles.segmentBtn}
      onPress={() => onTabSelect(1)}
    >
      <Text style={styles.segmentText}>{R.strings.receipt}</Text>
    </Button>
  </Segment>
);

export default TabSelection;
