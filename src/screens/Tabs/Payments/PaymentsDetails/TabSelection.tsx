import React from 'react';
import { Button, Segment, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './styles';

export interface TabSelectionProps {
  active: number;
  onTabSelect(page: number): void;
}

const TabSelection = ({ active, onTabSelect }: TabSelectionProps) => {
  const { t } = useTranslation();

  return (
    <Segment style={styles.segment}>
      <Button
        first
        active={active === 0}
        style={styles.segmentBtn}
        onPress={() => onTabSelect(0)}>
        <Text style={styles.segmentText}>{t('details')}</Text>
      </Button>
      <Button
        last
        active={active === 1}
        style={styles.segmentBtn}
        onPress={() => onTabSelect(1)}>
        <Text style={styles.segmentText}>{t('receipt')}</Text>
      </Button>
    </Segment>
  );
};

export default TabSelection;
